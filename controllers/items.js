const { ItemsModel } = require("../models/items")
const { validateRequired } = require("../utils/validate")

class ItemsController{
    static async createItem(req, res){
        try {
            const { title_item, description, start_price, min_increment, start_at, end_at } = req.body
            const created_by = req.user.userID
            
            const missingFields = validateRequired(req.body, ["title_item", "description", "start_price", "min_increment", "start_at", "end_at"])
            if(missingFields.length > 0){
                return res.status(400).json({
                    message: "Field Wajib diisi",
                    missing: missingFields
                })
            }

            await ItemsModel.createItems({ title_item, description, start_price, min_increment, start_at, end_at, created_by })
            return res.status(200).json({
                message: "Buat item baru berhasil",
            })
        } catch (error) {
            console.error("Create Item:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async getAllItems(req, res){
        try {
            const items = await ItemsModel.getAllItems()
            return res.status(200).json({
                message: "Get All Items",
                data: items
            })
        } catch (error) {
            console.error("Get Items:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async getItemByID(req, res){
        try {
            const { itemID } = req.params
            const item = await ItemsModel.getItemByID(itemID)
            if (!item){
                return res.status(404).json({
                    message: `Item dengan id ${itemID} tidak ditemukan`
                })
            }
            return res.status(200).json({
                message: "Get Item By ID",
                data: item
            })
        } catch (error) {
            console.error("Get Item:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async deleteItem(req, res){
        try {
            const { itemID } = req.params
            const item = await ItemsModel.getItemByID(itemID)
            if (!item){
                return res.status(404).json({
                    message: `Item dengan id ${itemID} tidak ditemukan`
                })
            }
            await ItemsModel.deleteItem(itemID)
            return res.status(200).json({
                message: "Delete Item Berhasil"
            })
        } catch (error) {
            console.error("Delete Item:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async updateItem(req, res){
        try {
            const { itemID } = req.params
            const { title_item, description, start_price, min_increment, start_at, status, end_at } = req.body

            const item = await ItemsModel.getItemByID(itemID)
            if (!item){
                return res.status(404).json({
                    message: `Item dengan id ${itemID} tidak ditemukan`
                })
            }
            await ItemsModel.updateItem(itemID, { title_item, description, start_price, min_increment, start_at, status, end_at })
            return res.status(200).json({
                message: "Update item berhasil",
            })
        } catch (error) {
            console.error("Update Item:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async getActivate(req, res){
        try {
            const items = await ItemsModel.getActiveItems()
            return res.status(200).json({
                message: "Get Item by active",
                data: items
            })
        } catch (error) {
            console.error("Get Item:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async closeItem(req, res) {
        try {
            const { itemID } = req.params
            
            const item = await ItemsModel.getItemByID(itemID)
            if (!item){
                return res.status(404).json({
                    message: `Item dengan id ${itemID} tidak ditemukan`
                })
            }
            
            const updated = await ItemsModel.closeItem(itemID)
            const { winner_id, winner_name, final_price, ...itemData } = updated
            return res.status(200).json({
                message: "Item berhasil ditutup",
                data: itemData
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })        
        }
    }

    static async activateItem(req, res) {
        try {
            const { itemID } = req.params
            const item = await ItemsModel.getItemByID(itemID)
            if (!item){
                return res.status(404).json({
                    message: `Item dengan id ${itemID} tidak ditemukan`
                })
            }
            const updated = await ItemsModel.activateItem(itemID)
            return res.status(200).json({
                message: "Item berhasil diaktifkan",
                item: updated
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })        
        }
    }

    static async getWinnerByItemID(req, res){
        try {
            const { itemID } = req.params
            const item = await ItemsModel.getItemByID(itemID)

            if (!item) {
                return res.status(404).json({
                    message: `Item dengan id ${itemID} tidak ditemukan`
                })
            }

            if (!item.winner_id) {
                return res.status(200).json({
                    message: "Belum ada pemenang untuk item ini",
                    winner: null
                })
            }

            return res.status(200).json({
                message: `Pemenang dari itemID ${itemID}`,
                winner: {
                    userID: item.winner_id,
                    username: item.winner_name,
                    finalPrice: item.final_price
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async getWinnersAll(req, res){
        try {
            const winners = await ItemsModel.getWinnersAll()
            return res.status(200).json({
                message: "Winners All",
                data: winners
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}
module.exports = { ItemsController }