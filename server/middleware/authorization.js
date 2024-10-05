const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};

module.exports = authorizeRoles;
