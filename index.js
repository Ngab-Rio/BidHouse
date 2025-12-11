const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const cookieParser = require('cookie-parser')
dotenv.config()
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:4000",
]

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Izinkan metode HTTP yang dibutuhkan
    allowedHeaders: ["Content-Type", "Authorization"], // Headers yang diizinkan
    credentials: true, // Jika kamu butuh mengirim cookie lintas origin
  })
)

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 4000

const createAdmin = require('./utils/generate_admin')
createAdmin().catch(console.error)


app.get("/", (req, res) => {
    res.status(200).json({
        message: "API Ready"
    })
})

app.use("/api/auth", require("./routes/auth"))

app.listen(port, () => {
    console.log(`[+] Server Berjalan di http://${host}:${port}`)
})