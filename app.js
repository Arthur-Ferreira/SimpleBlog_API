require('dotenv').config();

const express = require('express');
const cors = require("cors");

const blogRoutes = require('./routes/blog');

const port = process.env.PORT;

const app = express();

// Enable all request
app.use(cors());

// Parser to application/json
app.use(express.json());

// Routes beeing used on the app
app.use('/api', blogRoutes); 

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(port, () => {
  console.log(`Server runing at: http://localhost:${port}`);
});
