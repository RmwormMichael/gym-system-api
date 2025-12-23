const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    telefono: String,

    cedula: {
      type: String,
      required: true,
      unique: true,
    },

    estado_id: {
      type: Number, // luego puede ser ObjectId
      default: 1,
    },

    password: {
      type: String,
      required: true,
      select: false, // NO se devuelve por defecto
    },

    foto: String,

    idPlan: {
      type: Number,
      default: null,
    },

    contactoFamiliar_id: {
      type: Number,
      default: null,
    },

    lesiones: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'fecha_registro',
      updatedAt: 'fecha_ultima_actualizacion',
    },
  }
);

module.exports = model('Usuario', UsuarioSchema);
