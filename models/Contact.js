const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },      // یوزر کا نام
  email: { type: String, required: true },     // یوزر کا ای میل
  message: { type: String, required: true },   // یوزر کا میسج
  createdAt: { type: Date, default: Date.now } // جب میسج بھیجا گیا
});

module.exports = mongoose.model('Contact', contactSchema);



