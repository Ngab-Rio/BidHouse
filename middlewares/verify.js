const jwt = require("jsonwebtoken")

class Verify{
    static verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.status(403).json({message: "anda harus login"})
            req.user = decoded
            next()
        })
    }

    static verifyLevel = (req, res, next) => {
        const user = req.user
        if(user.role === "admin"){
            return next()
        }else{
            return res.status(403).json({message: "hanya bisa diakses admin"})
        }
    }
}

module.exports = Verify