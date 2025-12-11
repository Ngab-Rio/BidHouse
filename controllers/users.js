const { UsersModel } = require("../models/users")
const { validateRequired, isMinLength } = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class UsersController{
    static async findAll(req, res){
        try {
            const users = await UsersModel.findAll()
            return res.status(200).json({
                message: "Get All Users",
                data: users
            })
        } catch (error) {
            console.error("Get User:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async findbyID(req, res){
        try {
            const { userID } = req.params
            const user = await UsersModel.findByID(userID)
            if (!user){
                return res.status(404).json({
                    message: `Users dengan id ${userID} tidak ditemukan`
                })
            }
            return res.status(200).json({
                message: "Get User By ID",
                data: user
            })
        } catch (error) {
            console.error("Get User:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async createUser(req, res){
        try {
            const { username, password, role } = req.body
            const missingField = validateRequired(req.body, ["username", "password", "role"])

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
            await UsersModel.createUser(username, hashPassword, role)

            return res.status(200).json({
                message: "User berhasil dibuat"
            })
        } catch (error) {
            console.error("Create User:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async updateUser(req, res){
        try {
            const { userID } = req.params
            const { username, password, role } = req.body

            const missingField = validateRequired(req.body, ["username", "password", "role"])
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

            const user = await UsersModel.findByID(userID)
            if (!user){
                return res.status(404).json({
                    message: `User dengan id ${userID} tidak ditemukan`
                })
            }

            let hashPassword

            if (!password) {
                hashPassword = user.password_hash;
            } else {
                const salt = await bcrypt.genSalt();
                hashPassword = await bcrypt.hash(password, salt);
            }

            await UsersModel.updateUser({username, passwordHash: hashPassword, role, userID})

            return res.status(200).json({
                message: "Update User Berhasil"
            })
        } catch (error) {
            console.error("Update User:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async deleteUser(req, res){
        try {
            const { userID } = req.params
            const user = await UsersModel.findByID(userID)
            if (!user){
                return res.status(404).json({
                    message: `User dengan id ${userID} tidak ditemukan`
                })
            }
            await UsersModel.deleteUser(userID)
            return res.status(200).json({
                message: "Delete User Berhasil"
            })
        } catch (error) {
            console.error("Delete User:", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}

module.exports = { UsersController }