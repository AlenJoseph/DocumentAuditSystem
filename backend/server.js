const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const upload = require('./upload');

app.use(bodyParser.json());
/*......................................................................... */
const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'sonu123',
  password: '12345678',
  database: 'proofof1'
});
connection.connect(err => {
  if (err) {
    return err;
  }
});

/*.........................................................Admin Log In................................................. */
app.use(cors());
app.post('/admin/login', (req, res) => {
  let username = req.body.uname;
  let password = req.body.password;
  console.log(username);
  connection.query(
    'select * from Admin_LogIn_Tb where username=?',
    [username],
    function(error, results, fields) {
      if (error) {
        res.status(400).send({
          reply: 'error occured'
        });
      } else {
        if (results.length > 0) {
          if (results[0].password == password) {
            res.status(200).send({
              reply: 'login sucessfull'
            });
          } else {
            res.status(404).send({
              reply: 'Username and password does not match'
            });
          }
        } else {
          res.status(404).send({
            reply: 'Username does not exits'
          });
        }
      }
    }
  );
});
/*.........................................................User Log In....................................................... */
app.use(cors());
app.post('/user/login', (req, res) => {
  let username = req.body.uname;
  let password = req.body.password;
  console.log(username + password);
  connection.query('select * from users where username=?', [username], function(
    error,
    results,
    fields
  ) {
    if (error) {
      reres.status(400).send({
        reply: 'error occured'
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == password && results[0].status == 1) {
          res.status(200).send({
            username: results[0].username,
            reply: 'login sucessfull'
          });
        } else if (results[0].password == password && results[0].status == 0) {
          res.status(202).send({
            reply: 'Waiting for approvel'
          });
        } else {
          res.status(404).send({
            reply: 'Username and password does not match'
          });
        }
      } else {
        res.status(404).send({
          reply: 'Username does not exits'
        });
      }
    }
  });
});

/*.........................................................User Registration....................................................... */
app.use(cors());
app.post('/user/register', (req, res) => {
  let today = new Date();
  let users = {
    username: req.body.uname,
    name: req.body.name,
    email: req.body.email,
    status: 0,
    password: req.body.password,
    phone: req.body.phone
  };
  connection.query('INSERT INTO users SET ?', users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log('error ocurred', error);
      res.status(404).send({
        reply: 'error occured'
      });
    } else {
      console.log('The solution is: ', results);
      res.status(202).send({
        reply: 'registered successfully'
      });
    }
  });
});
/*.........................................................File opertion....................................................... */
app.use(cors());
app.post('/upload', upload);
/*.........................................................Get all unaproved User....................................................... */
app.use(cors());
app.get('/admin/users', (req, res) => {
  connection.query('select * from users where status=0', function(
    error,
    results,
    fields
  ) {
    res.json(results);
  });
});
/*.........................................................Approve User................................................................ */
app.use(cors());
app.post('/admin/user/id', (req, res) => {
  let id = req.body.id;
  console.log(req);
  console.log(id);
  connection.query('update users set status=1 where users_id=?', [id], function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log('error ocurred', error);
      res.status(404).send({
        reply: 'error occured'
      });
    } else {
      console.log('The solution is: ', results);
      res.status(202).send({
        reply: 'approved'
      });
    }
  });
});
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
