const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')


async function createAdminIfNotExist() {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD

  if (!username || !password) {
    console.log('ADMIN_USERNAME or ADMIN_PASSWORD not set in .env')
    return
  }

  const existing = await UsersModel.findByName(username)
  if (existing.length > 0) {
    console.log('Admin user already exists')
    return
  }

  const hash = await bcrypt.hash(password, 10)

  await UsersModel.createUser(username, hash, 'admin')
  console.log(`Admin user created: ${username}`)
}

module.exports = createAdminIfNotExist
