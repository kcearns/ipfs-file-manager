# IPFS File Manager Example

This project demonstrates a very simple IPFS file uploader that saves the URL and wallet address to an array in a smart contract.

To run this example locally:

```
- Rename .env.example to .env and update it with your project ID and key
- Run: yarn install
- Start hardhat node: npx hardhat node
- Deploy contract: npx hardhat run --network localhost scripts/deploy.js
- Update src/utils/constants.js with the contract address output from the run command
- Start application: yarn dev
```
