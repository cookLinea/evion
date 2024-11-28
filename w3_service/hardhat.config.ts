import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

const { ethers } = require("ethers");

// Function to fetch gas price and log gas details
async function logGasDetails() {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.open-campus-codex.gelato.digital');
  
  // Fetch and log the gas price
  const gasPrice = await provider.getGasPrice();
  console.log("Current Gas Price (in wei):", gasPrice.toString());

  // Prepare a sample transaction to estimate gas (this is just an example)
  const tx = {
    to: "0x86A5B482eA2f9d157a88E2494269FC9A885Fa0b1",  // Replace with actual recipient address
    value: ethers.utils.parseEther("0.1"), // Amount to send (0.1 ETH)
    gasLimit: ethers.utils.hexlify(21000), // Example gas limit for simple transaction
  };

  // Estimate gas for the sample transaction and log it
  const gasEstimate = await provider.estimateGas(tx);
  console.log("Estimated Gas Needed:", gasEstimate.toString());

  // Log the value being transferred
  console.log("Transaction Value (in wei):", tx.value.toString());
}

// Call the function to log gas details
// logGasDetails();

const gasPrice = 200000; // Example static gas price for Hardhat config

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "london",
    },
  },
  networks: {
    opencampus: {
      url: `https://rpc.open-campus-codex.gelato.digital`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    scrollTestnet: {
      url: process.env.SCROLL_TESTNET_URL || "",
      chainId: 534351,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    neoTestnet: {
      url: `https://testnet.rpc.banelabs.org`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 12227332,
      gasPrice: 60000000000, // Example static gas price
    },
    edu: {
      url: 'https://rpc.open-campus-codex.gelato.digital',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      // chainId: 656476,
      // gasPrice: gasPrice, // Use static gas price for now
    },
    linea:{
      url: 'https://linea-sepolia.blockpi.network/v1/rpc/public',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
};

export default config;