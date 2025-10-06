"""Simplified SWIFT connector."""
from __future__ import annotations

import httpx
from pydantic import BaseModel

from .base import BankingConnector


class SwiftPayment(BaseModel):
    beneficiary: str
    iban: str
    amount: float
    currency: str


class SwiftConnector(BankingConnector):
    """Adapter that calls a SWIFT-like API."""

    def __init__(self, base_url: str, api_key: str) -> None:
        super().__init__(network="SWIFT")
        self._client = httpx.AsyncClient(base_url=base_url, headers={"Authorization": f"Bearer {api_key}"})

    async def initiate_payment(self, payload: dict) -> dict:
        payment = SwiftPayment(**payload)
        response = await self._client.post("/payments", json=payment.model_dump())
        response.raise_for_status()
        return response.json()

    async def poll_status(self, reference: str) -> dict:
        response = await self._client.get(f"/payments/{reference}")
        response.raise_for_status()
        return response.json()

    async def fetch_transactions(self, *, cursor: str | None = None) -> dict:
        params = {"cursor": cursor} if cursor else None
        response = await self._client.get("/transactions", params=params)
        response.raise_for_status()
        return response.json()
