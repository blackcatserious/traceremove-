"""Compliance orchestration service."""
from __future__ import annotations

import structlog

from .logging.audit import create_audit_event, log_audit_event, sign_event
from .monitoring.engine import MonitoringEngine, MonitoringRule
from .providers.aml import AMLProvider
from .providers.kyc import Applicant, KYCProvider


class ComplianceService:
    """Coordinates KYC, AML, and audit logging workflows."""

    def __init__(
        self,
        *,
        kyc_provider: KYCProvider,
        aml_provider: AMLProvider,
        monitoring_engine: MonitoringEngine | None = None,
        logger: structlog.stdlib.BoundLogger | None = None,
        signing_key_pem: bytes | None = None,
    ) -> None:
        self._kyc_provider = kyc_provider
        self._aml_provider = aml_provider
        self._monitoring_engine = monitoring_engine or MonitoringEngine(
            [MonitoringRule("high_value", lambda tx: tx.get("amount", 0) > 10_000.0)]
        )
        self._logger = logger or structlog.get_logger()
        self._signing_key_pem = signing_key_pem

    async def onboard_applicant(self, applicant: Applicant) -> dict:
        result = await self._kyc_provider.submit_applicant(applicant)
        event = create_audit_event("kyc_submitted", {"applicant": applicant.model_dump(), "result": result})
        if self._signing_key_pem:
            event["signature"] = sign_event(event, self._signing_key_pem)
        log_audit_event(self._logger, event)
        return result

    async def screen_transaction(self, transaction: dict) -> dict:
        aml_result = await self._aml_provider.screen_transaction(transaction)
        flags = self._monitoring_engine.evaluate(transaction)
        event = create_audit_event("transaction_screened", {"transaction": transaction, "flags": flags})
        if self._signing_key_pem:
            event["signature"] = sign_event(event, self._signing_key_pem)
        log_audit_event(self._logger, event)
        aml_result["flags"] = flags
        return aml_result
