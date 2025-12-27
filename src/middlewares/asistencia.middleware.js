module.exports = {
  soloAdminOEntrenador: (req, res, next) => {
    if (!['ADMIN', 'ENTRENADOR'].includes(req.userRol)) {
      return res.status(403).json({ msg: 'No autorizado' });
    }
    next();
  },

  verPropiasOAdmin: (req, res, next) => {
    const { usuario_id } = req.params;

    if (
      req.userRol === 'ADMIN' ||
      req.userRol === 'ENTRENADOR' ||
      req.uid === usuario_id
    ) {
      return next();
    }

    return res.status(403).json({ msg: 'Acceso denegado' });
  },
};
