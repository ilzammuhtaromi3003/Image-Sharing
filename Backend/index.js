//index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const router = require ('./routes/index.js');
// const errorHandler = require('./middleware/errorHandler');


app.use(cors());
// Middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api', router);

// // Error handling middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
