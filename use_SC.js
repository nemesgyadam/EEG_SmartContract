require('dotenv').config();
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


function formatCurrentDate(format = 'YYYY-MM-DD') {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}


async function getUserInfo(participantId) {
  var start = new Date()
  try {
    const userInfo = await usersInfoContract.methods.getUser(participantId).call();
   
    console.log(userInfo);
  } catch (error) {
    console.error(error);
  }
  var end = new Date() - start
  console.info('Execution time: %dms', end)
}

if (subject_ID != undefined ){
    getUserInfo(subject_ID);
} else {
    getUserInfo('1348773b');
}
