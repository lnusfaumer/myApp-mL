const {check} = require('express-validator')

module.exports = [
      
      check('name')
      .isLength({min:3, max:10})
      .withMessage('El nombre debe tener minimo 3 caracteres y max 50 '),
      check('stock')
      .isInt({gt:0})
      .withMessage(' El stock debe ser mayor a 0'),
      check('price')
      .isInt({gt:0, lt:999999999})
      .withMessage('Debe contener un valor numerico mayor a 0 '),
      check('category')
      .isLength({min:3, max:10})
      .withMessage('No hay categoria seleccionada'),
      check('image')
      .isLength({min:1})
      .withMessage('Este campo debe estar completo'),
]

