require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');

const blogRoutes = require('./routes/blog');

const port = process.env.PORT;

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', blogRoutes); // Routes beeing used on the app

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
