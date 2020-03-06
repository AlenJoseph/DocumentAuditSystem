const Web3 = require('web3'),
  express = require('express'),
  bodyparser = require('body-parser'),
  sha = require('sha256'),
  fs = require('fs'),
  cors = require('cors');

var account;
var proofofexistence;
const ContractAddress = require('./blockChainconfig.json').address;

// MiddleWare
app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
}
//server setup
async function setAccount() {
  try {
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    console.log('Account has been set');
    console.log(account);
    return true;
  } catch (err) {
    console.log('********* error in setAccount ***********');
    console.log(err);
    return false;
  }
}

let content = JSON.parse(
  fs.readFileSync('./build/contracts/ProofOfExistence.json', 'utf8')
);
async function web3Setup() {
  await setAccount();
  proofofexistence = await new web3.eth.Contract(content.abi, ContractAddress);
  console.log('Web3 Connected');
  console.log(ContractAddress);
}
web3Setup();
function responsef(inpHash) {
  proofofexistence.methods
    .doesProofExist('0x' + inpHash)
    .call({ from: account })
    .then(result => {
      if (result) {
        return {
          error: 'hash already exists,try something else'
        };
      } else {
        proofofexistence.methods
          .notarizeHash('0x' + inpHash)
          .call({ from: account })
          .then(result => {
            console.log(result.number);
            console.log('document added');
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
}
app.post('/add', async (req, res) => {
  console.log(req.body);
  if (req.body.string == null || req.body.string == 'undefined') {
    res.status(400).send({
      error: 'Could not get expected keyvalues in the JSON Request Payload'
    });
  } else {
    let inp = req.body.string;
    let inpHash = sha(inp);
    proofofexistence.methods
      .doesProofExist('0x' + inpHash)
      .call({ from: account })
      .then(result => {
        if (result) {
          res.status(400).send({
            error: 'hash already exists,try something else',
            status: 'Failure'
          });
        } else {
          proofofexistence.methods
            .notarizeHash('0x' + inpHash)
            .send({ from: account })
            .then(result => {
              const response = {
                transaction: result,
                documentHash: inpHash
              };
              res.status(200).send({ data: response, status: 'Success' });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
  }
});
app.post('/verify', async (req, res) => {
  if (req.body.string == null || req.body.string == 'undefined') {
    res.status(400).send({
      error: 'Could not get expected keyvalues in the JSON Request Payload'
    });
  } else {
    let inp = req.body.string;
    let inpHash = sha(inp);
    proofofexistence.methods
      .doesProofExist('0x' + inpHash)
      .call({ from: account })
      .then(result => {
        console.log(result);
        if (result) {
          proofofexistence.methods
            .returnData('0x' + inpHash)
            .call({ from: account })
            .then(result => {
              console.log(result[0]);
              res.status(200).send({
                status: 'Success',
                timestamp: result[0],
                blocknumber: result[1]
              });
            });
        } else {
          console.log('here');
          res.status(400).send({
            status: 'Failed',
            timestamp: 0,
            blocknumber: 0
          });
        }
      });
  }
});
const port = 8000;

app.listen(port, () => console.log(`Server is running on Port ${port}`));
