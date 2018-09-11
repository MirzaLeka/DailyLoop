const mongoose = require('mongoose');
 
const { ObjectId } = mongoose.Schema.Types;

var booksSchema = new mongoose.Schema({
  text: {
      type: String,
      default: null
  }
});


 
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  books: [booksSchema]
});

productSchema.index({
  name: 'text',
  description: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});

console.log("Hello bbb!");

const Product = mongoose.model('Product', productSchema);
 
module.exports = Product;