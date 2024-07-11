const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const routes = require("./routes");
const http = require("http");
const { Server } = require("socket.io");
const { sequelize: sequelizeUser } = require("./models/user");
const { sequelize: sequelizeMerchant } = require("./models/merchant");
const { sequelize: sequelizeOrder } = require("./models/orders");
const listEndpoints = require("express-list-endpoints");

const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Middleware
app.use(bodyParser.json());

// CORS setup
app.use(cors());

// Static file serving
app.use("/uploads", express.static(process.cwd() + "/uploads"));

// API routes
app.use("/api", routes);

// Database connection
sequelizeUser
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    return Promise.all([
      sequelizeUser.sync({ force: false }),
      sequelizeMerchant.sync({ force: false }),
      sequelizeOrder.sync({ force: false }),
    ]);
  })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to connect/synchronize database:", err);
    process.exit(1); // Exit process on database connection/synchronization error
  });
// Socket.IO integration
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Endpoint to check Socket.IO status
app.get("/socket-status", (req, res) => {
  const connectedSockets = io.sockets.sockets;
  console.log("Connected sockets:", connectedSockets.size);
  if (connectedSockets.size > 0) {
    console.log(connectedSockets);
    res.send("Socket.io is running and connected");
  } else {
    res.send("Socket.io is not running or not connected");
  }
});

// Store io instance in app for access elsewhere
app.set("io", io);

const endpoints = listEndpoints(app);
console.log("Registered endpoints:", endpoints);

// Export app and io for use in other modules
module.exports = { server, io };
