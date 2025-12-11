# BidHouse

**BidHouse** adalah backend API untuk platform lelang/penawaran (bidding) menggunakan Node.js + Express, siap dijalankan dengan Docker.

## Fitur Utama
- API RESTful modular
- Middleware untuk autentikasi & validasi
- Dokumentasi Postman untuk semua endpoint
- Dukungan Docker & Docker Compose

## Teknologi
- Node.js, Express.js
- Docker
- Database PostgreSQL (konfigurasi di .env)

## Instalasi (Tanpa Docker)
```bash
git clone https://github.com/Ngab-Rio/BidHouse.git
cd BidHouse
npm install
cp .env.example .env
npm start
```

## Jalankan dengan Docker
```bash
docker compose up --build db-bid-house bid-house
```

## Konfigurasi .env
Sesuaikan file `.env` dengan data yang kalian inginkan:
```bash
HOST=
PORT=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=

ADMIN_USERNAME=
ADMIN_PASSWORD=

JWT_SECRET=
```

## Testing & Dokumentasi API
Impor file Postman Collection dari folder `postman/` untuk menguji semua endpoint.

## Struktur Endpoint (Contoh)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET    | `/api/...` | Ambil data |
| POST   | `/api/...` | Buat data |
| PUT    | `/api/...` | Update data |
| DELETE | `/api/...` | Hapus data |

## Kontribusi
Buka Issue atau Pull Request untuk kontribusi.

## Lisensi
Tergantung file LICENSE di repositori.

## Support
Buka Issue atau hubungi pemilik repo di GitHub.

---

