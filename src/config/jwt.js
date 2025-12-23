const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
  return jwt.sign(
    {
      uid: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      cedula: usuario.cedula,
      estado: usuario.estado_id,
      lesiones: usuario.lesiones
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );
};


module.exports = generarJWT;
