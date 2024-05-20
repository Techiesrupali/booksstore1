const mongoose = require('mongoose');
const { Schema } = mongoose;


// Category Schema
const categorySchema = new Schema({
  bookid:{type: String,},
  name: { type: String, required: true },
  title: { type: String},
  author: { type: String},
  genre: { type: String},
  ISBN: { type: String, unique: true },
  price: { type: Number},
  description: { type: String},
  publisher: { type: String},
  publicationDate: { type: Date},
  pageCount: { type: Number},
  language: { type: String},
  stock: { type: Number},
  coverImage: { type: String},
    subCategory: { type: Schema.Types.ObjectId, ref: 'book'}
  });


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
