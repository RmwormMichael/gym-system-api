require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`)
);
