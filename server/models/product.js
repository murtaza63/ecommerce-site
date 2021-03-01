const mongoose = require('mongoose');
const Schema = mongoose.Schema
// Need an id, name, description, price
// Id is created
const product = new Schema({
    name: String,
    description: String,
    price: Number
})

// that will be inserted to the database.
module.exports = mongoose.model('Product', product);