const Book = require('../model/BooksModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const key = process.env.KEY;

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, key, { expiresIn: "1h" });
};

// Controller function to create a new book
const createBook = async (req, res) => {
  try {
    const {
    
      bookName,
      title,
      author,
      genre,
      ISBN,
      price,
      description,
      publisher,
      publicationDate,
      pageCount,
      language,
      stock,
      coverImage,
     
      
      // subCategory
    } = req.body;

    // Create a new book instance
    const newBook = new Book({bookName,title,author,genre,ISBN,price,description,publisher,publicationDate,pageCount,language,stock,coverImage,
      // subCategory
    });

    
    await newBook.save();
    const token = createToken(newBook);

    res.status(201).json({token,newBook,message: 'Create book successfully'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a book by ID
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a book by ID
// const deleteBook = async (req, res) => {
//   try {
//     const book = await Book.findByIdAndDelete(req.params.id);
//     if (book) {
//       res.json({ message: 'Book deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Book not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {createBook, getAllBooks,getBookById, updateBook}