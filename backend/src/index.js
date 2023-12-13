const express = require('express');
const {connectDB} = require('./mongo/connection');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/UserRoutes');
app.use(cors());
app.use(express.json());
app.use(userRoutes);
connectDB().then(() => console.log("Connected to database!"));
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
