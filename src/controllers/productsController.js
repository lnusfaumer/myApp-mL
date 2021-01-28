const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { productos: products, convertir: toThousand });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let detail = products.find(function (items) {
		  if (items.id == req.params.id) {
		    return items;
		  }
		});
		res.render("detail", { detail: detail, convertir: toThousand });
	    },

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req)

      if(!errors.isEmpty() ){
      return res.render('products/createProduct', {
        errors: errors.mapped(),
        data : req.body,
      })
    }
      // Traer products.json a una variable
    let pathFile = path.join('data','productsDataBase.json')
    let nuevoProduct = fs.readFileSync(pathFile, { encoding: 'utf-8' })

    // Convertir el string en array/json 
    nuevoProduct = JSON.parse(nuevoProduct)

   // agregar al array el producto nuevo

    nuevoProduct.push({
      ...req.body,
      id: nuevoProduct[nuevoProduct.length - 1].id + 1,
      image: req.files[0].filename 
    })
    nuevoProduct = JSON.stringify(nuevoProduct)

    fs.writeFileSync(pathFile, nuevoProduct)

    res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form');
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;