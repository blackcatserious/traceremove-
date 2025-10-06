# Compliance and Security Services

This package coordinates KYC/AML providers, transaction monitoring, and tamper-evident audit logging. It is designed to run alongside the backend service, providing asynchronous calls into third-party services while protecting secrets via HSM/KMS integrations.

Key modules:
- `providers`: wrappers for KYC/AML APIs.
- `monitoring`: in-house transaction monitoring rules.
- `logging`: helpers for signed audit trails compatible with HSM or cloud KMS key material.
- `service.py`: orchestrates onboarding and transaction screening operations.

Use `pip install -e .` to develop locally and extend the connectors for your providers.
