# How to run

## Local
```sh
npm install
npm run dev
```

## VPS (production)
```sh
cd /var/www/la_quattordici_update
./deploy.sh
```

### One-shot commands (what `deploy.sh` runs)
```sh
cd /var/www/la_quattordici_update
git pull origin main
npm install
npm run build
sudo systemctl restart laquattordici-next
sudo systemctl status laquattordici-next --no-pager -l
```
