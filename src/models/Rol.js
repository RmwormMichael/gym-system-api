const { Schema, model } = require('mongoose');

const RolSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      enum: ['ADMIN', 'ENTRENADOR', 'CLIENTE'],
    },
    descripcion: {
      type: String,
      default: '',
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Rol', RolSchema);
