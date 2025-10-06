"""AML transaction monitoring provider."""
from __future__ import annotations

import httpx


class AMLProvider:
    """Simple wrapper around AML screening APIs."""

    def __init__(self, base_url: str, token: str) -> None:
        self._client = httpx.AsyncClient(base_url=base_url, headers={"Authorization": f"Bearer {token}"})

    async def screen_transaction(self, payload: dict) -> dict:
        response = await self._client.post("/aml/transactions", json=payload)
        response.raise_for_status()
        return response.json()
