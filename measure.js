const math = require('mathjs');


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


async function getUserInfo(participantId) {
  var start = new Date();
  try {
    const userInfo = await usersInfoContract.methods.getUser(participantId).call();
    // console.log(userInfo);
  } catch (error) {
    console.error(error);
  }
  var end = new Date() - start;
  // console.info('Execution time: %dms', end);
  return end;
}

var ids = ["1348773b", "6808dfab", "0717b399", "a9223e93", "cb383bfd"];

async function executeCycle() {
  const cycles = 200;
  const ets = [];
  let callCount = 0;

  for (let i = 0; i < cycles; i++) {
    for (const value of ids) {
      const et = await getUserInfo(value);
      ets.push(et);
      callCount++;
    }
  }

  // Calculate mean and standard deviation
  const mean = math.mean(ets);
  const std = math.std(ets);

  console.info('Execution times:', ets);
  console.info('Mean:', mean);
  console.info('Standard Deviation:', std);
  console.info('Total API calls made:', callCount);
}

executeCycle();
