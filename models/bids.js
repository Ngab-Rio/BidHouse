const db = require("../utils/db")

class BidsModel{
    static async createBid({ itemID, userID, username, amount }){
        const q = `
            INSERT INTO bids (item_id, user_id, username, amount)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `
        const res = await db.query(q, [itemID, userID, username, amount])
        return res.rows[0]
    }

    static async getBidByItem(itemID){
        const q = `
            SELECT * FROM bids WHERE item_id=$1 ORDER BY amount DESC
        `
        const res = await db.query(q, [itemID])
        return res.rows
    }

    static async getHighestBid(itemID){
        const q = `
            SELECT * FROM bids
            WHERE item_id = $1
            ORDER BY amount DESC
            LIMIT 1
        `
        const res = await db.query(q, [itemID])
        if (res.rows.length === 0) return null
        return {
            ...res.rows[0],
            amount: Number(res.rows[0].amount)
        }
    }

    static async winnerBidByItem(req, res){
        
    }
}

module.exports = { BidsModel }
