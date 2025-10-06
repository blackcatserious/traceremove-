"""Audit logging helpers that assume HSM/KMS key management."""
from __future__ import annotations

import base64
import json
from datetime import datetime, timezone

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_private_key
import structlog


def _load_signing_key(pem_bytes: bytes, password: bytes | None = None):
    return load_pem_private_key(pem_bytes, password=password)


def sign_event(event: dict, pem_bytes: bytes, password: bytes | None = None) -> str:
    key = _load_signing_key(pem_bytes, password)
    payload = json.dumps(event, sort_keys=True).encode()
    signature = key.sign(
        payload,
        padding.PKCS1v15(),
        hashes.SHA256(),
    )
    return base64.b64encode(signature).decode()


def create_audit_event(event_type: str, data: dict) -> dict:
    return {
        "type": event_type,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "data": data,
    }


def log_audit_event(logger: structlog.stdlib.BoundLogger, event: dict) -> None:
    logger.info("audit_event", **event)
