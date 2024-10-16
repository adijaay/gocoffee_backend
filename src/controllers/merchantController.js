const { Sequelize, QueryTypes } = require("sequelize");
const { Merchant } = require("../models/merchant");
const { merchantCoffee } = require("../models/merchantCoffee");
var fs = require("fs");
const { User } = require("../models/user");
const { Coffee } = require("../models/coffee");

exports.getMerchants = async (req, res) => {
  try {
    await Merchant.findAll()
      .then((data) => {
        if (data === null) {
          res.status(404).send("Merchants not found");
        }
        res.send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMerchantbyID = async (req, res) => {
  try {
    const id = req.params.id;
    var dataMerchant;
    await Merchant.findByPk(id, {
      include: [
        {
          model: merchantCoffee,
          attributes: ["id", "coffeeID", "merchantID"],
          include: [
            {
              model: Coffee,
              attributes: ["id", "name", "desc", "image_link", "type"],
            },
          ],
        },
      ],
    })
      .then((data) => {
        dataMerchant = data.dataValues;
      })
      .catch((error) => {
        console.log(error);
      });
    if (dataMerchant === null) {
      res.status(404).send("Merchant not found");
    }
    res.send(dataMerchant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMerchantbyUserID = async (req, res) => {
  try {
    const id = req.params.id;
    var dataMerchant;
    await Merchant.findOne({ where: { userID: id } })
      .then((data) => {
        dataMerchant = data.dataValues;
      })
      .catch((error) => {
        console.log(error);
      });
    if (dataMerchant === null) {
      res.status(404).send("Merchant not found");
    }
    res.send(dataMerchant);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateMerchant = async (req, res) => {
  const id = req.params.id;
  const merchant = req.body;
  let pathImage = req.file ? req.file.filename : undefined;
  const payload = {
    ...merchant,
    avatar: pathImage,
  };
  var oldAvatar;
  if (pathImage) {
    await Merchant.findByPk(id)
      .then((oldData) => {
        oldAvatar = oldData.avatar;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Merchant.update(payload, { where: { id } })
    .then((data) => {
      if (pathImage) {
        try {
          fs.unlinkSync(oldAvatar);
        } catch (error) {
          console.log(error);
        }
      }
      res.send("Merchant updated");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  const coffeeIDs = req.body.coffeeID;

  if (Array.isArray(coffeeIDs) && coffeeIDs.length > 0) {
    for (let i = 0; i < coffeeIDs.length; i++) {
      await this.updateCoffeeToMerchant(
        { body: { coffeeID: coffeeIDs[i], merchantID: id } },
        res
      );
    }
  } else if (Array.isArray(coffeeIDs) && coffeeIDs.length === 0) {
    // Handle the case where coffeeID array is empty, if needed
    console.log("No coffee IDs to process.");
  }
};

exports.deleteMerchant = (req, res) => {
  const id = req.params.id;
  Merchant.destroy({ where: { id } })
    .then((data) => {
      res.send("Merchant deleted");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getNearbyMerchants = async (req, res) => {
  this.getNearbyMerchantsFunction(req)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const sequelize = new Sequelize(process.env.MYSQL_ROUTE, {
  dialect: "mysql",
  logging: console.log, // Enable logging for debugging
});

exports.getNearbyMerchantsFunction = async (req) => {
  console.log(req.body, req.query);
  const { lat, long, stock, coffee } = req.body; // Assume coffee is an array of coffee IDs
  const radius = req.query.radius ? req.query.radius : 5;
  console.log(lat, long, stock, radius);

  try {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    let query, replacements;

    if (Array.isArray(coffee) && coffee.length > 0) {
      // Build the query dynamically to handle multiple coffee IDs
      const coffeeIDs = coffee.join(",");
      const coffeeCount = coffee.length;

      query = `
        SELECT 
          m.id AS merchantID,
          m.userID,
          u.name,
          u.phone_number,
          m.avatar,
          m.longitude,
          m.latitude,
          ROUND((6371 * acos(cos(radians(:lat)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:long)) + sin(radians(:lat)) * sin(radians(m.latitude)))) * 100) / 100 AS distance,
          COUNT(mc.coffeeID) AS coffeeCount
        FROM 
          Merchants AS m
        JOIN
          Users AS u ON m.userID = u.id
        JOIN
          merchantCoffees AS mc ON m.id = mc.merchantID
        WHERE 
          m.stock >= :stock
        AND
          m.status != 'ongoing'
        AND
          m.status != 'inactive'
        AND
          mc.coffeeID IN (${coffeeIDs})
        GROUP BY 
          m.id
        HAVING 
          coffeeCount = :coffeeCount
        AND
          distance <= :radius
        ORDER BY 
          distance
      `;

      replacements = {
        lat: latitude,
        long: longitude,
        stock,
        radius,
        coffeeCount,
      };
    } else {
      query = `
        SELECT 
          m.id AS merchantID,
          m.userID,
          u.name,
          u.phone_number,
          m.avatar,
          m.longitude,
          m.latitude,
          ROUND((6371 * acos(cos(radians(:lat)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:long)) + sin(radians(:lat)) * sin(radians(m.latitude)))) * 100) / 100 AS distance
        FROM 
          Merchants AS m
        JOIN
          Users AS u ON m.userID = u.id
        WHERE 
          m.stock >= :stock
        AND
          m.status != 'ongoing'
        AND
          m.status != 'inactive'
        HAVING 
          distance <= :radius
        ORDER BY 
          distance
      `;

      replacements = { lat: latitude, long: longitude, stock, radius };
    }

    let result = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    let count = radius;

    while (result.length === 0 && count < 16) {
      result = await sequelize.query(query, {
        replacements: { ...replacements, radius: count },
        type: QueryTypes.SELECT,
      });
      count += 5;
    }

    count -= 5;

    if (result.length === 0) {
      return {
        message: `Merchants not found in ${count}km radius`,
      };
    } else {
      const merchantsMap = result.reduce((acc, row) => {
        if (!acc[row.merchantID]) {
          acc[row.merchantID] = {
            id: row.merchantID,
            userID: row.userID,
            name: row.name,
            phone_number: row.phone_number,
            avatar: row.avatar,
            longitude: row.longitude,
            latitude: row.latitude,
            distance: row.distance,
            coffee:
              Array.isArray(coffee) && coffee.length > 0
                ? coffee.map((id) => ({ id }))
                : [],
          };
        }
        return acc;
      }, {});

      return Object.values(merchantsMap);
    }
  } catch (error) {
    return {
      message: error.message,
    };
  }
};

exports.updateCoffeeToMerchant = async (req, res) => {
  try {
    const dataOld = await merchantCoffee.findOne({
      where: {
        merchantID: req.body.merchantID,
        coffeeID: req.body.coffeeID,
      },
    });
    if (dataOld) {
      return { message: "Coffee already added to Merchant" };
    } else {
      await merchantCoffee.create({
        merchantID: req.body.merchantID,
        coffeeID: req.body.coffeeID,
      });
      return "Coffee added to Merchant";
    }
  } catch (error) {
    return error;
  }
};

exports.deleteCoffeeFromMerchant = async (req, res) => {
  try {
    await merchantCoffee.destroy({
      where: {
        merchantID: req.body.merchantID,
      },
    });
    res.send("Coffee deleted from Merchant");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.ExactUpdateLocationMerchant = async (req, res) => {
  try {
    const io = req.app.get("io");
    const stringEmit = "update-location-"+req.body.orderID;
    const data = {
      longitude: parseFloat(req.body.longitude),
      latitude: parseFloat(req.body.latitude),
    }
    console.log(stringEmit, data);
    io.emit(stringEmit, data);
    return res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};
