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
- **Frontend**: **React** with **Minikit** components for UI (e.g., `SignInWithBase`, `NFTMintButton`).
- **Backend**: **Node.js** for API handling, integrated with **OnchainKit** for blockchain interactions.
- **Smart Contracts**: **Solidity** for NFT minting (`CretoFamNFT`) and tipping (`TippingContract`), deployed with Hardhat.
- **Storage**: **IPFS** (via Pinata) for images, with metadata stored onchain.
- **AI**: **AgentKit** with a model-agnostic LLM (e.g., Claude) for content curation.
- **APIs**: **Coinbase Developer Platform (CDP)** SDK for wallet and onchain actions.

### Base Kit Integration
1. **Minikit** (High Priority):
   - **SignInWithBase**: Passkey-based login for seamless onboarding.
   - **NFTMintButton**: UI component for minting fan passes.
   - Custom forms for posting content to IPFS.
2. **OnchainKit** (Medium Priority):
   - Handles gasless USDC tipping via **Coinbase Paymaster**.
   - Manages blockchain interactions (e.g., querying balances, sending transactions).
3. **AgentKit** (Low Priority):
   - AI agent curates trending posts based on onchain data (tips, NFT mints).
   - Example action: `getTrendingPosts` to fetch top content.
4. **Base Account SDK**:
   - Enables <60s onboarding with passkey-based universal accounts.

### Smart Contracts
- **CretoFamNFT** (ERC-721):
  - Mint fan passes with metadata stored on IPFS.
  - Example: `mintNFT(address recipient, string memory metadataURI)`.
- **TippingContract**:
  - Handles USDC microtransactions for tipping.
  - Functions: `tipCreator(address creator, uint256 amount)`, `withdrawTips()`.

### Architecture
```
CretoFam/
├── contracts/                    # Solidity smart contracts
│   ├── CretoFamNFT.sol          # ERC-721 for fan passes
│   ├── TippingContract.sol      # USDC tipping logic
├── frontend/                     # React frontend with Minikit
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx        # SignInWithBase component
│   │   │   ├── PostForm.jsx     # Content posting UI
│   │   │   ├── Feed.jsx         # AI-curated feed
│   │   │   ├── TipButton.jsx    # Tipping UI
│   │   │   ├── NFTMint.jsx      # NFT minting UI
├── backend/                      # Node.js APIs with OnchainKit
│   ├── server.js
│   ├── routes/
│   │   ├── post.js              # Upload to IPFS
│   │   ├── tip.js               # Trigger tipping
│   │   ├── mint-nft.js          # Trigger NFT minting
│   │   ├── trending.js          # Fetch AI-curated posts
├── scripts/                      # Hardhat scripts
│   ├── deploy.js                # Deploy to Base mainnet
│   ├── test.js                  # Unit tests
├── README.md                     # Project documentation
├── package.json                  # Dependencies
├── hardhat.config.js             # Hardhat configuration
```

---

## Scale Plan

CretoFam is designed for scalability and long-term growth beyond the hackathon:

1. **User Growth**:
   - Leverage Base’s ecosystem (e.g., Base App, Farcaster) for organic distribution.
   - Partner with influencers on /base and /base-builds channels to onboard creators.
   - Offer referral programs (e.g., bonus USDC for inviting users).

2. **Feature Expansion**:
   - Add video support (short-form content) with IPFS storage.
   - Introduce group chats or “fan clubs” tied to NFT fan passes.
   - Enhance AI curation with user preferences (e.g., personalized feeds).

3. **Monetization**:
   - Implement a 2–5% platform fee on tips/NFT sales to sustain operations.
   - Launch premium fan passes with tiered benefits (e.g., exclusive AMAs).
   - Explore ad-free, subscription-based models for premium users.

4. **Technical Scalability**:
   - Optimize smart contracts for gas efficiency as user base grows.
   - Use Base’s L2 scaling to handle high transaction volumes.
   - Integrate additional L2 chains (e.g., Polygon, Optimism) for cross-chain compatibility.

5. **Community Building**:
   - Open-source CretoFam to attract Web3 developers.
   - Host hackathons or bounties for new features (e.g., AI plugins).
   - Create a governance token for community-driven decisions.

6. **Global Reach**:
   - Localize UI for multiple languages (starting with Vietnamese and English).
   - Target emerging markets with low-cost transactions (sub-cent payments).
   - Partner with Web3 platforms like Coinbase Wallet for broader adoption.

---

## Getting Started

### Prerequisites
- Node.js (>=16.x)
- Hardhat
- Base CLI (`npm create onchain`)
- Coinbase Developer Platform (CDP) account
- IPFS provider (e.g., Pinata)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Lieulieu/CretoFam.git
   cd CretoFam
   ```
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Configure environment variables:
   - Create `.env` in the root directory:
     ```
     BASE_RPC_URL=https://mainnet.base.org
     PRIVATE_KEY=your_wallet_private_key
     PINATA_API_KEY=your_pinata_api_key
     PINATA_API_SECRET=your_pinata_api_secret
     ```
4. Deploy smart contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network base
   ```

### Running Locally
1. Start the backend:
   ```bash
   cd backend
   node server.js
   ```
2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```
3. Access the dApp at `http://localhost:3000`.

### Deploying to Base Mainnet
1. Update `hardhat.config.js` with Base mainnet settings.
2. Deploy contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network base
   ```
3. Deploy frontend to a hosting service (e.g., Vercel).
4. Test gasless transactions with **Coinbase Paymaster**.

### Testing
Run unit tests for smart contracts:
```bash
npx hardhat test
```

---

## Hackathon Submission

CretoFam is submitted to the **Vietnam Build Week – Base Track** (August 9–10, 2025) with:
- **GitHub Repo**: https://github.com/Lieulieu/CretoFam .
- **Demo URL**: Deployed dApp on Base mainnet (TBD).
- **Demo Video**: 10-minute video showcasing:
  - Sign-in with **Base Account SDK** (<60s).
  - Posting content and minting NFTs with **Minikit**.
  - Tipping creators (gasless) with **OnchainKit**.
  - AI-curated feed via **AgentKit**.
  - Sharing to Farcaster’s /base channel.
- **Judging Criteria**:
  - **Usefulness**: Empowers creators with direct monetization.
  - **Accessibility**: <60s onboarding, intuitive UI.
  - **Originality**: Combines NFTs, AI, and SocialFi on Base.
  - **Wow Factor**: Gasless transactions, AI curation, modern design.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## Resources
- **Base Docs**: https://docs.base.org/get-started/base
- **Minikit & OnchainKit**: https://www.base.org/build/minikit
- **Base Account SDK**: https://www.base.org/build/base-account
- **AgentKit**: https://docs.cdp.coinbase.com/agent-kit/welcome
- **Vietnam Build Week**: https://dorahacks.io/hackathon/vnbw/tracks
- **Farcaster Channels**: /base, /base-builds

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or support, reach out on:
- **Linkedin**: https://www.linkedin.com/in/lieulieunft/
- **X**:  https://x.com/lieulieunft
- **Email**: lieulieunft@gmail.com

---

### **Notes for Customization**
- **GitHub Repo Link**: Update `https://github.com/Lieulieu/CretoFam.git` with your actual repository link.
- **Demo URL**: TBA.
- **Team Info**: Lieulieu .
- **Hackathon Link**: https://dorahacks.io/hackathon/vnbw/tracks .
- **Contact Info**: https://x.com/lieulieunft .
