const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB(); // conectar a MongoDB

const app = express();
app.use(express.json()); // middleware para manejar JSON

app.use(cors({
    origin: 'http://localhost:4200'
}));

// rutas 
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
