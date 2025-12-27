module.exports = {
  soloPropioOAdmin: (req, res, next) => {
    const { usuario_id } = req.params;

    if (
      req.userRol === 'ADMIN' ||
      req.uid === usuario_id
    ) {
      return next();
    }

    return res.status(403).json({ msg: 'Acceso denegado' });
  },
};
