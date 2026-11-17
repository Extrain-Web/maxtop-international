# Maxtop International — Website + Admin Panel

Duita part:

| Folder | Ki | Port |
|---|---|---|
| `/` (root) | **Next.js 16 website** + `/admin` dashboard | 3000 |
| `backend/` | **Node.js + Express + MongoDB** REST API | 5000 |

Website er sob content (4 bhashar lekha, products, categories, services, FAQ, stats, gallery, logos, chobi, SEO) MongoDB te thake, ar `/admin` theke edit kora jay. Admin e Save korle website sathe sathe update hoy.

```
Browser ──► Next.js (3000) ──/api/*, /uploads/*──► Express API (5000) ──► MongoDB
                 ▲                                        │
                 └──────── POST /revalidate (save er por) ┘
```

## Local e chalano (development)

Lagbe: **Node.js 22.9+** ar **MongoDB**. Ei PC te MongoDB 9.0 Windows Service hisebe install kora ase (Windows on hole nijei chalu hoy, data: `C:\Program Files\MongoDB\Server\9.0\data`).

```bash
# 1) backend
cd backend
npm install
cp .env.example .env        # tarpor .env edit korun: MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev                 # prothombar chalale DB te original content seed hoy + admin toiri hoy

# 2) website (arekta terminal e, project root theke)
npm install
cp .env.example .env.local  # REVALIDATE_SECRET backend/.env er sathe same din
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin  (login: `backend/.env` er `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

> Backend bondho thakleo website chole — tokhon built-in original content dekhay (`src/lib/content/fallback-content.json`).

## Admin panel e ki ki kora jay

- **Dashboard** — notun inquiry, product count, 14 diner inquiry chart
- **Messages** — Contact form, RFQ, product price/sample request; status (new/replied/archived), note, email reply
- **Products / Categories** — add, edit, delete, order change, chobi upload, color, size, featured
- **Services, How We Work, Why Choose Us, FAQ, Stats, Gallery, Logos** — sob card add/edit/delete
- **Page Texts** — website er sob heading/paragraph/button, English · বাংলা · العربية · فارسی
- **Site Images** — hero slider, banner, section er chobi
- **Media Library** — chobi upload (drag & drop)
- **Settings** — SEO title/description/keywords, social share, WhatsApp/LinkedIn/Facebook link, profile, password change

## Useful commands

| Command | Kaj |
|---|---|
| `cd backend && npm run create-admin -- email@x.com "Password123" "Name"` | notun admin / password reset |
| `cd backend && npm run seed -- --force` | ⚠ sob edit muche original content e ferot (tarpor `npm run import-products` chalan) |
| `cd backend && npm run import-products` | notun product line (24 ta, `backend/scripts/data/`) + chobi import, ar/fa onubad thik kore — abar chalaleo duplicate hoy na |
| `cd backend && npm run snapshot` | live content ke website er offline fallback hisebe save kore |
| `npm run export-defaults` | code er `src/data` + `src/i18n` theke `backend/src/content/defaults.json` ar fallback abar banay |

VPS e deploy korar step-by-step guide: **[DEPLOYMENT.md](DEPLOYMENT.md)**
