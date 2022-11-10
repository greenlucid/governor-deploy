require("dotenv").config();

import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "hardhat-contract-sizer"

import { HardhatUserConfig } from "hardhat/types/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
  solidity: {
    version: "0.4.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    xdai: {
      url: "https://rpc.gnosischain.com",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      "xdai": process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "xdai",
        chainId: 100,
        urls: {
          apiURL: "https://api.gnosisscan.io",
          browserURL: "https://gnosisscan.io"
        }
      }
    ]
  },
}

export default config
