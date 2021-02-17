const usersList = require('../data/usersDataBase')
const bcryptjs = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const { validationResult, body } = require('express-validator')
var modelsUsers = require("../middlewares/models/user");

module.exports = {
      login: function (req, res, next) {

            res.render('./users/login', { name: {} })
      },

      processLogin: function (req, res, next) {
            let errors = validationResult(req);
            let user = modelsUsers.findByEmail(req.body.email);

            if (!user) {
                  return res.render("./users/login", {
                        errors: errors.mapped(),
                  });
            } else if (bcryptjs.compareSync(req.body.password, user.password)) {
                  req.session.user = user.email;
                  if (req.body.inSession) {
                        res.cookie("recordame", user.email, { maxAge: 120 * 1000 });
                  }
                  res.redirect("/products");
            } else {
                  return res.render("./users/login", {
                        errors: errors.mapped(),
                  });
            }
      },
      logout: function (req, res, next) {

            res.render('./users/', { errors: {}, data: {} })
      },

      // GUARDAR el ususario registrado // VALIDAR los datos
      register: function (req, res, next) {

            res.render('./users/register', { errors: {} })
      },

      processRegister: function (req, res, next) {
            let errors = validationResult(req)

            if (errors.isEmpty()) {
                  let name = req.body.name
                  let pathFile = path.join('src/data', 'usersDataBase.json')

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

                  res.redirect('products', { name: name })
            }
            else {
                  return res.render('users/register', {
                        errors: errors.mapped(),
                        data: req.body,
                  })
            }
      },

}