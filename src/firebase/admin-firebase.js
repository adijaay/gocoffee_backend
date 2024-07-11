var admin = require("firebase-admin");

var serviceAccount = require("./go-coffee-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;
