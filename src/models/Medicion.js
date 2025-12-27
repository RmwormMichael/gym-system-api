const { Schema, model } = require('mongoose');

const MedicionSchema = new Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    peso: {
      type: Number,
      min: 0,
      max: 300,
    },
    altura: {
      type: Number,
      min: 0,
      max: 250,
    },
    imc: Number,
    notas: String,
  },
  {
    timestamps: true,
  }
);

// Calcular IMC automáticamente antes de guardar
MedicionSchema.pre('save', function () {
  if (this.peso && this.altura) {
    const alturaMetros = this.altura / 100;
    this.imc = this.peso / (alturaMetros * alturaMetros);
  }
});


// Índice compuesto para búsquedas
MedicionSchema.index({ usuario_id: 1, fecha: -1 });

module.exports = model('Medicion', MedicionSchema);