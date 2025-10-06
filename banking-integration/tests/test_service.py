import asyncio
from typing import Any

import pytest

from banking_integration.connectors.base import BankingConnector
from banking_integration.service import BankingIntegrationService


class DummyConnector(BankingConnector):
    def __init__(self) -> None:
        super().__init__(network="DUMMY")

    async def initiate_payment(self, payload: dict) -> dict:
        return {"status": "ok", "payload": payload}

    async def poll_status(self, reference: str) -> dict:
        return {"reference": reference, "status": "settled"}

    async def fetch_transactions(self, *, cursor: str | None = None) -> dict:
        return {"transactions": [{"id": "1", "cursor": cursor}]}


@pytest.mark.asyncio
async def test_service_dispatch() -> None:
    service = BankingIntegrationService([DummyConnector()])
    result = await service.initiate_payment("DUMMY", {"amount": 10})
    assert result["status"] == "ok"
    statements = await service.fetch_statements("DUMMY")
    assert statements[0]["id"] == "1"
