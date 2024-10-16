const { Merchant } = require("../models/merchant");
const { Order } = require("../models/orders");
const { User } = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const param = req.query;
    const body = req.body;
    const limit = parseInt(param.limit) || 9999; // default limit to 10 if not specified
    var offset = parseInt(param.offset) || 0; // default offset to 0 if not specified
    if (isNaN(limit) || limit < 1) {
      return res.status(400).send("Invalid limit parameter");
    }

    if (isNaN(offset) || offset < 0) {
      return res.status(400).send("Invalid offset parameter");
    }
    if(offset >= 0){
      offset = offset * limit;
    }

    const dataUser = await User.findAll({
      where: body,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
    if (dataUser.length === 0) {
      res.status(404).send("User not found");
    }
    else{
      res.send(dataUser);
    }

  } catch (error) {
    res.status(400).send(error);
  }
};


exports.verifyUser = async (req, res) => {
  try {
    const id = req.query.id;
    await User.update({ verified: true }, { where: { id } });
    res.send("User verified");
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.getOrders = async (req, res) => {
    try {
      console.log("param", req.query);
      const param = req.query;
      const body = req.body;
      const limit = parseInt(param.limit) || 9999; // default limit to 10 if not specified
      var offset = parseInt(param.offset) || 0; // default offset to 0 if not specified
      if (isNaN(limit) || limit < 1) {
        return res.status(400).send("Invalid limit parameter");
      }

      if (isNaN(offset) || offset < 0) {
        return res.status(400).send("Invalid offset parameter");
      }
      if(offset >= 0){
        offset = offset * limit;
      }

      const dataUser = await Order.findAll({
        where: body,
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]],
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
      if (dataUser.length === 0) {
        res.status(404).send("User not found");
      }
      else{
        res.send(dataUser);
      }
  
    } catch (error) {
      res.status(400).send(error);
    }
  };

  