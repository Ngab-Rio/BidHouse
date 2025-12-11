const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AuthMiddleware = require('./middlewares/verify')

dotenv.config()
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:4000",
  "https://bidhouse.ngabrio.my.id"
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
app.use("/api/users", AuthMiddleware.verifyToken, AuthMiddleware.verifyLevel, require("./routes/users"))
app.use("/api/items", AuthMiddleware.verifyToken, require("./routes/items"))
app.use("/api/bids", require("./routes/bids"))
app.use("/api/winner", require("./routes/winner"))

if (process.env.NODE_ENV !== "test") {
    const host = process.env.HOST || "localhost"
    const port = process.env.PORT || 4000
    app.listen(port, () => {
        console.log(`[+] Server Berjalan di http://${host}:${port}`)
    })
}

module.exports = app