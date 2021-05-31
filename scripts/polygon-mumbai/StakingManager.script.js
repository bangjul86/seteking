require('dotenv').config()
//const Tx = require('ethereumjs-tx').Transaction

/// Web3 instance
const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/${ process.env.INFURA_KEY }`)
const web3 = new Web3(provider)

/// Import deployed-addresses
const contractAddressList = require("../../migrations/addressesList/contractAddress/contractAddress.js")
const tokenAddressList = require("../../migrations/addressesList/tokenAddress/tokenAddress.js")

/// Artifact of smart contracts 
const LPToken = artifacts.require("LPToken")
const RewardToken = artifacts.require("RewardToken")
const StakingNFTBadgeFor3Months = artifacts.require("StakingNFTBadgeFor3Months")
const StakingNFTBadgeFor6Months = artifacts.require("StakingNFTBadgeFor6Months")
const StakingNFTBadgeFor1Year = artifacts.require("StakingNFTBadgeFor1Year")
const StakingPool = artifacts.require("StakingPool")
const StakingManager = artifacts.require("StakingManager")


/// Deployed-contract addresses on Polygon testnet
let LP_TOKEN = tokenAddressList["Polygon Mumbai"]["LPToken"]
let REWARD_TOKEN = tokenAddressList["Polygon Mumbai"]["RewardToken"]
let BADGE_FOR_3_MONTHS = contractAddressList["Polygon Mumbai"]["StakingNFTBadgeFor3Months"]
let BADGE_FOR_6_MONTHS = contractAddressList["Polygon Mumbai"]["StakingNFTBadgeFor6Months"]
let BADGE_FOR_1_YEAR = contractAddressList["Polygon Mumbai"]["StakingNFTBadgeFor1Year"]
let STAKING_POOL = contractAddressList["Polygon Mumbai"]["StakingPool"]
let STAKING_MANAGER = contractAddressList["Polygon Mumbai"]["StakingManager"]

/// Variable to assign a Geyser contract address
// let LP_TOKEN
// let REWARD_TOKEN
// let BADGE_FOR_3MONTHS
// let BADGE_FOR_6MONTHS
// let BADGE_FOR_1YEAR
// let STAKING_POOL
// let STAKING_MANAGER

/// Global contract instance
let lpToken
let rewardToken
let badgeFor3Months
let badgeFor6Months
let badgeFor1Year
let stakingPool
let stakingManager

/// Acccounts
let deployer


/***
 * @dev - Execution COMMAND: $ npm run script:StakingManager
 *        ($ truffle exec ./scripts/polygon-mumbai/StakingManager.script.js --network polygon_mumbai) 
 **/


///-----------------------------------------------
/// Execute all methods
///-----------------------------------------------

/// [Note]: For truffle exec (Remarks: Need to use module.exports)
module.exports = function(callback) {
    main().then(() => callback()).catch(err => callback(err))
};

async function main() {
    console.log("\n------------- Set wallet addresses -------------")
    await setWalletAddress()

    console.log("\n------------- Setup smart contracts on Polygon mumbai testnet -------------")
    await SetupSmartContracts()

    console.log("\n------------- Workflow of the StakingManager contract -------------")


}


///-----------------------------------------------
/// Preparation
///-----------------------------------------------
async function setWalletAddress() {
    console.log("Wallet address should be assigned into deployer")
    deployer = process.env.DEPLOYER_ADDRESS
    //deployer = process.env.EXECUTOR_ADDRESS

    /// [Log]
    console.log('=== deployer ===', deployer)
}

async function SetupSmartContracts() {
    console.log("Deploy the LP Token (mock) contract instance")
    //console.log("Create the LP Token (mock) contract instance")
    lpToken = await LPToken.new({ from: deployer })
    //lpToken = await LPToken.at(LP_TOKEN)
    LP_TOKEN = lpToken.address

    console.log("Deploy the Reward Token (mock) contract instance")
    //console.log("Create the Reward Token (mock) contract instance")
    rewardToken = await RewardToken.new({ from: deployer })
    //rewardToken = await RewardToken.at(REWARD_TOKEN)
    REWARD_TOKEN = rewardToken.address

    //console.log("Deploy the StakingNFTBadgeFor3Months contract instance")
    console.log("Create the StakingNFTBadgeFor3Months contract instance")
    //badgeFor3Months = await StakingNFTBadgeFor3Months.new({ from: deployer })
    badgeFor3Months = await StakingNFTBadgeFor3Months.at(BADGE_FOR_3_MONTHS)
    //BADGE_FOR_3_MONTHS = badgeFor3Months.address

    //console.log("Deploy the StakingNFTBadgeFor6Months contract instance")
    console.log("Create the StakingNFTBadgeFor6Months contract instance")
    //badgeFor6Months = await StakingNFTBadgeFor6Months.new({ from: deployer })
    badgeFor6Months = await StakingNFTBadgeFor6Months.at(BADGE_FOR_6_MONTHS)
    //BADGE_FOR_6_MONTHS = badgeFor6Months.address

    //console.log("Deploy the StakingNFTBadgeFor1Year contract instance")
    console.log("Create the StakingNFTBadgeFor1Year contract instance")
    //badgeFor1Year = await StakingNFTBadgeFor1Year.new({ from: deployer })
    badgeFor1Year = await StakingNFTBadgeFor1Year.at(BADGE_FOR_1_YEAR)
    //BADGE_FOR_1_YEAR = badgeFor1Year.address

    //console.log("Deploy the StakingPool contract instance")
    console.log("Create the StakingPool contract instance")
    //stakingPool = await StakingPool.new(LP_TOKEN, { from: deployer })
    stakingPool = await StakingPool.at(STAKING_POOL)
    //STAKING_POOL = stakingPool.address

    //console.log("Deploy the StakingManager contract instance")
    console.log("Create the StakingManager contract instance")
    // stakingManager = await StakingManager.new(LP_TOKEN, 
    //                                           REWARD_TOKEN, 
    //                                           STAKING_POOL, 
    //                                           STAKING_NFT_BADGE_FOR_3_MONTHS, 
    //                                           STAKING_NFT_BADGE_FOR_6_MONTHS, 
    //                                           STAKING_NFT_BADGE_FOR_1_YEAR, 
    //                                           { from: deployer })
    stakingManager = await StakingManager.at(STAKING_MANAGER)
    //STAKING_MANAGER = stakingManager.address

    /// Logs (each deployed-contract addresses)
    console.log('=== LP_TOKEN ===', LP_TOKEN)    
    console.log('=== REWARD_TOKEN ===', REWARD_TOKEN)
    console.log('=== BADGE_FOR_3_MONTHS ===', BADGE_FOR_3_MONTHS)    
    console.log('=== BADGE_FOR_6_MONTHS ===', BADGE_FOR_6_MONTHS)
    console.log('=== BADGE_FOR_1_YEAR ===', BADGE_FOR_1_YEAR)
    console.log('=== STAKING_POOL ===', STAKING_POOL)
    console.log('=== STAKING_MANAGER ===', STAKING_MANAGER)
}


///--------------------------------------------
/// Methods
///--------------------------------------------
async function something() {}

async function something() {}






///--------------------------------------------
/// Get event
///--------------------------------------------
async function getEvents(contractInstance, eventName) {
    const _latestBlock = await getCurrentBlock()
    const LATEST_BLOCK = Number(String(_latestBlock))

    /// [Note]: Retrieve an event log of eventName (via web3.js v1.0.0)
    let events = await contractInstance.getPastEvents(eventName, {
        filter: {},
        fromBlock: LATEST_BLOCK,  /// [Note]: The latest block on Kovan testnet
        //fromBlock: 0,
        toBlock: 'latest'
    })
    console.log(`\n=== [Event log emitted]: ${ eventName } ===`, events[0].returnValues)
    return events[0].returnValues
} 


///---------------------------------------------------------
/// Get current block number
///---------------------------------------------------------
async function getCurrentBlock() {
    const currentBlock = await web3.eth.getBlockNumber()
    return currentBlock
}

async function getCurrentTimestamp() {
    const currentBlock = await web3.eth.getBlockNumber()
    const currentTimestamp = await web3.eth.getBlock(currentBlock).timestamp

    return currentTimestamp
}


///---------------------------------------------------------
/// Methods for converting unit
///---------------------------------------------------------
function toWei(amount) {
    return web3.utils.toWei(`${ amount }`, 'ether')
} 

function fromWei(amount) {
    return web3.utils.fromWei(`${ amount }`, 'ether')
}
