const mongoose = require('mongoose');
const Schema = mongoose.Schema;

productSchema = new Schema({
    name: String,
    description: String,
    price: Number
},
{
	timestamps: true
},
{
	collection: 'Product'
});

const Product = mongoose.model('Products', productSchema);
const Models = { Product: Product };
module.exports = Models;