const hre = require("hardhat");

async function main() {
  const FileUploadContract = await hre.ethers.getContractFactory("IPFSFileStorage");
  const contract = await FileUploadContract.deploy();

  await contract.deployed();
  console.log("IPFSFileStorage contract deployed to:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
