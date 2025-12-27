const { Schema, model } = require('mongoose');

const PlanSchema = new Schema(
  {
    nombre_plan: {
      type: String,
      required: true,
      trim: true,
    },
    duracion_dias: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
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
    timestamps: {
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_actualizacion',
    },
  }
);

module.exports = model('Plan', PlanSchema);