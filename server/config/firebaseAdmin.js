var admin = require("firebase-admin");

var serviceAccount;

// Verifica si estás en un entorno de producción o desarrollo
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Si la variable de entorno existe, la parseamos desde una cadena JSON
  console.log("FIREBASE_SERVICE_ACCOUNT:::", JSON.stringify(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT), null, 2));
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

} else {
  // Si no existe la variable de entorno, carga el archivo localmente (para desarrollo)
  serviceAccount = require("../things/shoppy-153a0-firebase-adminsdk-r3s3l-a96e044339.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
