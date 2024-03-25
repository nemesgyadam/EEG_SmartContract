require('dotenv').config();
const http = require('http'); // or 'https' for https:// URLs


const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const API_URL = process.env.API_URL;

const Web3 = require('web3');
const fs = require('fs');

// Get the participant ID from the command line
var argv = require('minimist')(process.argv.slice(2));
var subject_ID = argv['_'][0];

// Load the contract ABI
const web3 = new Web3(API_URL);
const artifactsPath = 'artifacts/contracts/EEG_HC.sol/UsersInfo.json';
const contractData = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));
const usersInfoAbi = contractData.abi;
const usersInfoAddress = CONTRACT_ADDRESS; // The address of your deployed UsersInfo contract
const usersInfoContract = new web3.eth.Contract(usersInfoAbi, usersInfoAddress);



async function getData(participantId) {
  var start = new Date()

  try {
    const data_path = await usersInfoContract.methods.getData(participantId).call();
   
    console.log("Subject data available at: " +data_path);

  } catch (error) {
    console.error(error);
  }
  var end = new Date() - start
  console.info('Execution time: %dms', end)
}

if (subject_ID != undefined ){
    getData(subject_ID);
} else {
    getData('1348773b');
}