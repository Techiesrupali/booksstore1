const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const adminSchema = new Schema({
  role: { type: String, enum: ['subadmin'] },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;