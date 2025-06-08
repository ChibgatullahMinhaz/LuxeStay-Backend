const admin = require('firebase-admin')

const serviceAccount = require("./luxe-stay-fbKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;