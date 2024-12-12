const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const mysql = require('mysql2');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

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

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//API FOR LOGIN 
app.get('/login', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public/login.html'))
}
)

app.post('/login', (req,rest) => {
  const {username, password} = req.body;
  db.execute('SELECT * FROM users WHERE username= ? ' , [username], (err, result) => {
    if (err) {
      return res.status(500).send('Server Error')
    }
    if (result.length == 0) {
      return res.status(401).send('invalid credentials')
    }
    const user= result[0];
    const secretKey= "my-portfolio";

    // compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send('Invalid Credentials')
      }
  
      const token = jwt.sign({id: user.id,username: user.username}, secretKey, {expiresIn:'1h'});

      res.cookie('token', token, {httpOnly:true, secure:false})

      res.send('Logged in succesfully')

    })

  })

})

app.get('/logout', (req,res) => {
  res.clearCookie('token');
  res.redirect('/login');
})


function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]:
  
  if(!token) {
    return res.redirect('/login');
  }
    
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        if (err.name == 'TokenExpiredError'){
          res.clearCookie('token');
        }
        console.log(err);
        return res.redirect('/login')

      }

      req.user = user;
      next();
  })
}
//example url for admin : localhost:3000/admin
// validate authentication
app.use('/admin', authenticateToken);

//layout admin
app.get('/admin',(req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'))
})

// panel admin 
app.get('/admin/dashboard',(req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'))
})

//services
app.get('/admin/dashboard',(req, res) => {
  res.sendFile(path.join(__dirname, 'public/services.html'))
})

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