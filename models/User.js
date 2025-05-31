// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true } // hashed password
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


({
  name: String,
  fatherName: String,
  email: String,
  phone: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
