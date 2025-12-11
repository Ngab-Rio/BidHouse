# BidHouse API

**BidHouse** adalah backend API untuk platform lelang/penawaran (bidding) menggunakan Node.js + Express dan PostgreSQL, siap dijalankan dengan Docker.

## Fitur Utama

* API RESTful modular
* Middleware untuk autentikasi & role-based access
* Auto-close lelang & penentuan pemenang
* Dokumentasi Postman untuk semua endpoint
* Dukungan Docker & Docker Compose

## Teknologi

* Node.js, Express.js
* PostgreSQL
* Docker & Docker Compose

---

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

---

## Konfigurasi `.env`

Sesuaikan file `.env`:

```env
HOST=localhost
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=db_bid_house

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

JWT_SECRET=yourjwtsecret
```

---

## Autentikasi

* Menggunakan **JWT Token**
* Header Authorization:

```
Authorization: Bearer <token>
```

* **Roles**:

  * `admin` → CRUD item, menutup/aktifkan lelang
  * `user` → lihat item, bid

---

## Endpoint API

### **Auth**

| Method | Endpoint             | Deskripsi                   | Body / Params                |
| ------ | -------------------- | --------------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Registrasi user baru        | `{ "username", "password" }` |
| POST   | `/api/auth/login`    | Login user, dapat token JWT | `{ "username", "password" }` |

**Response Login**

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### **Users** *(protected, admin)*

| Method | Endpoint             | Deskripsi        |
| ------ | -------------------- | ---------------- |
| GET    | `/api/users/`        | Ambil semua user |
| GET    | `/api/users/:userID` | Ambil user by ID |
| POST   | `/api/users/`        | Buat user baru   |
| PUT    | `/api/users/:userID` | Update user      |
| DELETE | `/api/users/:userID` | Hapus user       |

---

### **Items**

| Method | Endpoint                      | Deskripsi                                  |
| ------ | ----------------------------- | ------------------------------------------ |
| POST   | `/api/items/`                 | Buat item baru *(admin)*                   |
| GET    | `/api/items/`                 | Ambil semua item                           |
| GET    | `/api/items/active/all`       | Ambil semua item aktif                     |
| GET    | `/api/items/:itemID`          | Ambil detail item                          |
| PUT    | `/api/items/:itemID`          | Update item *(admin)*                      |
| DELETE | `/api/items/:itemID`          | Hapus item *(admin)*                       |
| PUT    | `/api/items/:itemID/close`    | Tutup item dan tentukan pemenang *(admin)* |
| PUT    | `/api/items/:itemID/activate` | Aktifkan kembali item *(admin)*            |

**Contoh Response Buat Item**

```json
{
  "message": "Buat item baru berhasil",
  "data": {
    "id": 12,
    "title_item": "Laptop Gaming",
    "description": "Laptop spek tinggi",
    "start_price": 5000000,
    "min_increment": 10000,
    "start_at": "2025-12-12T08:00:00.000Z",
    "end_at": "2025-12-12T20:00:00.000Z",
    "status": "active",
    "created_by": 1,
    "winner_id": null,
    "winner_name": null,
    "final_price": null,
    "created_at": "2025-12-12T02:00:00.000Z"
  }
}
```

---

### **Bids**

| Method | Endpoint                    | Deskripsi                     | Body / Params          |
| ------ | --------------------------- | ----------------------------- | ---------------------- |
| POST   | `/api/bids/:itemID`         | Beri bid pada item            | `{ "amount": 100000 }` |
| GET    | `/api/bids/:itemID`         | Ambil semua bid dari item     |                        |
| GET    | `/api/bids/highest/:itemID` | Ambil bid tertinggi dari item |                        |

---

### **Winners**

| Method | Endpoint              | Deskripsi                    |
| ------ | --------------------- | ---------------------------- |
| GET    | `/api/winner/:itemID` | Ambil pemenang item tertentu |
| GET    | `/api/winner/`        | Ambil semua pemenang         |

**Contoh Response Pemenang**

```json
{
  "message": "Pemenang dari itemID 12",
  "winner": {
    "userID": 5,
    "username": "rio",
    "finalPrice": 5500000
  }
}
```

---


## Testing & Dokumentasi API

* Import **Postman Collection** dari folder `postman/`
* Semua endpoint sudah disertai request body & contoh response

---

## Struktur Folder

```
/models      -> database queries
/controllers -> logika business
/routes      -> endpoint API
/middleware  -> auth & role
/utils       -> db, helper
/cron        -> auto-close expired items
```

---

## Kontribusi

* Buka Issue atau Pull Request untuk kontribusi

## Lisensi

* Sesuai LICENSE di repositori
