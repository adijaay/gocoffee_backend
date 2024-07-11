var admin = require("firebase-admin");

var serviceAccount = require("./go-coffee-firebase-adminsdk.json");

serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;
