const { Sequelize } = require("sequelize");
const { Merchant } = require("../models/merchant");
var fs = require("fs");

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
    await Merchant.findByPk(id)
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
  //   console.log(req.body, req.query);
  //   const { lat, long, stock } = req.body;
  //   const radius = req.query.radius ? req.query.radius : 5;
  //   console.log(lat, long, stock, radius);

  //   try {
  //     const latitude = parseFloat(lat);
  //     const longitude = parseFloat(long);
  //     const query = `
  //     SELECT
  //       m.id,
  //       m.userID,
  //       u.name,
  //       m.avatar,
  //       m.longitude,
  //       m.latitude,
  //       ROUND((6371 * acos(cos(radians(:lat)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:long)) + sin(radians(:lat)) * sin(radians(m.latitude)))) * 100) / 100 AS distance
  //     FROM
  //       Merchants
  //     AS m
  //     JOIN
  //       Users
  //     AS u
  //     ON
  //       m.userID = u.id
  //     WHERE
  //       m.stock >= :stock
  //     HAVING
  //       distance <= :radius
  //     ORDER BY
  //       distance
  // `;

  //     const sequelize = new Sequelize(
  //       "mysql://starlink:star123@localhost/db_starlink",
  //       {
  //         dialect: "mysql",
  //         logging: console.log, // Disable logging (you can enable it for debugging)
  //       }
  //     );

  //     // console.log(query, latitude, longitude, stock, radius);
  //     var result = await sequelize.query(query, {
  //       replacements: { lat: latitude, long: longitude, stock, radius },
  //       type: Sequelize.QueryTypes.SELECT,
  //     });

  //     let count = 0;

  //     while (result.length == 0 && count < 3) {
  //       result = await sequelize.query(query, {
  //         replacements: {
  //           lat: latitude,
  //           long: longitude,
  //           stock,
  //           radiusInc: radius + 5,
  //         },
  //         type: Sequelize.QueryTypes.SELECT,
  //       });
  //       count++;
  //     }

  //     if (result.length === 0) {
  //       console.log("Merchants not found in " + radius + "km radius");
  //       res.status(404).send("Merchants not found in " + radius + "km radius");
  //     } else {
  //       console.log(result);
  //       res.send(result);
  //     }
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
};

exports.getNearbyMerchantsFunction = async (req) => {
  console.log(req.body, req.query);
  const { lat, long, stock } = req.body;
  const radius = req.query.radius ? req.query.radius : 5;
  console.log(lat, long, stock, radius);

  try {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const query = `
    SELECT 
      m.id,
      m.userID,
      u.name,
      u.phone_number,
      m.avatar,
      m.longitude,
      m.latitude,
      ROUND((6371 * acos(cos(radians(:lat)) * cos(radians(m.latitude)) * cos(radians(m.longitude) - radians(:long)) + sin(radians(:lat)) * sin(radians(m.latitude)))) * 100) / 100 AS distance
    FROM 
      Merchants
    AS m
    JOIN
      Users
    AS u
    ON
      m.userID = u.id
    WHERE 
      m.stock >= :stock
    AND
      m.status != "ongoing"
    AND
      m.status != "inactive"
    HAVING 
      distance <= :radius
    ORDER BY 
      distance
`;

    const sequelize = new Sequelize(
      "mysql://starlink:star123@localhost/db_starlink",
      {
        dialect: "mysql",
        logging: console.log, // Disable logging (you can enable it for debugging)
      }
    );

    // console.log(query, latitude, longitude, stock, radius);
    var result = await sequelize.query(query, {
      replacements: { lat: latitude, long: longitude, stock, radius },
      type: Sequelize.QueryTypes.SELECT,
    });

    let count = radius;

    while (result.length == 0 && count < 16) {
      result = await sequelize.query(query, {
        replacements: {
          lat: latitude,
          long: longitude,
          stock,
          radius: count,
        },
        type: Sequelize.QueryTypes.SELECT,
      });
      count += 5;
    }

    count = count - 5;

    if (result.length === 0) {
      return {
        message: "Merchants not found in " + count + "km radius",
      };
    } else {
      return Array.isArray(result) ? result : [result];
    }
  } catch (error) {
    return {
      message: error,
    };
  }
};
