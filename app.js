require('dotenv').config()

const path = require('path');
const express = require('express');

const blogRoutes = require('./routes/blog');

const port = process.env.PORT;

const app = express();


app.set('view engine', 'ejs'); // Activate EJS view engine
app.set('views', path.join(__dirname + '/backend', 'views')); // Setting up Views Default path

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static(path.join(__dirname + '/frontend', 'public'))); // Serve static files (e.g. CSS files)

app.use(blogRoutes); // Routes beeing used on the app

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render('500');
});

app.listen(port, () => {
  console.log(`Server runing at: http://localhost:${port}`);
});
