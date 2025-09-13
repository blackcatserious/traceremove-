# Benchmark Card — Template

## Why

The Benchmark Card Template provides a minimal, decision‑ready summary of an evaluation so that others can reproduce your results and trust your findings. It collects critical context about your task, data, conditions and risks in a structured way, making it easy for reviewers and downstream users to understand what was measured, how it was measured, and where the evaluation may fall short.

## Fields and Their Purpose

- **Task and Domain** – Clearly state the problem you’re solving (e.g., “intent classification for support emails”) and the application area. This frames the scope of your evaluation.
- **Data and Provenance** – Describe the dataset(s) you used: their source, version, size, licensing, and any sampling or filtering you applied. Provenance helps others obtain the same data and understand usage restrictions.
- **Conditions and Preprocessing** – Summarise key experimental conditions: prompts, model parameters (e.g. temperature, top‑p), normalization/tokenization choices and other preprocessing steps. Small changes in these settings can greatly affect results.
- **Uncertainty and Calibration** – Report uncertainty metrics such as Expected Calibration Error (ECE), show a reliability diagram, and describe any calibration methods used. This section highlights how well your model’s confidence scores reflect true probabilities and alerts users to potential over‑confidence or under‑confidence.
- **Risks and Sensitive Cases** – Document known failure modes and potential harms (e.g., misrouting refund requests, bias toward short messages). This encourages responsible deployment and further analysis on edge cases.
- **Limits and Non‑intended Uses** – State where your metric or model should not be used and note any assumptions that could break. Clarifying limits prevents misuse in inappropriate domains.
- **Contact and Change‑log** – Provide a contact for questions and list version numbers or dates whenever you update the card. A clear changelog improves transparency and makes updates traceable.

## Quick Start

1. Copy the skeleton file `card.md` (Markdown) or `card.json` into your repository.
2. Fill each field with task‑specific details and metrics.
3. Include the `reliability_diagram.png` image and the computed ECE value in your card.
4. Commit the completed card alongside your code and data so others can reproduce the evaluation easily.

## Skeleton Files

### card.md

```
---
task: "Intent classification, support emails"
domain: "Customer support (EN)"
data_provenance: "Internal dataset v1.3; 12k emails; CC BY-compatible; sampled 2024-Q4"
conditions_preprocessing: "Lowercase; emoji strip; max_len=512; prompt=v7; seed=42"
uncertainty_calibration: "ECE=0.08 (val); reliability diagram attached; temp scaling at deploy"
risks_sensitive: "Misrouting refund complaints; bias toward short messages"
limits_nonintended: "Not for legal triage or safety-critical routing"
contact_changelog: "artur@traceremove.com; v0.1; 2025-09-10"
---
```

### card.json

```
{
  "task": "Intent classification, support emails",
  "domain": "Customer support (EN)",
  "data_provenance": "Internal dataset v1.3; 12k emails; CC BY-compatible; sampled 2024-Q4",
  "conditions_preprocessing": "Lowercase; emoji strip; max_len=512; prompt=v7; seed=42",
  "uncertainty_calibration": "ECE=0.08 (val); reliability diagram attached; temp scaling at deploy",
  "risks_sensitive": "Misrouting refund complaints; bias toward short messages",
  "limits_nonintended": "Not for legal triage or safety-critical routing",
  "contact_changelog": "artur@traceremove.com; v0.1; 2025-09-10"
}
```

## Example: examples/calibration_demo.py

This example script demonstrates how to compute calibration metrics:

1. Load `y_true` and `y_prob` – read true labels and predicted probabilities from your validation set.
2. Bin predictions – divide the probability range into equal‑width bins.
3. Compute Expected Calibration Error (ECE) – for each bin, compare the average predicted probability to the empirical accuracy; ECE is a weighted sum of these differences.
4. Plot and save a reliability diagram – visualise predicted probability vs. observed accuracy and save as `reliability_diagram.png`.

By including a Benchmark Card with each evaluation, you standardise your reporting, make it easier for others to reproduce results, and encourage more transparent, trustworthy comparisons across models.