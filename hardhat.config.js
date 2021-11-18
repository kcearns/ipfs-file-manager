require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.PROJECT_ID}`,
      accounts: [process.env.KEY]
    }
  },
  solidity: "0.8.0",
};


