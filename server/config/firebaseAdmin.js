var admin = require("firebase-admin");

var serviceAccount;

// Verifica si estás en un entorno de producción o desarrollo
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Parseamos desde una cadena JSON en producción
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Si no existe la variable de entorno, carga el archivo localmente (para desarrollo)
  serviceAccount = require("../secrets/shoppy-firebase-admin-secret.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
