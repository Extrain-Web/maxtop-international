# VPS e Deploy (Ubuntu 22.04 / 24.04)

Dhore nicchi domain `maxtopinternational.com`, project thakbe `/var/www/maxtop`. Nijer domain/path boshiye nin.

## 1. Server e dorkari software

```bash
sudo apt update && sudo apt upgrade -y
# Node.js 24 LTS
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

**MongoDB** — duita option:
- **Easy:** [MongoDB Atlas](https://www.mongodb.com/atlas) e free cluster khulun, connection string (`mongodb+srv://...`) copy korun. Atlas e Network Access e VPS er IP allow korun.
- **VPS e nijei:** official guide follow kore `mongodb-org` install korun (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/), tarpor `sudo systemctl enable --now mongod`. URI hobe `mongodb://127.0.0.1:27017/maxtop`.

## 2. Code ana

```bash
sudo mkdir -p /var/www && cd /var/www
sudo git clone https://github.com/Extrain-Web/maxtop-international.git maxtop
sudo chown -R $USER:$USER maxtop && cd maxtop
```

## 3. Backend (Express API)

```bash
cd /var/www/maxtop/backend
npm ci --omit=dev
cp .env.example .env
nano .env
```

`.env` e ja dite hobe:

```ini
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...            # ba mongodb://127.0.0.1:27017/maxtop
JWT_SECRET=<lomba random string>
ALLOWED_ORIGINS=https://maxtopinternational.com,https://www.maxtopinternational.com
FRONTEND_URL=http://127.0.0.1:3000
REVALIDATE_SECRET=<arekta random string>
ADMIN_EMAIL=apnar@email.com
ADMIN_PASSWORD=<shokto password>
ADMIN_NAME=Your Name
```

Random string banate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

```bash
pm2 start src/server.js --name maxtop-api --node-args="--env-file=.env"
pm2 logs maxtop-api --lines 20     # "MongoDB connected", "seeded", "First admin created" dekhben
```

Notun product line (24 ta product + chobi) database e tulun:

```bash
npm run import-products
```

✅ Prothom start er por `.env` theke `ADMIN_PASSWORD` line ta muche din.

## 4. Website (Next.js)

```bash
cd /var/www/maxtop
npm ci
cat > .env.production <<'EOF'
API_URL=http://127.0.0.1:5000
REVALIDATE_SECRET=<backend er same value>
EOF
npm run build
pm2 start npm --name maxtop-web -- start
pm2 save && pm2 startup            # reboot er porei auto chalu hobe (je command dey sheta run korun)
```

## 5. Nginx + SSL

`/etc/nginx/sites-available/maxtop`:

```nginx
server {
    server_name maxtopinternational.com www.maxtopinternational.com;
    client_max_body_size 20M;

    # uploaded images — Nginx direct serve kore (fast)
    location /uploads/ {
        alias /var/www/maxtop/backend/uploads/;
        expires 30d;
        add_header X-Content-Type-Options nosniff;
    }

    # API
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # website
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # /revalidate shudhu server er bhetor theke (backend) call hobe
    location = /revalidate { deny all; }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/maxtop /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d maxtopinternational.com -d www.maxtopinternational.com
```

Domain er DNS e `A` record VPS er IP te point korte hobe.

## 6. Update deploy (notun code ashle)

```bash
cd /var/www/maxtop && git pull
cd backend && npm ci --omit=dev && pm2 restart maxtop-api
cd .. && npm ci && npm run build && pm2 restart maxtop-web
```

## 7. Backup (khub joruri)

Duita jinish backup rakhben:
1. **Database:** `mongodump --uri="$MONGODB_URI" --out=/var/backups/maxtop-$(date +%F)`
2. **Uploaded chobi:** `/var/www/maxtop/backend/uploads/`

Cron diye protidin:
```bash
crontab -e
# protidin rat 3 ta
0 3 * * * mongodump --uri="mongodb://127.0.0.1:27017/maxtop" --out=/var/backups/maxtop-$(date +\%F) && tar czf /var/backups/uploads-$(date +\%F).tgz -C /var/www/maxtop/backend uploads
```

## Somossa hole

| Lokkhon | Somadhan |
|---|---|
| Admin e "Server er sathe connect kora jacche na" | `pm2 logs maxtop-api` — Mongo URI thik ase? |
| Admin e save hoy kintu website e change ase na | `REVALIDATE_SECRET` duijaygay same? `FRONTEND_URL` thik? (5 minute por emnitei update hobe) |
| Login e "Origin not allowed" | backend `.env` er `ALLOWED_ORIGINS` e apnar domain (https://...) din, `pm2 restart maxtop-api` |
| Password bhule gechen | `cd backend && npm run create-admin -- email@x.com "NewPass123"` |
