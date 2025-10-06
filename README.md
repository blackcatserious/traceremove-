# traceremove- Platform Monorepo

This repository now contains a full-stack scaffold for a digital asset platform, alongside the original cat animation demo.

## Contents
- `backend/`: Node.js service exposing REST and GraphQL APIs backed by PostgreSQL and Redis.
- `solana-programs/`: Anchor-based Solana programs for wallet management and settlement.
- `banking-integration/`: Python package that connects to SWIFT/SEPA/ACH style APIs and runs reconciliation jobs.
- `compliance/`: Compliance orchestration with KYC/AML providers, monitoring, and audit logging with HSM/KMS-friendly signatures.
- `frontend/web`: React web client for consumers, merchants, and admins.
- `frontend/mobile`: React Native + Expo mobile client scaffold.
- `deploy/`: Docker and Kubernetes deployment assets with CI/CD guidance.
- `cat_animation.html`, `view_cat_animation.py`: original demo content.

## Development Overview
See individual READMEs within each directory for setup instructions. The `.github/workflows/ci.yml` pipeline demonstrates how to build and test the components together.
