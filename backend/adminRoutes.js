const fs = require("fs");
const path = require("path");
const express = require('express');
const router = express.Router();




// Middleware import کرو
const { verifyAdminToken } = require('./middlewares/authMiddleware');


// Use the middleware
router.get('/appointments', verifyAdminToken, async (req, res) => {
  // appointments کو retrieve کرنے والا code
});

router.get('/messages', verifyAdminToken, async (req, res) => {
  // messages کو retrieve کرنے والا code
});

router.get('/users', verifyAdminToken, async (req, res) => {
  // users کو retrieve کرنے والا code
});



// GET all appointments for admin panel
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
});

module.exports = router;

const Appointment = require('./models/Appointment');

function adminLogin(req, res) {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { username, password } = JSON.parse(body);

    // Replace this with real admin credentials or DB check
    if (username === "admin" && password === "admin123") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Login successful", token: "admin-token" }));
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid credentials" }));
    }
  });
}

module.exports = { adminLogin };

router.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// Route to get all messages
router.get('/messages', verifyAdminToken, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
});
// Add at the top if not already

// Route to get all messages
router.get('/messages', verifyAdminToken, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
});


// Route to fetch registered users
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

module.exports = router;


