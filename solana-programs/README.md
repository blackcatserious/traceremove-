# Solana Programs Workspace

This workspace contains Anchor-based smart contracts that manage custody and settlement for the platform.

- `wallet_management`: Owns wallet accounts that track balances for each off-chain identity.
- `payment_settlement`: Performs token transfers and records settlement ledger metadata.

## Development
- Install Anchor toolchain: `cargo install --git https://github.com/coral-xyz/anchor anchor-cli`.
- Build programs: `anchor build`.
- Run unit tests: `cargo test` within this workspace or `anchor test` for end-to-end flows.

Deployment targets can be configured via `Anchor.toml`. Scripts may leverage `anchor deploy --program-name wallet_management` etc.
