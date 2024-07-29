const { Coffee } = require("../models/coffee");

exports.getAllCoffee = async (req, res) => {
  try {
    const dataCoffee = await Coffee.findAll();

    if (dataCoffee === null) {
      res.status(404).send("Coffee not found");
    }

    res.send(dataCoffee);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addCoffee = async (req, res) => {
  try {
    await Coffee.create(req.body);
    res.send("Coffee created");
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCoffee = async (req, res) => {
  const id = req.params.id;
  Coffee.destroy({ where: { id } })
    .then((data) => {
      res.send("Coffee deleted");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
