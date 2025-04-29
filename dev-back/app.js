const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour lire le body JSON

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});