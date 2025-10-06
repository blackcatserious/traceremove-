#!/usr/bin/env bash
set -euo pipefail

anchor build
anchor deploy --program-name wallet_management
anchor deploy --program-name payment_settlement
