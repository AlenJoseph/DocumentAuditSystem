const fs = require('fs');
const ProofOfExistence = artifacts.require('./ProofOfExistence.sol');

module.exports = function(deployer) {
  deployer
    .deploy(ProofOfExistence)
    .then(() => console.log(ProofOfExistence.address))
    .then(() => ProofOfExistence.deployed())
    .then(_instance => {
      console.log(_instance);
      const ProofOfExistence = {
        address: _instance.address
      };
      const jsonString = JSON.stringify(ProofOfExistence);
      fs.writeFile('./blockChainconfig.json', jsonString, err => {
        if (err) {
          console.log('Error writing file', err);
        } else {
          console.log('Successfully wrote file');
        }
      });
    });
};
