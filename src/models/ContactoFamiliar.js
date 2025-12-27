const { Schema, model } = require('mongoose');

const ContactoFamiliarSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    parentesco: {
      type: String,
      enum: ['Padre', 'Madre', 'Hermano/a', 'Esposo/a', 'Hijo/a', 'Otro'],
      default: 'Otro',
    },
    email: String,
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('ContactoFamiliar', ContactoFamiliarSchema);