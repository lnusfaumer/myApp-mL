const path = require('path')
const file = path.resolve('src/data','usersDataBase.json')
const fs = require('fs')
let users = require(file)

// CREAR usuario == REGISTER
function create(user) {
      user.id = users.length + 1
      users.push(user)
      
      fs.writeFileSync(file, JSON.stringify(users))
      console.log(users);
}

/// BUSCAR por ID
function findById(id) {
      return users.find(function (user) {
            return user.id == id
      })
}
/// BUSCAR por EMAIL
function findByEmail(email) {
      return users.find(function (user) {
            return user.email == email
      })
}
/// BUSCAR por PASSWORD
function findByPassword(password) {
      return users.find(function (user) {
            return user.password == password
      })
}
module.exports = {
      create,
      findById,
      findByEmail
}