cannot push and publish packages automatically yet

docker pull ghcr.io/kebapps-dev/keb-nodemailer:latest

sudo docker run -d -p 4000:4000 \
  -e MAIL_FROM="your-email@kebamerica.com" \
  --name nodemailer \
  ghcr.io/kebapps-dev/keb-nodemailer:latest
