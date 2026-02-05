## Setup

### GitHub Actions Setup (First Time Only)
1. Go to your repo → Settings → Actions → General
2. Under "Workflow permissions", select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**
4. Save

OR if using organization-wide restrictions:
1. Create a Personal Access Token (classic) with `write:packages` and `read:packages` scopes
2. Add it as a repository secret named `GHCR_TOKEN`
3. Update the workflow to use `secrets.GHCR_TOKEN` instead of `secrets.GITHUB_TOKEN`

### Package Access (First Time Only)
After first successful push:
1. Go to the package page: https://github.com/orgs/kebapps-dev/packages/container/keb-nodemailer
2. Settings → Manage Actions access → Add Repository
3. Select your repo and grant **Write** access

## Usage

### Environment Variables
- `SMTP_HOST` - Your company SMTP server (default: kebamerica-com.mail.protection.outlook.com)
- `MAIL_FROM` - Email address to send from (required)
- `PORT` - Application port (default: 4000)

### Pull and Run

```bash
docker pull ghcr.io/kebapps-dev/keb-nodemailer:latest

ex.
sudo docker run -d -p 4000:4000 \
  -e MAIL_FROM="your-email@kebamerica.com" \
  -e SMTP_HOST="kebamerica-com.mail.protection.outlook.com" \
  --name nodemailer \
  ghcr.io/kebapps-dev/keb-nodemailer:latest
```

### API Endpoint

**POST** `/api/send-email`

```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "Email body content",
  "attachments": []
}
```
