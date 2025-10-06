"""Abstract base connector for fiat rails."""
from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any, Dict


class BankingConnector(ABC):
    """Defines the behaviour common to all banking network connectors."""

    network: str

    def __init__(self, network: str) -> None:
        self.network = network

    @abstractmethod
    async def initiate_payment(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Kick off a payment instruction on the external network."""

    @abstractmethod
    async def poll_status(self, reference: str) -> Dict[str, Any]:
        """Check the status of an external payment."""

    @abstractmethod
    async def fetch_transactions(self, *, cursor: str | None = None) -> Dict[str, Any]:
        """Download transaction statements for reconciliation."""
