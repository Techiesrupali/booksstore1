
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book Schema
const bookSchema = new Schema({
  bookName: { type: String, required: true },
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
  // ratings: [{
  //   userId: { type: Schema.Types.ObjectId, ref: 'User' },
  //   rating: { type: Number}
  // }],
  status:{type:Boolean}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

