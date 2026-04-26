# @earnwithalee7890/minigig-sdk 🚀

The official developer toolkit for **MiniGig**, the premium micro-task platform on Celo. Built for high-performance integrations with **MiniPay** and **Talent Protocol**.

[![npm version](https://img.shields.io/npm/v/@earnwithalee7890/minigig-sdk.svg)](https://www.npmjs.com/package/@earnwithalee7890/minigig-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Talent Protocol](https://img.shields.io/badge/Talent%20Protocol-Integrated-blue)](https://talentprotocol.com)

## 🌟 Features

- **On-Chain Activity Tracking**: Interact with MiniGig smart contracts on Celo.
- **Talent Protocol Integration**: Built-in support for fetching **Builder Scores** and **Talent Passports**.
- **MiniPay Optimized**: Lightweight and compatible with the MiniPay mobile ecosystem.
- **Type-Safe**: Full TypeScript support with Viem.

## 📦 Installation

```bash
npm install @earnwithalee7890/minigig-sdk
```

## 🛠 Usage

### Initialize the SDK

```typescript
import { MiniGigSDK } from '@earnwithalee7890/minigig-sdk';

const sdk = new MiniGigSDK();
```

### Talent Protocol Integration

MiniGig uses Talent Protocol to verify professional reputation. You can easily fetch a user's Builder Score:

```typescript
const address = '0x123...';
const score = await sdk.getTalentScore(address);
console.log(`Builder Score: ${score}`);

if (await sdk.isTopTalent(address)) {
  console.log("User is a top builder!");
}
```

### On-Chain Activity

Check user streaks and activity count on Celo:

```typescript
const count = await sdk.getUserActivityCount(address);
console.log(`Total Activities: ${count}`);
```

## 🏗 Talent Protocol Requirements

This SDK follows the official Talent Protocol requirements for ecosystem tools:
- [x] **Metadata**: Includes `talent-protocol` and `builders-score` keywords.
- [x] **Verification**: Built-in methods to validate Talent Passport attestations.
- [x] **Reputation**: Focuses on professional on-chain reputation.

## 📄 License

MIT © [earnwithalee](https://github.com/Earnwithalee7890)
