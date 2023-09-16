// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/authRoute');


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();


// Use your provided MongoDB connection URL
const MONGO_URL = 'mongodb+srv://shani:shanidev@cluster0.jrdugnd.mongodb.net/newbooks';

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors(
  {
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(bodyParser.json());
app.use(morgan('dev'));


// Routes
app.use('/api/books', bookRoutes);
app.use('/admin', authRoutes);

app.use('/', (req, res) => {
  res.json("Hello");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
