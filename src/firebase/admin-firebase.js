var admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.admin = admin;
