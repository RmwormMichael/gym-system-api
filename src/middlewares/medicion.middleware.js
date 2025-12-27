exports.crear = (req, res, next) => {
  if (!['ENTRENADOR', 'ADMIN'].includes(req.userRol)) {
    return res.status(403).json({ msg: 'No autorizado para crear mediciones' });
  }
  next();
};

exports.verPropiasOAdmin = (req, res, next) => {
  const { usuario_id } = req.params;

  if (
    req.userRol === 'ADMIN' ||
    req.userRol === 'ENTRENADOR' ||
    (req.userRol === 'CLIENTE' && req.uid === usuario_id)
  ) {
    return next();
  }

  return res.status(403).json({ msg: 'Acceso denegado' });
};
