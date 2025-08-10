import { ethers } from "hardhat";

async function main() {
  const usdcAddress = process.env.USDC_ADDRESS;
  if (!usdcAddress) throw new Error("USDC_ADDRESS missing in env");

  const NFT = await ethers.getContractFactory("CretoFamNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("CretoFamNFT deployed:", nft.address);

  const Tipping = await ethers.getContractFactory("TippingContract");
  const tipping = await Tipping.deploy(usdcAddress);
  await tipping.deployed();
  console.log("TippingContract deployed:", tipping.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

