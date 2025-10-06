"""Reconciliation jobs for fiat payment flows."""
from __future__ import annotations

from typing import Awaitable, Callable

from tenacity import RetryError, retry, stop_after_attempt, wait_exponential

from ..service import BankingIntegrationService


class ReconciliationJob:
    """Fetches transactions and compares them with on-chain records."""

    def __init__(self, service: BankingIntegrationService, handler: Callable[[dict], Awaitable[None]]) -> None:
        self._service = service
        self._handler = handler

    @retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=1, max=16))
    async def run_once(self, network: str) -> None:
        try:
            statements = await self._service.fetch_statements(network)
        except RetryError:
            raise
        for entry in statements:
            await self._handler(entry)
