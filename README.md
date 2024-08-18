<img src="https://github.com/user-attachments/assets/89d68964-4590-440f-80ad-64a6678a27d7" alt="ethereum-player-image"/>

# d-music-shop

This project demonstrates how to build a decentralized application (dApp) for managing and selling digital music albums on a test blockchain. <br/> <br/> This project highlights the interaction between a frontend built in TypeScript and a backend based on Solidity smart contracts.  The primary focus of the project is to illustrate how to seamlessly connect a blockchain backend with a frontend using TypeScript.

## Table of Contents
- [Introduction](#d-music-shop)
- [Theory Notes](#theory-notes)
  - [How does blockchain and frontend interact?](#how-does-blockchain-and-frontend-interact)
  - [What is TypeChain?](#what-is-typechain)
- [Features and Functionality](#features-and-functionality)
- [Implementation](#implementation)
  - [Blockchain Contract Overview](#blockchain-contract-overview)
  - [Frontend Overview](#frontend-overview)
- [Running the Project Locally](#running-the-project-locally)

## Theory Notes

### How does blockchain and frontend interact?

In this project, the frontend communicates with the blockchain through smart contracts deployed on the blockchain. The frontend uses the Ethereum provider (such as MetaMask) to send transactions and interact with the blockchain. The state of the blockchain is queried to display real-time information on the frontend, such as the list of available albums, order status, and user account balances.

### What is TypeChain?

TypeChain is a tool that generates TypeScript typings for Ethereum smart contracts. It helps in ensuring type safety in a dApp by creating strongly typed contract interfaces. In this project, TypeChain is used to generate TypeScript types from the Solidity contract ABI files, making it easier to interact with the smart contracts from the TypeScript-based frontend.

## Features and Functionality

- **Album Management**: Allows the owner to add new albums with details such as title, price, and quantity.
- **Purchasing Albums**: Users can purchase albums by sending the exact required amount of Ether.
- **Order Tracking**: The smart contract tracks the state of orders, from payment to delivery.
- **User Account Management**: Displays user account information, including the connected wallet address and balance.

## Implementation

### Blockchain Contract Overview

The smart contracts in this project manage the lifecycle of albums and orders. The `AlbumTracker` contract handles the creation, payment, and delivery of albums, while the `MusicShop` contract manages the listing of albums and tracks customer orders. These contracts use Solidity's event system to emit logs that the frontend can listen to in order to update the UI in real time.

### Frontend Overview

The frontend of the "d-music-shop" is built with React and TypeScript. It interacts with the smart contracts via the Ethers.js library and TypeChain-generated types. Users can connect their Ethereum wallet, view available albums, purchase albums, and track their orders through an intuitive interface.

<img src="https://github.com/user-attachments/assets/44469617-d84c-48be-b23f-cab546b2a351" alt="image-of-an-application"/>

## Running the Project Locally

To run the project locally, follow these steps:

1. **Clone the repository and navigate to the project directory:**
   ```bash
   git clone https://github.com/sssshefer/d-music-shop.git
   cd d-music-shop
2. **Start a local blockchain node:**

  ```bash
  npx hardhat node
  ```
3. **Deploy the contracts to the local network:**
  Open another terminal and run:
  ```bash
  npx hardhat run deploy/deploy.ts --network localhost
  ```
4. **(Optional) Generate TypeScript types for smart contracts using TypeChain:**
  ```bash
  npx typechain --target ethers-v6 --out-dir ./front/src/typechain "artifacts/contracts/**/*[!dbg].json"
  ```
5. **Start the frontend development server:**
  ```bash
  npm run dev
  ```
  You should now be able to access the dApp in your browser at http://localhost:3000.
<hr/>

***Happy Hacking***
