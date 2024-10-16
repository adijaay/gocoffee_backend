const express = require("express");
const userController = require("../controllers/userController");
const MerchantController = require("../controllers/merchantController");
const OrderController = require("../controllers/orderController");
const coffeeController = require("../controllers/coffeeController");
const adminController = require("../controllers/adminController");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const nama = file.originalname.replace(/\s/g, "");
    cb(null, `uploads/merchant-${nama}-${Date.now()}.png`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

router.get("/user/:id", userController.verifyToken, userController.getUserByID);
router.patch(
  "/user/:id",
  userController.verifyToken,
  userController.updateUser
);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post(
  "/updatemerchant/:id",
  userController.verifyMerchantToken,
  upload.single("avatar"),
  MerchantController.updateMerchant
);
router.get(
  "/merchant/:id",
  userController.verifyToken,
  MerchantController.getMerchantbyID
);
router.get(
  "/merchant",
  userController.verifyToken,
  MerchantController.getMerchants
);
router.post(
  "/merchant/nearby",
  userController.verifyToken,
  MerchantController.getNearbyMerchants
);
router.post(
  "/merchant/deleteCoffee",
  userController.verifyMerchantToken,
  MerchantController.deleteCoffeeFromMerchant
);
router.post(
  "/order/create",
  userController.verifyToken,
  OrderController.createOrder
);
router.post(
  "/order/complete/:id",
  userController.verifyMerchantToken,
  OrderController.completeOrder
);
router.post(
  "/order/ongoing/:id",
  userController.verifyMerchantToken,
  OrderController.ongoingOrder
);
router.post(
  "/order/cancel/:id",
  userController.verifyToken,
  OrderController.cancelOrder
);
router.get(
  "/order/merchant/:id",
  userController.verifyMerchantToken,
  OrderController.getOrderByMerchantID
);
router.get(
  "/order/user/:id",
  userController.verifyToken,
  OrderController.getOrderByUserID
);
router.get(
  "/order/search/:id",
  userController.verifyToken,
  OrderController.getOrderByID
);
router.get(
  "/admin/orders",
  userController.verifyToken,
  adminController.getOrders
);
router.get("/coffee", coffeeController.getAllCoffee);
router.post("/coffee", coffeeController.addCoffee);
router.post("/coffee/delete/:id", coffeeController.deleteCoffee);
router.post("/admin/users", adminController.getUsers)
router.post("/admin/verifyuser", adminController.verifyUser)
router.post("/merchant/updateLocation", MerchantController.ExactUpdateLocationMerchant);

module.exports = router;
