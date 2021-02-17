const fs = require('fs');
const path = require('path');
var homeImg = require('../data/productsDataBase')

const productsFilePath = path.join('src/data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		let visited = homeImg.filter(function (items) {
			if (items.category != "visited") {
			  return items;
			}
		    });
		let ofertas= homeImg.filter(function (items) {
			if (items.category == "visited") {
			  return items;
			}
		    });
		  
		res.render('index', {visited:visited, ofertas:ofertas, convertir: toThousand  });
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
