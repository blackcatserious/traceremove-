from compliance.monitoring.engine import MonitoringEngine, MonitoringRule


def test_monitoring_engine_flags_high_value():
    engine = MonitoringEngine([MonitoringRule("high", lambda tx: tx["amount"] > 100)])
    flags = engine.evaluate({"amount": 150})
    assert flags == ["high"]
