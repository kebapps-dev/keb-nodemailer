cannot push and publish packages automatically yet

options:
SMTP_HOST (your company smtp link)
MAIL_FROM (email address to be sent from)
PORT (should be 4000 which is default)

docker pull ghcr.io/kebapps-dev/keb-nodemailer:latest

ex.
sudo docker run -d -p 4000:4000 \
  -e MAIL_FROM="your-email@kebamerica.com" \
  --name nodemailer \
  ghcr.io/kebapps-dev/keb-nodemailer:latest
