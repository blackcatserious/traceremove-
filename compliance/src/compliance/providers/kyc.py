"""KYC provider integration."""
from __future__ import annotations

import httpx
from pydantic import BaseModel


class Applicant(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    document_id: str


class KYCProvider:
    """Wraps a third-party KYC API."""

    def __init__(self, base_url: str, api_key: str) -> None:
        self._client = httpx.AsyncClient(base_url=base_url, headers={"X-API-Key": api_key})

    async def submit_applicant(self, applicant: Applicant) -> dict:
        response = await self._client.post("/kyc/applicants", json=applicant.model_dump())
        response.raise_for_status()
        return response.json()
