# MiniGig 🚀 (Mainnet Ready)

MiniGig is a high-utility, MiniPay-compatible micro-task platform built on the Celo blockchain. Designed for the **Celo Proof of Ship** competition, it provides a seamless on-chain experience for users to complete tasks, check in daily, and earn rewards within the Celo ecosystem.

## 🌟 Key Features

- **MiniPay Optimized:** Designed specifically for a mobile-first, wallet-native experience using MiniPay on Celo.
- **On-Chain Check-Ins:** Boost activity metrics with a daily check-in system that tracks streaks.
- **Micro-Tasking (Gigs):** Secure and verifiable task completion using smart contracts.
- **Reward System:** Earn virtual points and track your progress on-chain.
- **Modern UI:** Built with React, Tailwind CSS, and Framer Motion for a premium, responsive feel.

## 🛠 Tech Stack

- **Blockchain:** Celo (L2 Ethereum-compatible network)
- **Smart Contracts:** Solidity, Hardhat
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Wallet Connection:** Wagmi, Viem (Optimized for MiniPay and OKX)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Earnwithalee7890/MiniGig.git
   cd MiniGig
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📜 Smart Contract

The core smart contract logic is deployed on the Celo network. It handles user stats, streaks, and gig completions.

- **Contract Address:** `0xe7b16c2e34fc3a347e3243fbeb3518830afe647b`
- **Explorer:** [CeloScan Link](https://celoscan.io/address/0xe7b16c2e34fc3a347e3243fbeb3518830afe647b)

### Smart Contract Logic
The logic can be found in `contracts/MiniGig.sol`. It is optimized for daily active usage and streak tracking on the MiniPay platform.

## 🏆 Celo Proof of Ship

MiniGig aims to be a top-tier project in the Celo Proof of Ship competition by providing real utility and driving daily active usage (DAU) on the Celo network.

---

Built with ❤️ by [Earnwithalee](https://github.com/Earnwithalee7890)
