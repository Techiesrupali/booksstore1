const Category = require('../model/CategoryModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const key = process.env.KEY;

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, key, { expiresIn: "1h" });
};

// Controller function to create a new Category book
const createCategoryBook = async (req, res) => {
  try {
    const { bookid, name, title, author, genre, ISBN, price, description, publisher, publicationDate, pageCount, language, stock, coverImage, ratings, bookId, subCategory } = req.body;

    // Create a new Category book instance
    const newCategory = new Category({ bookid, name, title, author, genre, ISBN, price, description, publisher, publicationDate, pageCount, language, stock, coverImage, ratings, bookId, subCategory });

    await newCategory.save();
    const token = createToken(newCategory);

    res.status(201).json({ token, newCategory, message: 'Book created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get all Category books
const getAllCategoryBooks = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get a Category book by ID
const getCategoryBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to update a Category book by ID
const updateCategoryBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ updatedCategory, message: 'Book updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a Category book by ID
const deleteCategoryBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCategoryBook,
  getAllCategoryBooks,
  getCategoryBookById,
  updateCategoryBookById,
  deleteCategoryBookById
};
