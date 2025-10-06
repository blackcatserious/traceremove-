# Backend Service

This Node.js service orchestrates user accounts, wallets, and transaction settlement. It exposes REST and GraphQL APIs while persisting data in PostgreSQL and leveraging Redis for caching and idempotency controls.

## Features
- User account registration with Redis-backed caching.
- Wallet provisioning and balance management.
- Transaction orchestration that coordinates ledger updates with wallet balances.
- REST endpoints under `/api` and a GraphQL endpoint at `/graphql`.
- Structured logging and environment-driven configuration.

## Getting Started
1. Install dependencies: `npm install`.
2. Provide environment variables (see `.env.example`).
3. Start the service: `npm run dev`.

Database migrations can be managed via your preferred tool. The repository exposes helper queries in `src/modules/**/repository.js` for schema design guidance.
