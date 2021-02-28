const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { Console } = require('console');

const productsFilePath = path.join('src/data','productsDataBase.json');
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
	create: function (req, res, next) {
		let userFind = products.find(function (log) {
		  if (log.email == res.locals.user) {
		    return log;
		  }
		});
	  
		if (userFind == undefined) {
		  return res.render("users/login", { errors: {} });
		} else {
		  res.render("product-create-form", {data:{}, errors:{}});
		}
	    },
	// Create -  Method to store
	store: (req, res, next) => {
		let errors = validationResult(req)

      if(!errors.isEmpty() ){
      return res.render('product-create-form', {
        errors: errors.mapped(),
        data : req.body,
      })
      }
	// Traer products.json a una variable
	else {let products = fs.readFileSync(productsFilePath, { encoding: 'utf-8' })

	// Convertir el string en array/json 
	products = JSON.parse(products)
     // agregar al array el producto nuevo
	products.push({
	  ...req.body,
	  id: products[products.length - 1].id + 1,
	  image: req.files[0].filename, 
	})
	
	products = JSON.stringify(products)
	
	fs.writeFileSync(productsFilePath, products)
	console.log(products)
  
	res.redirect('/products')}
    
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
	    update: (req, res, next) => {
		
            let upProduct = fs.readFileSync( productsFilePath, { encoding: 'utf-8' })
		upProduct = JSON.parse(upProduct);
		let editar = [...upProduct] 
		editar = editar.forEach(function(item){
                  if (item.id == req.params.id) {
				item.name = req.body.name,
				item.price = req.body.price,
				item.discount = req.body.discount,
				item.category = req.body.category,
				item.description = req.body.description
		    
				if(req.files.length == []) {
		    
				  item.image = "";
		    
				} else {
		    
				  item.image = req.files[0].filename;
		    
				}
			    }
			    console.log(editar)
		})	
	  
		upProduct = JSON.stringify(upProduct);
	  
		fs.writeFileSync(productsFilePath, upProduct);
	  
		res.redirect('/products');
	    },
	
	// Delete - Delete one product from DB
	destroy : (req, res) => {
			let deleteProduct = fs.readFileSync(productsFilePath, { encoding: "utf-8" });
			deleteProduct = JSON.parse(deleteProduct);
			deleteProduct = deleteProduct.filter(function (items) {
			  if (items.id != req.params.id) {
			    return items;
			  }
			});
			deleteProduct = JSON.stringify(deleteProduct);
			fs.writeFileSync(productsFilePath, deleteProduct);
		  
			res.redirect("/products");
		    },
};

module.exports = controller;