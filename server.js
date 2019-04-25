const express = require('express');
const cors = require("cors");
const mysql= require('mysql');
const bodyParser = require('body-parser');
const app = express();
const upload = require("./upload");

app.use(bodyParser.json())
/*......................................................................... */
const connection =  mysql.createConnection({
  host:'localhost',
  user :'root',
  password:'root',
  database:'ProofOfExistence'
});
connection.connect(err=>{
  if(err){
      return err;
  }
});
 
/*.........................................................Admin Log In................................................. */
app.use(cors());
app.post('/admin/login', (req, res) => {
  let username =req.body.username;
  let password =req.body.password;
  connection.query('select * from Admin_LogIn_Tb where username=?',[username], function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        if(results[0].password == password){
          res.status(200).send({
            "replay":"login sucessfull"
              });
        }
        else{
          res.status(404).send({
            "replay":"Username and password does not match"
              });
        }
      }
      else{
        res.status(404).send({
          "replay":"Username does not exits"
            });
      }
    }
    });
});
/*.........................................................User Log In....................................................... */
app.use(cors());
app.post('/user/login', (req, res) => {
  let username =req.body.username;
  let password =req.body.password;
  connection.query('select * from users where username=?',[username], function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        if((results[0].password == password)&&(results[0].status == 1)){
          res.status(200).send({
            "replay":"login sucessfull"
              });
        }
        else if((results[0].password == password)&&(results[0].status == 0)){
          res.status(202).send({
            "replay":"Waiting for approvel"
              });
        }
        else{
          res.status(404).send({
            "replay":"Username and password does not match"
              });
        }
      }
      else{
        res.status(404).send({
          "replay":"Username does not exits"
            });
      }
    }
    });
});

/*.........................................................User Registration....................................................... */
app.use(cors());
app.post('/user/register', (req, res) => {
  let today = new Date();
  let users={
   "username":req.body.username,
   "name":req.body.name,
   "email":req.body.email,
   "address":req.body.adddress,
   "pincode":req.body.pincode,
   "status":0,
    "password":req.body.password,
    "ph":req.body.ph
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
});
});
app.use(cors());
app.post("/upload", upload);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);