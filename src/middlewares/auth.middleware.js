const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.uid = decoded.uid;
    req.userRol = decoded.rol;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};





