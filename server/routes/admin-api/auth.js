const router = require("express").Router();
const { User } = require("../../models");

//TODO: Revisar la logica de creacion de usuario ya que siempre se crea con role 1
router.post("/google/callback", async (req, res) => {
  const { email, name, role_id } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Si el usuario no existe, crear uno nuevo con el rol por defecto (client)
      user = await User.create({
        name,
        email,
        role_id: role_id || 1, // Asignar rol por defecto si no se proporciona uno
      });
    }

    res.status(200).send({ user });
  } catch (error) {
    console.error("Error during user creation or verification: ", error);
    res.status(500).send({ error: "Error creating or verifying user" });
  }
});

module.exports = router;
