module.exports = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.userRol)) {
      return res.status(403).json({ msg: 'Acceso denegado' });
    }
    next();
  };
};
