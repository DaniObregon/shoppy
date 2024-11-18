var admin = require("firebase-admin");

var serviceAccount = require("../things/shoppy-153a0-firebase-adminsdk-r3s3l-a96e044339.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;