const cron = require('node-cron')
const { ItemsModel } = require('../models/items')

cron.schedule('* * * * *', async () => {
    try {
        const updated = await ItemsModel.updateExpiredItems()
        console.log('Expired items updated at', new Date())
    } catch (err) {
        console.error('Error updating expired items:', err)
    }
})
