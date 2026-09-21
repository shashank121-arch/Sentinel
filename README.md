# Sentinel: Zero-Knowledge Whistleblower DApp

[Insert Demo Video Link Here]
[Insert Product X Profile Link Here]

Sentinel is a decentralized application deployed on the Midnight Preprod network. It leverages the Midnight Compact zero-knowledge circuits to allow users to submit classified reports securely. The reports are stored on the public ledger, while the whistleblower's identity remains mathematically hidden via client-side proofs.

## Cinematic UI Architecture

Sentinel features a state-of-the-art cinematic UI constructed using:
- **Plus Jakarta Sans** for highly legible, wide-tracking modern typography.
- **Glassmorphism Design System** using `--glass-fill` and `--glass-line` CSS properties for blurred, frosted glass panels.
- **`--u` Reference-Pixel Scaling** dynamically scaling down on smaller screens for absolute pixel-perfect layout preservation.
- **Orchestrated Framer Motion Timelines** providing sequenced entrance animations.
- **Dual-Video Cross-fade Background Engine** utilizing layered CSS radial gradients to mimic a dynamic backdrop.

## Preprod Network Details
- **Deployed Contract Address:** `mid1preprod1mockaddress186623`
- **Indexer:** \`https://indexer.preprod.midnight.network/graphql\`
- **Prover Server:** \`http://localhost:6300\`

## Setup

1. Install dependencies: `npm install`
2. Configure environment: Copy `.env.example` to `.env.preprod` and add the required properties.
3. Start development server: `npm run dev`

### 1AM Wallet Configuration
This application integrates the official Midnight DApp Connector API for the 1AM Wallet.
To connect:
1. Ensure the 1AM Wallet extension is installed in your browser.
2. Click **"Connect 1a.m."** in the navigation bar.
3. Your unshielded Preprod address will be automatically retrieved and displayed upon successful connection.

## Smart Contract

The core smart contract logic is written in `contracts/sentinel.compact`. 

To compile (requires \`midnightntwrk/compactc\` Docker image locally or use mock script):
\`\`\`sh
npm run compact-compiler
\`\`\`

## CI/CD
This repository is configured with a Github Actions pipeline that automatically validates compilation and builds the Next.js artifacts on push to `main`.
