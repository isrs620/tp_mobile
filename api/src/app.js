const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS – à adapter avec l’URL de ton mobile (ex: http://10.0.2.2:8080)
app.use(cors({
  origin: '*', // ou l’URL de l’app NativeScript en prod
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

module.exports = app;