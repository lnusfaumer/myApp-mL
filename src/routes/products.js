// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

//Funcion Multer para subir archivos
const multer = require('multer')
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'src/public/images/products')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
      }
    })
    var upload = multer({ storage: storage })

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/',upload.any(), productsController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update/:id',upload.any(), productsController.update); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
