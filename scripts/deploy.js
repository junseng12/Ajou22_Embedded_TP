const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Test = await hre.ethers.getContractFactory('Test');
  const test = await Test.deploy();
  await test.deployed();
  console.log('test contract deployed to:', test.address);

  fs.writeFileSync(
    './config.js',
    `
    export const testAddress = "${test.address}"
    `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
