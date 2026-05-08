#!/usr/bin/env bash
set -euo pipefail

cd /var/www/la_quattordici_update

git pull origin main
npm install
npm run build
sudo systemctl restart laquattordici-next
sudo systemctl status laquattordici-next --no-pager -l

