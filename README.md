# Sentinel: Zero-Knowledge Whistleblower DApp

[![CI Pipeline](https://github.com/shashank121-arch/Sentinel/actions/workflows/ci.yml/badge.svg)](https://github.com/shashank121-arch/Sentinel/actions/workflows/ci.yml)

[Insert Demo Video Link Here]
[Insert Product X Profile Link Here]

**Sentinel** is a decentralized application deployed on the Midnight Preprod network. It leverages the Midnight Compact zero-knowledge circuits to allow users to submit classified reports securely. The reports are stored on the public ledger, while the whistleblower's identity remains mathematically hidden via client-side proofs.

---

## 🏗 Zero-Knowledge Architecture

Sentinel operates on the principle of *Private State, Public Verification*:
1. **Client-Side Proof Generation:** When a whistleblower submits a report, the payload (along with their organizational secret key) is passed to the local Midnight prover server.
2. **Witness Verification:** The Zero-Knowledge Compact smart contract verifies that the secret key matches the organization's cryptographic commitments without exposing the key itself.
3. **Public Ledger Commit:** Once validated, only the necessary public disclosure (the report category and statement) is appended to the Midnight Preprod blockchain. The author's identity leaves zero trace.

## 🎨 Cinematic UI Architecture

Sentinel features a state-of-the-art cinematic UI constructed using:
- **Plus Jakarta Sans** for highly legible, wide-tracking modern typography.
- **Glassmorphism Design System** using `--glass-fill` and `--glass-line` CSS properties for blurred, frosted glass panels.
- **`--u` Reference-Pixel Scaling** dynamically scaling down on smaller screens for absolute pixel-perfect layout preservation without JS overhead.
- **Orchestrated CSS Timelines** providing synchronized entrance animations.
- **Dual-Video Cross-fade Background Engine** utilizing layered cross-fading for seamless, infinitely looping cinematic backdrops.

---

## 🌐 Preprod Network Details

- **Deployed Contract Address:** `mid1preprod1mockaddress186623`
- **Indexer:** `https://indexer.preprod.midnight.network/graphql`
- **Prover Server:** `http://localhost:6300`

---

## 🚀 Setup & Local Usage

Follow these steps to run the Sentinel environment locally.

### 1. Proof Server Preparation
Sentinel requires a running Midnight Proof Server to generate ZK proofs client-side.
```sh
docker run -p 6300:6300 midnightntwrk/proof-server:latest
```

### 2. Install Dependencies
Ensure you have Node.js 18+ installed.
```sh
npm install
```

### 3. Environment Variables
Copy the example environment configuration to point to Preprod.
```sh
cp .env.example .env.preprod
```
Ensure your `.env.preprod` contains:
```env
NEXT_PUBLIC_MIDNIGHT_NETWORK=preprod
NEXT_PUBLIC_PROVER_URL=http://localhost:6300
NEXT_PUBLIC_INDEXER_URL=https://indexer.preprod.midnight.network/graphql
NEXT_PUBLIC_CONTRACT_ADDRESS=mid1preprod1mockaddress186623
```

### 4. 1AM Wallet Configuration
This application integrates the official Midnight DApp Connector API for the 1AM Wallet.
To connect:
1. Ensure the **1AM Wallet extension** is installed in your browser.
2. Click **"Connect 1a.m."** in the top navigation bar.
3. Authorize the connection to the `preprod` network. Your unshielded address will be automatically retrieved and displayed upon successful connection.

### 5. Start the Development Server
```sh
npm run dev
```
Navigate to `http://localhost:3000` to interact with the DApp.

---

## 📜 Smart Contract Lifecycle

The core smart contract logic is written in `contracts/sentinel.compact`. 

To compile the ZK artifacts and TypeScript bindings (requires the `midnightntwrk/compactc` Docker image or our configured script):
```sh
npm run compact-compiler
```

To execute a fresh deployment to the Preprod network:
```sh
npm run deploy
```

---

## ⚙️ CI/CD Integration
This repository is configured with a GitHub Actions pipeline (`.github/workflows/ci.yml`) that automatically:
- Validates the Next.js frontend build.
- Lints the TypeScript configurations.
- Compiles the ZK proof artifacts.
It executes securely on every push and pull request to the `main` branch.

### 6. Automated Testing
Sentinel includes a Playwright test suite to simulate the e2e flow.
```sh
npx playwright test
```
