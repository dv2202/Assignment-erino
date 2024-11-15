const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
