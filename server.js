const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const mysql = require('mysql2');

//database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_portofolio'
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect DB: ', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.static(path.join(__dirname, 'public')));

// API server
app.get('/api/services', (req, res) => {
  const query = 'SELECT * FROM services';
  db.query (query, (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});