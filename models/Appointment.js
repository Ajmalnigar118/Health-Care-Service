// models/Appointment.js
const mongoose = require('mongoose');
// adminRoutes.js میں یہ import کریں


const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
