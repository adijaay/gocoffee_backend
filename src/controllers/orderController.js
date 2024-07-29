const { Merchant } = require("../models/merchant");
const { Order } = require("../models/orders");
const { User } = require("../models/user");
const merchantController = require("../controllers/merchantController");
const notifController = require("../firebase/controllers/notificationController");
const userController = require("../controllers/userController");
const { Sequelize } = require("sequelize");
const { Coffee } = require("../models/coffee");

// exports.createOrder = async (req, res) => {
//   try {
//     await User.findByPk(req.body.userID).then(async (user) => {
//       if (!user) {
//         return res.status(404).send({ message: "User not found" });
//       } else {
//         if (user.type == "merchant") {
//           return res.status(400).send({ message: "User is a merchant" });
//         } else {
//           req.body.merchantID = null;
//           await Order.create(req.body)
//             .then((order) => {
//               const payload = {
//                 lat: order.dataValues.latitude_buyer,
//                 long: order.dataValues.longitude_buyer,
//                 stock: order.dataValues.amount,
//               };
//               merchantController
//                 .getNearbyMerchants(
//                   { body: payload, query: { radius: 5 } },
//                   res
//                 )
//                 .then((merchant) => {
//                   let tokenArray = [];
//                   for (let i = 0; i < merchant.length; i++) {
//                     userController
//                       .getUserByID({ id: merchant.userID }, res)
//                       .then((user) => {
//                         tokenArray.push(user.token);
//                       })
//                       .catch((error) => {
//                         res.status(400).send({ error: error.message });
//                       });
//                   }
//                   console.log(tokenArray);
//                   notifController
//                     .sendNotification(
//                       {
//                         title: "New Order",
//                         body: `Order ID ${order.dataValues.id} is waiting your confirmation`,
//                         token: tokenArray,
//                         data: { orderID: order.dataValues.id },
//                       },
//                       res
//                     )
//                     .then(() => {
//                       res.status(201).send(order);
//                     })
//                     .catch(async (error) => {
//                       await Order.destroy({ where: { id: order.id } })
//                         .then(() => {
//                           res.status(400).send({ error: error.message });
//                         })
//                         .catch((error) => {
//                           res.status(400).send({ error: error.message });
//                         });
//                     });
//                 })
//                 .catch(async (error) => {
//                   await Order.destroy({ where: { id: order.id } })
//                     .then(() => {
//                       res.status(400).send({ error: error.message });
//                     })
//                     .catch((error) => {
//                       console.log(error);
//                       res.status(400).send({ error: error.message });
//                     });
//                 });
//             })
//             .catch((error) => {
//               res.status(400).send({ error: error.message });
//             });
//         }
//       }
//     });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

exports.createOrder = async (req, res) => {
  var order;
  try {
    const user = await User.findByPk(req.body.userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.type === "merchant") {
      return res.status(400).send({ message: "User is a merchant" });
    }

    req.body.merchantID = null;

    const CoffeeData = await Coffee.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: req.body.coffeeID,
        },
      },
    }).then((data) => {
      const cleanData = data.map((coffee) => coffee.dataValues.name);
      return cleanData;
    });
    if (CoffeeData.length !== req.body.coffeeID.length) {
      return res.status(400).send({ message: "Invalid coffee ID" });
    }

    req.body.coffee_requested = CoffeeData.join(", ");

    const addOrder = await Order.create(req.body);

    order = await Order.findByPk(addOrder.dataValues.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const payload = {
      lat: order.dataValues.latitude_buyer,
      long: order.dataValues.longitude_buyer,
      stock: order.dataValues.amount,
      coffee: req.body.coffeeID,
    };

    const merchants = await merchantController.getNearbyMerchantsFunction(
      { body: payload, query: { radius: 5 } },
      res
    );

    if (Array.isArray(merchants)) {
      const tokenPromises = merchants.map(async (element) => {
        console.log(element.userID);
        const user = await User.findByPk(element.userID);
        console.log(user.dataValues.token);
        return user.dataValues.token;
      });

      const tokenArray = await Promise.all(tokenPromises);
      console.log(tokenArray);

      const notif = await notifController.sendNotification(
        {
          body: {
            title: "New Order",
            body: `Order ID ${order.dataValues.id} is waiting your confirmation`,
            token: tokenArray.filter(
              (token) => token !== null && token !== undefined
            ),
            data: { orderID: order.dataValues.id.toString() },
            topic: "New Order to Merchant",
          },
        },
        res
      );

      console.log(notif);
      const io = req.app.get("io");
      for (let i = 0; i < merchants.length; i++) {
        const stringEmit = merchants[i].userID + "-request-order";
        console.log(stringEmit);
        io.emit(stringEmit, order.dataValues);
      }

      res.status(201).send(order);
    } else {
      res.status(400).send({ error: merchants.message });
    }
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      try {
        if (
          error.message.includes(
            "Cannot set headers after they are sent to the client"
          )
        ) {
          return;
        }
        await Order.destroy({ where: { id: order.dataValues.id } });
      } catch (destroyError) {
        console.error("Error destroying order:", destroyError);
      }
    }

    if (!res.headersSent) {
      res.status(400).send({ error: error.message });
    }
  }
};

exports.getOrderByID = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Merchant,
          attributes: ["id", "latitude", "longitude", "avatar"],
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "phone_number"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name", "phone_number", "token"],
        },
      ],
    });
    if (!order) {
      res.status(404).send({ message: "Order not found" });
    } else {
      const io = req.app.get("io");
      io.emit("homesocket", order);
      res.status(200).send(order);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getOrderByUserID = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.findAll({
      where: {
        userID: id,
        merchantID: {
          [Sequelize.Op.ne]: null,
        },
      },
      order: [["done_at", "DESC"]],
      include: [
        {
          model: Merchant,
          attributes: ["id", "latitude", "longitude", "avatar"],
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "phone_number"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "phone_number"],
        },
      ],
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getOrderByMerchantID = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.findAll({
      where: { merchantID: id },
      order: [["done_at", "DESC"]],
      include: [
        {
          model: Merchant,
          attributes: ["id", "latitude", "longitude"],
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "phone_number"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "phone_number"],
        },
      ],
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.completeOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "token"],
        },
      ],
    });
    if (!order) {
      res.status(404).send({ message: "Order not found" });
    } else {
      if (order.status == "ongoing") {
        order.status = "completed";
        order.done_at = new Date();
        await order.save();
        await Merchant.findByPk(order.merchantID).then((merchant) => {
          merchant.status = "active";
          merchant.stock = merchant.stock - order.amount;
          merchant.save();
        });
        const orderUpdated = await Order.findByPk(id, {
          include: [
            {
              model: User,
              attributes: ["id", "token"],
            },
            {
              model: Merchant,
              attributes: ["id", "latitude", "longitude", "avatar"],
              include: [
                {
                  model: User,
                  attributes: ["id", "name", "email", "phone_number"],
                },
              ],
            },
          ],
        });
        const tokenArray = [orderUpdated.User.token];
        console.log(tokenArray);
        await notifController.sendNotification(
          {
            body: {
              title: "Order Completed",
              body: `Order ID ${orderUpdated.id} is completed`,
              token: tokenArray.filter(
                (token) => token !== null && token !== undefined
              ),
              data: { orderID: orderUpdated.id.toString() },
              topic: "Order Completed",
            },
          },
          res
        );
        const stringEmit =
          orderUpdated.userID.toString() + "-" + "complete-order";
        const io = req.app.get("io");
        console.log(stringEmit);
        io.emit(stringEmit, orderUpdated);
        res.status(200).send(orderUpdated);
      } else {
        res.status(400).send({ message: "Order cannot be completed" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.ongoingOrder = async (req, res) => {
  const id = req.params.id;
  const { merchantID } = req.body;
  if (merchantID == null || merchantID == undefined) {
    return res.status(400).send({ message: "Merchant ID is required" });
  } else {
    try {
      await Merchant.findByPk(merchantID).then(async (merchant) => {
        if (!merchant) {
          return res.status(404).send({ message: "Merchant not found" });
        } else {
          if (merchant.status !== "active") {
            return res
              .status(404)
              .send({ message: "Merchant can't accept this order" });
          } else {
            const order = await Order.findByPk(id);
            if (!order) {
              res.status(404).send({ message: "Order not found" });
            } else {
              if (
                order.merchantID ||
                order.status == "ongoing" ||
                order.status == "cancelled" ||
                order.status == "completed"
              ) {
                return res
                  .status(400)
                  .send({ message: "Order cannot be accepted" });
              } else {
                order.merchantID = merchantID;
                order.status = "ongoing";
                await order.save();
                await Merchant.findByPk(merchantID).then((merchant) => {
                  merchant.status = "ongoing";
                  merchant.save();
                });
                const orderUpdated = await Order.findByPk(id, {
                  include: [
                    {
                      model: User,
                      attributes: ["id", "name", "phone_number", "token"],
                    },
                    {
                      model: Merchant,
                      attributes: ["id", "latitude", "longitude", "avatar"],
                      include: [
                        {
                          model: User,
                          attributes: ["id", "name", "email", "phone_number"],
                        },
                      ],
                    },
                  ],
                });
                const tokenArray = [orderUpdated.User.token];
                const notif = await notifController.sendNotification(
                  {
                    body: {
                      title: "Order Accepted",
                      body: `Order ID ${orderUpdated.id} is accepted`,
                      token: tokenArray.filter(
                        (token) => token !== null && token !== undefined
                      ),
                      data: { orderID: orderUpdated.id.toString() },
                      topic: "Order Accepted",
                    },
                  },
                  res
                );
                console.log(notif);
                const io = req.app.get("io");
                const stringEmit =
                  orderUpdated.userID.toString() + "-ongoing-order";
                console.log(stringEmit);
                io.emit(stringEmit, orderUpdated);
                return res.status(200).send(orderUpdated);
              }
            }
          }
        }
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};

exports.cancelOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "token"],
        },
        {
          model: Merchant,
          attributes: ["id", "userID"],
          include: [
            {
              model: User,
              attributes: ["id", "token"],
            },
          ],
        },
      ],
    });
    if (!order) {
      res.status(404).send({ message: "Order not found" });
    } else {
      if (order.status == "cancelled") {
        res.status(400).send({ message: "Order already cancelled" });
      } else if (order.status == "ongoing" || order.status == "completed") {
        res.status(400).send({ message: "Order cannot be cancelled" });
      } else {
        order.status = "cancelled";
        await order.save();
        const tokenArray = [order.User.token, order.Merchant.User.token];
        await notifController.sendNotification(
          {
            body: {
              title: "Order Cancelled",
              body: `Order ID ${order.id} is cancelled`,
              token: tokenArray.filter(
                (token) => token !== null && token !== undefined
              ),
              data: { orderID: order.id.toString() },
              topic: "Order Cancelled",
            },
          },
          res
        );
        res.status(200).send(order);
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
