const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const bookRoutes = require('./routes/bookRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use('/api/books', bookRoutes);
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes); // Ensures requests to /api/books are handled by bookRoutes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
