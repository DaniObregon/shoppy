const admin = require("../config/firebaseAdmin");
const { User } = require("../models");

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Usuario no autorizado: token no proporcionado o formato incorrecto." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = { email: user.email, role_id: user.role_id };
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(500).json({ message: "Error de autenticación" });
  }
};

module.exports = authenticateUser;
