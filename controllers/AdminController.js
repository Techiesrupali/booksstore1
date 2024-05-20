const Admin = require('../model/AdminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const key = process.env.KEY;


const createToken = (admin) => {
  return jwt.sign({ adminId: admin._id }, key, { expiresIn: "1h" });
};

// Controller function to register a new admin
const registerAdmin = async (req, res) => {
  try {
    const {role,name, email, password, phone, address, } = req.body;

    // Check if the user already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({role,name, email, password: hashedPassword, phone, address,});

    // Save the admin to the database
    await newAdmin.save();

    // Create a token
    const token = createToken(newAdmin);

    res.status(201).json({ token, newAdmin, message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to login an admin
const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find the admin by username
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create a token
    const token = createToken(admin);

    res.status(200).json({ token, admin, message: 'Admin logged in successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const getAdminById = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
//     res.status(200).json(admin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const updateAdminById = async (req, res) => {
//   try {
//     const { username, email, password, name, address, phone, role } = req.body;

//     let hashedPassword;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const updatedAdmin = await Admin.findByIdAndUpdate(
//       req.params.id,
//       {
//         username,
//         email,
//         password: hashedPassword || undefined,
//         name,
//         address,
//         phone,
//         role
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     res.status(200).json({ updatedAdmin, message: 'Admin updated successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const deleteAdminById = async (req, res) => {
//   try {
//     const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
//     if (!deletedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
//     res.status(200).json({ message: 'Admin deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

module.exports = {registerAdmin,loginAdmin};
