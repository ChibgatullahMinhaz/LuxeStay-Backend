const admin = require('firebase-admin')
require('dotenv').config()
const base64EncodedKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
const decodedKey = Buffer.from(base64EncodedKey, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(decodedKey);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;