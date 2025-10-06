"""Rule-based monitoring engine."""
from __future__ import annotations

from typing import Iterable


class MonitoringRule:
    """Represents a compliance rule that can be evaluated on each transaction."""

    def __init__(self, name: str, predicate):
        self.name = name
        self.predicate = predicate

    def check(self, transaction: dict) -> bool:
        return self.predicate(transaction)


class MonitoringEngine:
    """Evaluates transactions against a set of rules."""

    def __init__(self, rules: Iterable[MonitoringRule]):
        self._rules = list(rules)

    def evaluate(self, transaction: dict) -> list[str]:
        return [rule.name for rule in self._rules if rule.check(transaction)]
