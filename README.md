## Trino Access Control with OPA

This repository guides you through the process of setting up Trino with OPA for access control.

### Considerations

- This guide assumes that you have a basic understanding of Trino and OPA (Open Policy Agent).
- Trino Version: `440`, OPAL Version: `0.7.5`, Postgres Version: `16`

### Architecture (Docker)

![Docker Architecture](assets/image.png)

### Running Trino Cluster with OPA Locally

#### Setting up Github SSH Key (Optional)

If you are using a private repository for the policy files in OPAL Server, you need to add the SSH Public key to the GitHub repository as a deploy key. Read [OPAL Documentation](https://docs.opal.ac/getting-started/running-opal/run-opal-server/policy-repo-location)

- Generate a new SSH key pair using the following command:

  ```bash
  ssh-keygen -t ed25519 -C "nilanjan172nsvian@gmail.com"
  ```

- Add the SSH key to the GitHub Repository as a deploy key.

  ```bash
  cat ~/.ssh/id_ed25519.pub
  ```

  ![CLI Demo](assets/image-2.png)

  ![Github Demo](assets/image-3.png)

#### Setting up Environment Variables for OPAL Server

- _`OPAL_POLICY_REPO_SSH_KEY`_:

  ```bash
  cat ~/.ssh/id_ed25519
  ```

  ![CLI Demo](assets/image-1.png)

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
  opal-server generate-secret
  ```

#### Running Docker Compose

Create a `.env` file with the variables from `.env.sample` and run the following command:

```bash
docker compose up -d
```

![Docker Compose](assets/image-4.png)

#### Create User, Groups & Policies

Please use this [Postman Collection](https://documenter.getpostman.com/view/11092187/2sA2xnwpFA) to create users, groups, and policies.

#### Running queries in Trino through Trino CLI

For this demo, I have created a user `nilanjan172nsvian@gmail.com` and associated it with the group `sales` and with the following access policy:

- **_Policy 1_**:
  - Catalog: `tpch`
  - Schema: `sf1`
  - Table: `customer`
  - columns: `custkey`, `nationkey`
  - cluster: `trino-1`

```bash
trino --server localhost:8081 --user nilanjan172nsvian@gmail.com
```

![Trino CLI-1](assets/image-5.png)
![Trino CLI-2](assets/image-6.png)

```bash
trino --server localhost:8082 --user nilanjan172nsvian@gmail.com
```

![Trino CLI-3](assets/image-7.png)

#### Changing Policies on Runtime

Now, I have created another group `marketing` and associated it with the following access policy:

- **_Policy 2_**:
  - Catalog: `tpcds`
  - Schema: `tiny`
  - Table: `promotion`
  - columns: `p_promo_name`, `p_channel_tv`, `p_channel_email`
  - cluster: `trino-2`

```bash
trino --server localhost:8082 --user nilanjan172nsvian@gmail.com
```

![Trino CLI-4](assets/image-8.png)
![Trino CLI-5](assets/image-9.png)

---

### References

- [Trino OPA Docs](https://trino.io/docs/current/security/opa-access-control.html)
- [Open Policy Agent](https://www.openpolicyagent.org/docs/latest/philosophy/)
- [OPAL Server Configuration](https://docs.opal.ac/getting-started/running-opal/run-opal-server/get-server-image)
- [OPAL Client Configuration](https://docs.opal.ac/getting-started/running-opal/run-opal-client/get-client-image)
- [Trino OPA Example by Dragon Pomelo](https://github.com/DragonPomelo/trino-opa-example)
- [Sequelize Node.js ORM](https://sequelize.org/)

---

Made with ❤️ by [nil1729](https://www.github.com/nil1729)
