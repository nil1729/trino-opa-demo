## Trino Access Control with OPA

This repository guides you through the process of setting up Trino with OPA for access control.

### Considerations

- This guide assumes that you have a basic understanding of Trino and OPA (Open Policy Agent).
- Trino Version: `440`, OPAL Version: `0.7.5`, Postgres Version: `16`

### Architecture (Docker)

![Docker Architecture](image.png)

### Running Trino Cluster with OPA Locally

#### Setting up Github SSH Key (Optional)

If you are using a private repository, you need to add the SSH key to the GitHub repository as a deploy key.

- Generate a new SSH key pair using the following command:

  ```bash
  ssh-keygen -t ed25519 -C "nilanjan172nsvian@gmail.com"
  ```

- Add the SSH key to the GitHub Repository as a deploy key.

  ```bash
  cat ~/.ssh/id_ed25519.pub
  ```

  ![CLI Demo](image-2.png)

  ![Github Demo](image-3.png)

#### Setting up Environment Variables for OPAL Server

- _`OPAL_POLICY_REPO_SSH_KEY`_:

  ```bash
  cat ~/.ssh/id_ed25519
  ```

  ![CLI Demo](image-1.png)

  ```bash
  OPAL_POLICY_REPO_SSH_KEY="-----BEGIN OPENSSH PRIVATE KEY-----_XX_YY_-----END OPENSSH PRIVATE KEY-----"
  ```

  Replace newline characters (`\n`) with underscore (`_`).

- _`OPAL_AUTH_PRIVATE_KEY`_ and _`OPAL_AUTH_PUBLIC_KEY`_:

  Please follow the instructions from the [OPAL Documentation](https://docs.opal.ac/getting-started/running-opal/run-opal-server/security-parameters) to generate the RSA keys.

- _`OPAL_AUTH_MASTER_TOKEN`_:

  ```bash
  python3 -m venv .venv
  ```

  ```bash
  source .venv/bin/activate
  ```

  ```bash
  pip install opal-server
  ```

  ```bash
  opal-server generate-master-token
  ```

#### Running Docker Compose

Create a `.env` file with the variables from `env.sample` and run the following command:

```bash
docker compose up -d
```

![Docker Compose](image-4.png)

---

Made with ❤️ by [nil1729](https://www.github.com/nil1729)
