# MiniGig - The Premium Micro-Task Platform for MiniPay 🚀

**MiniGig** is a high-utility, mobile-first micro-task platform built specifically for the **Celo MiniPay** ecosystem. It empowers users in emerging markets to earn rewards through simple, fast, and low-cost on-chain activities.

Built for the **Celo Proof of Ship** competition (Solo Developer Project).

---

## 🤵 Solo Developer Focus
MiniGig is developed entirely by **earnwithalee**. The "Team" references on some dashboard notifications are a default platform setting. This is a **1-person execution** aimed at demonstrating high-frequency shipping and deep MiniPay integration.

---

## 🌟 Key Features

### 1. Native MiniPay Experience (Zero-Click Onboarding) 
*   **Implicit Wallet Connection**: No "Connect Wallet" button required. The app automatically detects and connects to the MiniPay wallet upon launch using `window.ethereum.isMiniPay`.
*   **Minimalistic UI**: A lightweight, high-performance interface (optimized for the 2MB MiniPay ecosystem) with a premium "MiniPay Native" look and feel.
*   **Mobile-First Design**: Optimized for the Opera Mini Android and standalone MiniPay browser experience.

### 2. On-Chain Gig Economy
*   **Daily Check-ins**: Users earn XP and maintain **On-Chain Streaks** via our smart contracts, driving daily active user (DAU) metrics.
*   **Verifiable Tasks**: "Available Gigs" (Social follows, sharing, etc.) are recorded on the Celo blockchain, providing a transparent and immutable history of user contributions.
*   **Leaderboard System**: A competitive environment that rewards the most active gig workers on Celo.

### 3. Professional Web3 Tooling
*   **Custom Fee Abstraction**: Leveraging Celo's native fee currency support for near-zero transaction costs.
*   **Legacy Transaction Support**: Explicitly built to handle MiniPay's legacy transaction requirements for 100% compatibility.
*   **Real-Time Stats**: Instant feedback on streaks, total completed tasks, and reward points.

---

## 🛠️ Technical Details

- **Blockchain**: Celo Mainnet & Celo Sepolia (L2) Testnet.
- **Smart Contracts**: Solidity (OpenZeppelin), Hardhat, Viem/Wagmi.
- **Frontend**: React + Vite + Framer Motion + Lucide Icons.
- **Styling**: Premium Glassmorphism with Vanilla CSS for maximum performance.
- **Identity**: Includes **Talent Protocol** project verification meta-tags.

---

## 🚀 Deployment & Testing

### To Test Inside MiniPay (Developer Mode)
1.  **Start Local Server**: `npm run dev` (Running on port 3000).
2.  **Start Tunnel**: Use **ngrok** to expose your local port:
    ```bash
    ngrok http 3000
    ```
3.  **Load Test Page**: Paste your ngrok URL into the "Load Test Page" section of the MiniPay app settings.

### To Deploy (Production)
1.  **Build**: `npm run build`
2.  **Push**: Every push to GitHub is automatically deployed to **Vercel** for high availability.

---

## 🏆 Proof of Ship Compliance Checklist
- [x] **MiniPay Compatible**: Implicit connection implemented.
- [x] **Mobile Optimization**: UI optimized for small screens and small data footprints.
- [x] **Solo Verification**: `author` and `package.json` updated to solo status.
- [x] **Verification**: `talentapp:project_verification` tag present in `index.html`.
- [x] **UX Excellence**: Premium animations, curated color palettes, and glassmorphic design.

---

## 📈 Roadmap

- [ ] **Phase 1**: Initial deployment and MiniPay integration (Complete).
- [ ] **Phase 2**: Real-time task verification and leaderboard (In Progress).
- [ ] **Phase 3**: MiniGig SDK for external projects to list tasks.
- [ ] **Phase 4**: Rewards distributions and MiniPay payout optimizations.

## 📱 Socials

- **Twitter/X**: [@MiniGigApp](https://twitter.com/MiniGigApp)
- **Website**: [minigig.celo](https://minigig.celo)

---

## 📄 License
Project code is licensed under the **MIT License**.
