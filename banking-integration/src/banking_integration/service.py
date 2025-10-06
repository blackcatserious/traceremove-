"""High-level orchestration for fiat connectors."""
from __future__ import annotations

from typing import Dict, Iterable

from .connectors.base import BankingConnector


class BankingIntegrationService:
    """Routes requests to concrete connectors and handles reconciliation."""

    def __init__(self, connectors: Iterable[BankingConnector]):
        self._connectors: Dict[str, BankingConnector] = {connector.network: connector for connector in connectors}

    def get_connector(self, network: str) -> BankingConnector:
        try:
            return self._connectors[network]
        except KeyError as exc:  # pragma: no cover - defensive programming
            raise ValueError(f"Unknown banking network: {network}") from exc

    async def initiate_payment(self, network: str, payload: dict) -> dict:
        connector = self.get_connector(network)
        return await connector.initiate_payment(payload)

    async def fetch_statements(self, network: str) -> list[dict]:
        connector = self.get_connector(network)
        response = await connector.fetch_transactions()
        return response.get("transactions", [])
