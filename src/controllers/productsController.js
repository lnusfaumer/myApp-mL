const fs = require('fs');
const path = require('path');
const { validationResult, body } = require('express-validator')

const pathFile = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
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
		res.render('product-create-form', {data:{}, errors:{}});
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req)

      if(!errors.isEmpty() ){
      return res.render('product-create-form', {
        errors: errors.mapped(),
        data : req.body,
      })
      }
      // Traer products.json a una variable
    let products = fs.readFileSync(pathFile, { encoding: 'utf-8' })

    // Convertir el string en array/json 
    products = JSON.parse(products)
   // agregar al array el producto nuevo
    products.push({
      ...req.body,
      id: products[products.length - 1].id + 1,
    })
    products = JSON.stringify(products)
    fs.writeFileSync(pathFile, products)

    res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let ver = products.find(function (items) {
		  if (items.id == req.params.id) {
		    return items;
		  }
		});
		res.render("product-edit-form", { ver: ver});
	    },
	    // Update - Method to update
	    update: (req, res) => {
		let thisProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });
		thisProduct = JSON.parse(thisProduct);
		thisProduct = thisProduct.map(function (buscar) {  
		//   if (buscar.id == req.params.id) {
		// 	  buscar = { ...req.body };
		// 	  if(req.files.length == []) {
		// 		  buscar.image = "";
		// 	    } else {
		// 		  buscar.image = req.files[0].filename;
		// 	    }
		//     return buscar;
		//   }
		});
		thisProduct = JSON.stringify(thisProduct);
		fs.writeFileSync(pathFile, thisProduct);
	  
		res.redirect("/products");
	    },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;