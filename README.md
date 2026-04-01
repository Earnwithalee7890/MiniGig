# MiniGig - Celo Proof of Ship 🚀

MiniGig is a premium micro-task platform built specifically for **MiniPay**. It allows users to earn rewards by completing simple on-chain tasks and maintaining daily streaks.

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Framer Motion (for premium animations)
- **Blockchain**: Celo (Mainnet & Sepolia)
- **Wallet**: MiniPay (Implicit Connection)
- **Tools**: Wagmi + Viem + Hardhat

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile Smart Contracts
```bash
npx hardhat compile
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Test inside MiniPay
To test your local app on your phone via MiniPay:
1. Install [ngrok](https://ngrok.com/) if you haven't.
2. Start an HTTP tunnel to your local Vite port (usually 5173):
   ```bash
   ngrok http 5173
   ```
3. Copy the `https://...` URL provided by ngrok.
4. Open MiniPay on your phone.
5. In **Developer Settings**, tap **Load Test Page** and paste your ngrok URL.

## 🏆 Eligibility checklist for Celo Proof of Ship
- [x] **MiniPay Compatible**: Implicit connection implemented and manual connect button hidden.
- [x] **Verified Contract**: Ensure your contract is deployed and verified on Celo Explorer.
- [x] **Mobile First**: UI optimized for the 2MB MiniPay ecosystem.
- [x] **Talent Protocol**: Verification meta-tag added to `index.html`.

## 📄 License
MIT
