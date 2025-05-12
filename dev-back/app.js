const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const forumRoutes = require('./routes/forumRoutes');

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/forum', forumRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});