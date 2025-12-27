const { Schema, model } = require('mongoose');

const AsistenciaSchema = new Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    fecha_hora_entrada: {
      type: Date,
      default: Date.now,
    },
    fecha_hora_salida: Date,
    duracion_minutos: Number,
    tipo: {
      type: String,
      enum: ['entrada', 'salida'],
      default: 'entrada',
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsquedas rápidas
AsistenciaSchema.index({ usuario_id: 1, fecha_hora_entrada: -1 });

module.exports = model('Asistencia', AsistenciaSchema);