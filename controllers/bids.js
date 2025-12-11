const { ItemsModel } = require("../models/items")
const { BidsModel } = require("../models/bids")

class BidsController{
    static async createBid(req, res){
        try {
            const itemID = Number(req.params.itemID)
            const amount = Number(req.body.amount)
            const userID = req.user.userID
            const username = req.user.username

            if (isNaN(itemID) || isNaN(amount)) {
                return res.status(400).json({
                    message: "itemID dan amount harus berupa angka"
                })
            }

            const item = await ItemsModel.getItemByID(itemID)
            if (!item){
                return res.status(404).json({
                    message: "Item tidak ditemukan"
                })
            }

            if (item.status !== "active"){
                return res.status(400).json({
                    message: "Status item tidak aktif"
                })
            }

            const now = new Date()
            const startAt = item.start_at ? new Date(item.start_at) : null
            const endAt = item.end_at ? new Date(item.end_at) : null

            if (!startAt || !endAt) {
                return res.status(400).json({
                    message: "Waktu lelang tidak valid"
                })
            }

            if (now < startAt || now > endAt) {
                return res.status(400).json({
                    message: "Lelang belum dimulai atau sudah selesai"
                });
            }

            const highest = await BidsModel.getHighestBid(itemID)
            const minimumAmount = highest 
                ? highest.amount + item.min_increment
                : item.start_price
            
            if (amount < minimumAmount){
                return res.status(400).json({
                    message: `Bid minimal ${minimumAmount}`
                })
            }

            const bid = await BidsModel.createBid({
                itemID,
                userID,
                username,
                amount
            })

            return res.status(200).json({
                message: "Bid berhasil",
                data: bid
            })

        } catch (error) {
            console.error("Create Bid:", error)
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async getBidByItem(req, res){
        try {
            const { itemID } = req.params
            const bids = await BidsModel.getBidByItem(itemID)

            return res.status(200).json({
                message: "Riwayat Penawaran",
                data: bids
            })
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    static async getHighestBid(req, res){
        try {
            const { itemID } = req.params
            const highest = await BidsModel.getHighestBid(itemID)
            return res.status(200).json({
                message: `Highest Bid dari itemID ${itemID}`,
                data: highest
            })
        } catch (error) {
            
        }
    }
}

module.exports = { BidsController }