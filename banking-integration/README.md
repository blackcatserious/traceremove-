# Banking Integration Module

This Python package encapsulates the connectors required to integrate with fiat banking networks such as SWIFT, SEPA, and ACH. Each connector implements a common interface so payment initiation, status polling, and reconciliation can be orchestrated consistently.

- `banking_integration.connectors`: reusable adapters for each network.
- `banking_integration.service`: orchestrates calls to connectors.
- `banking_integration.jobs`: background job helpers for reconciliation.

Install with `pip install -e .[dev]` and run unit tests via `pytest` (tests can be added under `tests/`).
