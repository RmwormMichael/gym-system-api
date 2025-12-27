const { Schema, model } = require('mongoose');

const EstadoSchema = new Schema(
  {
    nombre_estado: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    descripcion: String,
    es_activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Estado', EstadoSchema);