# CretoFam

**CretoFam** is a decentralized social media mini-app (dApp) built on the **Base mainnet** for the **Vietnam Build Week – Base Track** (August 9–10, 2025). It empowers creators to share content (text/images), monetize through microtransactions (USDC tipping) and NFT-based "fan passes," and engage users with AI-curated content recommendations. Leveraging **Base Kit** tools (**Minikit**, **OnchainKit**, **AgentKit**, **Base Account SDK**), CretoFam delivers a modern, user-friendly SocialFi experience with sub-cent transactions, seamless onboarding, and built-in distribution via Base’s ecosystem.

---

## Vision

CretoFam aims to redefine social media by creating a **creator-first, decentralized platform** where:
- **Creators** own their content and monetize directly through microtransactions (USDC tips) and NFT-based fan passes for exclusive perks.
- **Users** engage with a vibrant, AI-curated feed of trending content, fostering authentic connections without centralized control.
- **Web3 integration** ensures low-cost, transparent transactions and seamless distribution within Base’s ecosystem (e.g., Farcaster, /base channels).
- **Community-driven growth** empowers creators and fans to co-build a decentralized social economy.

By combining **NFTs**, **AI curation**, and **Base’s low-cost blockchain**, CretoFam delivers a scalable, accessible SocialFi platform that aligns with the onchain economy’s future.

---

## Problem to Solve

Traditional social media platforms face significant challenges:
1. **Centralized Control**: Platforms like Twitter and Instagram control user data, censor content, and limit creator monetization.
2. **High Transaction Costs**: Existing Web2 monetization models (e.g., ads, subscriptions) are inefficient, with high fees and delayed payouts.
3. **Content Discoverability**: Algorithmic feeds prioritize engagement over quality, making it hard for creators to stand out.
4. **User Onboarding**: Web3 dApps often have complex wallet setups, deterring mainstream adoption.

CretoFam addresses these by:
- **Decentralizing ownership** with blockchain-based profiles and content (NFTs, onchain metadata).
- **Enabling sub-cent payments** via Base’s low-cost transactions for tipping and NFT minting.
- **Using AI curation** to highlight trending content based on onchain interactions (tips, NFT mints).
- **Simplifying onboarding** with passkey-based accounts (<60s signup) using **Base Account SDK**.

---

## How It Works

CretoFam is a decentralized social media dApp where:
1. **Creators**:
   - Sign in with **Base Account SDK** (passkey-based, no seed phrases).
   - Post text/images via **Minikit**, stored on **IPFS** with metadata on Base mainnet.
   - Monetize via:
     - **USDC tipping**: Fans send sub-cent tips (gasless via **OnchainKit**).
     - **NFT fan passes**: Mint ERC-721 tokens for exclusive content or perks.
2. **Users**:
   - Browse a feed of posts, curated by an **AgentKit**-powered AI that ranks content based on onchain interactions (tips, NFT mints).
   - Tip creators or purchase fan passes directly in-app.
3. **Distribution**:
   - Posts can be shared to Farcaster’s /base or /base-builds channels for community amplification.
   - Integration with Base App ensures discoverability within Base’s ecosystem.

**User Flow**:
1. Sign in (<60s) → View AI-curated feed → Post content → Receive tips or mint fan passes → Share to Base’s ecosystem.

---

## Technical Integration

CretoFam leverages **Base Kit** tools and a modern tech stack to deliver a seamless, decentralized experience.

### Tech Stack
- **Blockchain**: **Base mainnet** (Ethereum L2) for low-cost, fast transactions.
- **Frontend**: **Next.js/React** with **Minikit** and **OnchainKit** components.
- **Backend**: **Next.js API routes** integrated with **OnchainKit** for blockchain interactions.
- **Smart Contracts**: **Solidity** for NFT minting (`CretoFamNFT`) and tipping (`TippingContract`), deployed with Hardhat.
- **Storage**: **IPFS** (via Pinata) for images, with metadata stored onchain.
- **AI**: **AgentKit** placeholder with model-agnostic provider for content curation.
- **APIs**: **Coinbase Developer Platform (CDP)** SDK for wallet and onchain actions.

### Base Kit Integration
1. **Minikit** (High Priority):
   - `MiniKitProvider` already configured in `app/providers.tsx`.
   - Farcaster account association and notifications enabled via `api/webhook` and `api/notify`.
   - New UI: Login, Post form, Feed, Tip button, NFT mint button.
2. **OnchainKit** (Medium Priority):
   - Transactions via `@coinbase/onchainkit/transaction`.
   - Gasless USDC tips via Coinbase Paymaster (configure OnchainKit API key and sponsor).
3. **AgentKit** (Low Priority):
   - `GET /api/trending` endpoint ranks posts using onchain interactions.
4. **Base Account SDK**:
   - Passkey-based onboarding via wallet modal (Wagmi connectors through MiniKit).

### Smart Contracts
- **CretoFamNFT** (ERC-721):
  - Mint fan passes with metadata stored on IPFS.
  - `mintNFT(address recipient, string memory metadataURI)`.
- **TippingContract**:
  - Handles USDC microtransactions for tipping.
  - `tipCreator(address creator, uint256 amount)` and `withdrawTips()`.

### Architecture
```
CretoFam/
├── contracts/
│   ├── CretoFamNFT.sol
│   └── TippingContract.sol
├── scripts/
│   └── deploy.ts
├── app/
│   ├── api/
│   │   ├── post/route.ts        # Upload to IPFS + store metadata
│   │   ├── tip/route.ts         # Trigger tipping
│   │   ├── mint-nft/route.ts    # Trigger NFT minting
│   │   └── trending/route.ts    # AI-curated posts
│   └── components/
│       ├── Feed.tsx
│       ├── PostForm.tsx
│       ├── TipButton.tsx
│       └── NFTMint.tsx
├── lib/
│   └── ipfs.ts                  # IPFS helpers (Pinata)
├── hardhat.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (>=18.x)
- Hardhat
- Base CLI (`npm create onchain`)
- Coinbase Developer Platform (CDP) account
- IPFS provider (e.g., Pinata)

### Installation
1. Install dependencies:
```bash
npm install
```
2. Configure environment variables in `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_ICON_URL=
NEXT_PUBLIC_ONCHAINKIT_API_KEY=
REDIS_URL=
REDIS_TOKEN=
# Onchain
BASE_RPC_URL=https://mainnet.base.org
PRIVATE_KEY=your_wallet_private_key
USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# IPFS / Pinata
PINATA_JWT=your_pinata_jwt
```
3. Deploy smart contracts:
```bash
npm run hardhat compile
npm run deploy
```

### Running Locally
```bash
npm run dev
```
Open `http://localhost:3000`.

### Testing
```bash
npm run hardhat test
```

---

## Resources
- **Base Docs**: https://docs.base.org/get-started/base
- **Minikit & OnchainKit**: https://www.base.org/build/minikit
- **Base Account SDK**: https://www.base.org/build/base-account
- **AgentKit**: https://docs.cdp.coinbase.com/agent-kit/welcome
- **Farcaster Channels**: /base, /base-builds

---

## License
MIT
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
