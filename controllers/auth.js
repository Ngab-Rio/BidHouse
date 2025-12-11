const UsersModel = require("../models/users")
const { validateRequired, isMinLength } = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class AuthController {
    static async registerUser(req, res){
        try {
            const { username, password } = req.body
            const missingField = validateRequired(req.body, ["username", "password"])

            if (missingField.length > 0){
                return res.status(400).json({
                    message: "Field Wajib diisi",
                    missing: missingFields
                })
            }

            if(!isMinLength(password, 8)){
                return res.status(400).json({
                    message: "Password harus lebih dari 8 karakter"
                })
            }

            const existUser = await UsersModel.findByName(username)
            if(existUser.length > 0){
                return res.status(400).json({
                    message: "Username sudah ada"
                })
            }

            const salt = await bcrypt.genSalt()
            const hashPassword = await bcrypt.hash(password, salt)
            const user = (await UsersModel.createUser(username, hashPassword, 'user'))[0]
            
            const token = jwt.sign({
                    userID: user.id,
                    username,
                    role: user.role
                },       
                process.env.JWT_SECRET,
                { expiresIn: '1h' }    
            )
            return res.status(200).json({
                message: "Registrasi Berhasil",
                token
            })
        } catch (error) {
            console.error("Register Error:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async loginUser(req, res){
        try {
            const { username, password } = req.body
            if(!username || !password){
                return res.status(400).json({
                    message: "username dan password wajib diisi"
                })
            }

            const user = (await UsersModel.findByName(username))[0]
            const isMatch = await bcrypt.compare(password, user.password_hash)
            if (!user || !isMatch){
                return res.status(400).json({
                    message: "username atau password salah"
                })
            }

            const token = jwt.sign({
                    userID: user.id,
                    username,
                    role: user.role
                },       
                process.env.JWT_SECRET,
                { expiresIn: '1h' }    
            )

            return res.status(200).json({
                message: "Login berhasil",
                token,
                user: {
                    userID: user.id,
                    username,
                    role: user.role
                }
            })
        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}

module.exports = { AuthController }
