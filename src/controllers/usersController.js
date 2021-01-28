const usersList = require('../data/usersDataBase')
const bcryptjs = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const { validationResult, body } = require('express-validator')

module.exports = {
      login: function (req, res, next) {

            res.render('./users/login', { name: {} })
      },
      processLogin: function (req, res, next) {

            res.render('./users/login', { name: {} })
      },
      logout: function (req, res, next) {
            
            res.render('./users/', {errors: {}, data:{}})
      },

      // GUARDAR el ususario registrado // VALIDAR los datos
      register: function (req, res, next) {

            res.render('./users/register', {errors:{}})
      },
      processRegister: function (req, res, next) {
            let errors = validationResult(req)

            if (errors.isEmpty()) {
                  let name = req.body.name
                  let pathFile = path.join('data', 'usersDataBase.json')

                  let nuevoUser = fs.readFileSync(pathFile, { encoding: 'utf-8' })

                  // Convertir el string en array/json 
                  nuevoUser = JSON.parse(nuevoUser)

                  // agregar al array el producto nuevo
                  nuevoUser.push({
                        ...req.body,
                        id: nuevoUser[nuevoUser.length - 1].id + 1,
                        password: bcryptjs.hashSync(req.body.password, 10)
                  })
                  nuevoUser = JSON.stringify(nuevoUser)
                  fs.writeFileSync(pathFile, nuevoUser)

                  res.render('users/users', { name: name })
            }
            else{
                  return res.render('users/register', {
                        errors: errors.mapped(),
                        data : req.body,
                      })
            }
      },
      
}