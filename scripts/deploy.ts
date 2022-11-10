// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat"

const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

const ARBITRATOR = "0x9C1dA9A04925bDfDedf0f6421bC7EEa8305F9002"
const EXTRADATA = "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
const SUBMISSION_BASE_DEPOSIT = "15000000000000000000"
const SUBMISSION_TIMEOUT = 626400
const EXECUTION_TIMEOUT = 604800
const WITHDRAW_TIMEOUT = 3600
const SHARED_MULTIPLIER = 10000
const WINNER_MULTIPLIER = 10000
const LOSER_MULTIPLIER = 20000


// npx hardhat verify --network xdai 0xf7dE5537eCD69a94695fcF4BCdBDeE6329b63322 "0x9C1dA9A04925bDfDedf0f6421bC7EEa8305F9002" "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001" "15000000000000000000" 626400 604800 3600 10000 10000 20000


const METAEVIDENCE = "/ipfs/QmNNdw1QxLjLH7WZnZv4sFYH6CkFsKJNX8UvtEDaMjCXq7/metaEvidence.json"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await run("compile")

  // We get the contract to deploy
  //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
  const KlerosGovernor = await ethers.getContractFactory("KlerosGovernor")
  const klerosGovernor = await KlerosGovernor.deploy(ARBITRATOR, EXTRADATA, SUBMISSION_BASE_DEPOSIT, SUBMISSION_TIMEOUT, EXECUTION_TIMEOUT, WITHDRAW_TIMEOUT, SHARED_MULTIPLIER, WINNER_MULTIPLIER, LOSER_MULTIPLIER)

  await klerosGovernor.deployed()

  console.log("Deployed to:", klerosGovernor.address)

  // giving time for etherscan to keep up
  await sleep(50)

  await klerosGovernor.setMetaEvidence(METAEVIDENCE)

  await sleep(50)

  // verify in etherscan
  const etherscanResponse = await run("verify:verify", {
    address: klerosGovernor.address,
    constructorArguments: [ARBITRATOR, EXTRADATA, SUBMISSION_BASE_DEPOSIT, SUBMISSION_TIMEOUT, EXECUTION_TIMEOUT, WITHDRAW_TIMEOUT, SHARED_MULTIPLIER, WINNER_MULTIPLIER, LOSER_MULTIPLIER],
  })




  // if you mess this up:
  // npx hardhat verify --network kovan DEPLOYED_CONTRACT_ADDRESS 300 {governor} "/ipfs/QmRapgPnC9HM7CueMmJhMMdrh5J9YePBn6SxmS5G3xjwcL/metaevidence.json"

  console.log("Verified in etherscan", etherscanResponse)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
