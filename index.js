const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const connection = mysql.createConnection({
  host: '3.145.92.246',
  user: 'admin',
  password: 'password',
  database: 'smack3-db',
});

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting to database: ${err.stack}`);
    return;
  }

  console.log(`Connected to database as ID ${connection.threadId}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  connection.query('SELECT * FROM services', (error, results) => {
    if (error) {
      throw error;
    }

    res.render('index', { services: results });
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

