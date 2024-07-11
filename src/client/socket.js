import io from "/node_modules/socket.io-client/dist/socket.io.js";

const socket = io("http://localhost:3000"); // Replace with your server URL

socket.on("61-order-completed", (order) => {
  console.log("Order completed:", order);
  // Handle the order data as needed
});
