const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { createHash } = require("crypto");
const { Merchant } = require("../models/merchant");
const { where } = require("sequelize");

function validatePassword(enteredPassword, storedSalt, storedHashedPassword) {
  const hash = createHash("sha1")
    .update(enteredPassword + storedSalt)
    .digest("hex");

  return `${storedSalt}:${hash}` === storedHashedPassword;
}

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const isValidPassword = validatePassword(
        password,
        user.salt,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id, type: user.type }, "starlink");

      res.send({ token });
    })
    .catch((error) => {
      console.error("Error logging in user:", error);
      res.status(400).send(error);
    });
};

function hashPassword(password, salt) {
  const hash = createHash("sha1")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hash}`;
}

function validateEmail(email) {
  try {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  } catch (error) {
    return false;
  }
}

exports.register = (req, res) => {
  const { name, email, password, phone_number, type, token } = req.body;

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return res.status(400).send({ message: "Invalid email address" });
  } else {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        return res.status(409).send({ message: "User already exists" });
      } else {
        const salt = createHash("sha1")
          .update(Math.random().toString())
          .digest("hex")
          .substr(0, 10);

        const hashedPassword = hashPassword(password, salt);
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
          phone_number: req.body.phone_number,
          type: type,
          token: req.body.token,
        })
          .then((user) => {
            if (type === "merchant") {
              Merchant.create({ userID: user.id, stock: 0, price: 0 });
            }
            res.status(201).send({ message: "User created successfully" });
          })
          .catch((error) => {
            console.error("Error creating user:", error);
            res.status(400).send(error.errors);
          });
      }
    });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. Token is required." });
  }

  jwt.verify(token, "starlink", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
};

exports.verifyMerchantToken = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. Token is required." });
  }

  jwt.verify(token, "starlink", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token." });
    }
    req.user = decoded;
    if (req.user.type !== "merchant") {
      return res.status(401).send({ message: "You're not merchant." });
    }
    next();
  });
};

exports.getUserByID = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((data) => {
      if (data.dataValues.type == "merchant") {
        Merchant.findOne({ where: { userID: id } }).then((merchant) => {
          res.send({ ...data.dataValues, merchantId: merchant.dataValues.id });
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.updateUser = (req, res) => {
  try {
    const { id } = req.params;
    var isValidEmail = true;
    let email;
    if (req.body.email) {
      isValidEmail = validateEmail(req.body.email);
      if (!isValidEmail) {
        return res.status(400).send({ message: "Invalid email address" });
      } else {
        User.findOne({ where: { email: req.body.email } }).then((user) => {
          if (user) {
            return res.status(409).send({ message: "User already exists" });
          } else {
            email = req.body.email;
          }
        });
      }
    }
    var hashedPassword, salt;
    if (req.body.password) {
      salt = createHash("sha1")
        .update(Math.random().toString())
        .digest("hex")
        .substr(0, 10);

      hashedPassword = hashPassword(req.body.password, salt);
    }
    User.update(
      {
        name: req.body.name,
        email: email,
        password: hashedPassword,
        salt: salt,
        phone_number: req.body.phone_number,
        token: req.body.token,
      },
      { where: { id } }
    ).then((user) => {
      res.status(201).send({ message: "User updated successfully" });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
