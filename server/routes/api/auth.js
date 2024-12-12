// server/routes/auth.js
const express = require("express");
const admin = require("../../config/firebaseAdmin"); // Importa Firebase Admin SDK
const { User } = require("../../models"); // Importa tu modelo de Usuario (ajusta la ruta según sea necesario)
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email } = req.body; // Ahora el body solo tiene name y email
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del header Authorization

  //console.log("1 - ORIGINAL TOKEN JWT: " + token);
  if (!token) {
    return res.status(401).json({ message: "No se ha proporcionado un token" });
  }

  try {
    // Verifica el token con Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    //console.log("2 - DECODED TOKEN JWT: " + JSON.stringify(decodedToken, null, 2));

    if (decodedToken) {
      // Verificar si el usuario ya existe en la base de datos
      let user = await User.findOne({ where: { email } });

      if (!user) {
        // Si no existe, crear un nuevo usuario con rol por defecto (client)
        user = await User.create({
          name,
          email,
          role_id: 1, // Cliente por defecto
        });
      }

      // Devolver el usuario y el rol al frontend
      return res.status(200).json({
        message: "Usuario autenticado correctamente",
        user: { name: user.name, email: user.email, role: user.role_id },
      });
    } else {
      return res.status(401).json({ message: "Token no válido" });
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
