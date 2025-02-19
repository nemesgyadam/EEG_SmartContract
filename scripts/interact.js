const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;




const contract = require("../artifacts/contracts/EEG_HC.sol/UsersInfo.json");


console.log(JSON.stringify(contract.abi));



// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="sepolia", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);