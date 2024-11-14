const User= require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// Controlador de registro de usuario
exports.register = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear y guardar el nuevo usuario
      const user = new User({ email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor al registrar el usuario' });
    }
  };
  
  // Controlador de login de usuario
  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar al usuario por su correo electrónico
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }
  
      // Comparar la contraseña ingresada con la almacenada
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      // Crear un token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
    }
  };