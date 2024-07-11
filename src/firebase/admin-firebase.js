var admin = require("firebase-admin");

var serviceAccount = require("./firebase-sdk-server.json");

// serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;
