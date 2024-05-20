const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');
const CategoryController = require('../controllers/CategoryController');
const AdminController = require('../controllers/AdminController');


// ----------------------------------Books ------------------------------------------------------

router.post('/createbook', bookController.createBook);

router.get('/allbook', bookController.getAllBooks);
router.get('/book/:id', bookController.getBookById);

router.put('/updatebook/:id', bookController.updateBook);
// router.delete('/deletebook/:id', bookController.deleteBook);



//--------------------category--------------------

router.post('/categories', CategoryController.createCategoryBook);

// Route to get all Category books
router.get('/categories', CategoryController.getAllCategoryBooks);

// Route to get a Category book by ID
router.get('/categories/:id', CategoryController.getCategoryBookById);

// Route to update a Category book by ID
router.put('/categories/:id', CategoryController.updateCategoryBookById);

// Route to delete a Category book by ID
router.delete('/categories/:id', CategoryController.deleteCategoryBookById);


// router.get('/getcat', CategoryController.getAllCategories);


//-------------------------Admin----------------------------
router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);



module.exports = router;
