# Deployment Pipelines

This directory captures containerization and Kubernetes manifests for the platform.

- `backend.Dockerfile`: builds the Node.js backend.
- `docker-compose.yml`: local developer stack with PostgreSQL, Redis, and the backend.
- `k8s/`: manifests for deploying the backend into a Kubernetes cluster. Secrets should be synchronized from an HSM/KMS such as AWS KMS via external secret managers.

CI/CD pipelines should build container images, run tests (backend, banking integrations, compliance, and Solana programs), and push to the registry before applying Kubernetes manifests.
