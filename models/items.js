const db = require("../utils/db")

class ItemsModel {
    static async createItems({
      title_item,
      description,
      start_price,
      min_increment = 10000,
      start_at,
      end_at,
      status='active',
      created_by
    }) {
        const q = `
          INSERT INTO items (title_item, description, start_price, min_increment, start_at, end_at, status, created_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *
        `
        const values = [title_item, description, start_price, min_increment, start_at, end_at, status, created_by]

        const res = await db.query(q, values)
        return res.rows[0]
    } 

    static async getAllItems() {
        const q = `SELECT * FROM items ORDER BY created_at DESC`
        const res = await db.query(q)
        return res.rows
    }

    static async getItemByID(itemID){
        const q = `SELECT * FROM items WHERE id=$1`
        const res = await db.query(q, [itemID])
        return res.rows[0]
    }

    static async deleteItem(id) {
        const res = await db.query(`DELETE FROM items WHERE id=$1 RETURNING *`, [id])
        return res.rows
    }

    static async getActiveItems() {
        const res = await db.query(`SELECT * FROM items WHERE status='active' ORDER BY end_at ASC`)
        return res.rows
    }

    static async updateItem(id, { title_item, description, start_price, min_increment, start_at, end_at, status }) {
        const q = `
          UPDATE items
          SET title_item=$1, description=$2, start_price=$3, min_increment=$4, start_at=$5, end_at=$6, status=$7
          WHERE id=$8
          RETURNING *
        `
        const values = [title_item, description, start_price, min_increment, start_at, end_at, status, id]
        const res = await db.query(q, values)
        return res.rows[0]
    }

    static async closeItem(itemID) {
        const res = await db.query(
            `UPDATE items SET status = 'closed' WHERE id = $1 RETURNING *`,
            [itemID]
        )
        return res.rows[0]
    }

    static async activateItem(itemID) {
        const res = await db.query(
            `UPDATE items SET status = 'active' WHERE id = $1 RETURNING *`,
            [itemID]
        )
        return res.rows[0]
    }
}

module.exports = { ItemsModel }
