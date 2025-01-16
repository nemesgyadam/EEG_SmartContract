require('dotenv').config();
let CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
let API_URL = process.env.API_URL;

let Web3 = require('web3');
let fs = require('fs');

// Get the participant ID from the command line
var argv = require('minimist')(process.argv.slice(2));
var subject_ID = argv['_'][0];

// Load the contract ABI
let web3 = new Web3(API_URL);
let artifactsPath = 'artifacts/contracts/EEG_HC.sol/UsersInfo.json';
let contractData = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));
let usersInfoAbi = contractData.abi;
let usersInfoAddress = CONTRACT_ADDRESS; // The address of your deployed UsersInfo contract
let usersInfoContract = new web3.eth.Contract(usersInfoAbi, usersInfoAddress);



async function getUserInfo(participantId) {
  var start = new Date()
  try {
    const userInfo = await usersInfoContract.methods.getUser(participantId).call();
   
    console.log(`User Info for ${participantId}:`, userInfo);
  } catch (error) {
     if (error.message.includes('invalid')) {
      console.error(`Error: Invalid participant ID ${participantId}.`);
    } else if (error.message.includes('network')) {
      console.error(`Error: Network issue w${participantId}`);
    } else if (error.message.includes('call')) {
      console.error(`Error: The ID might not exist ${participantId}`);
    } else {
      console.error(`Unexpected error for ${participantId}: ${error.message}`);
    }
  }
  var end = new Date() - start
  console.info('Execution time: %dms', end)
}

if (subject_ID != undefined ){
    getUserInfo(subject_ID);
} else {
    getUserInfo('1348773b');
}