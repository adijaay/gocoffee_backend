const { merchantCoffee } = require("../models/merchantCoffee");

exports.addCoffeeToMerchant = async (req, res) => {
  try {
    const dataOld = await merchantCoffee.findAll({
      where: {
        merchantID: req.body.merchantID,
        coffeeID: req.body.coffeeID,
      },
    });
    if (dataOld) {
      return res
        .status(400)
        .send({ message: "Coffee already added to Merchant" });
    } else {
      await merchantCoffee.create({
        merchantID: req.body.merchantID,
        coffeeID: req.body.coffeeID,
      });
      res.send("Coffee added to Merchant");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
