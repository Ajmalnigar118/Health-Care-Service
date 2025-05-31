const express = require('express');
const app = express();

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Appointment = require('./models/Appointment');
const Contact = require('./models/Contact');
const User = require('./models/User');
const adminRoutes = require('./backend/adminRoutes');

dotenv.config();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET || "your_secret_key";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/contact.html'));
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { name, fatherName, email, phone, doctor, date, time } = req.body;
    if (!name || !fatherName || !email || !phone || !doctor || !date || !time) {
      return res.status(400).json({ message: 'Please fill all fields.' });
    }

    const newAppointment = new Appointment({ name, fatherName, email, phone, doctor, date, time });
    await newAppointment.save();
    res.status(201).json({ message: '✅ Appointment booked successfully!' });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ message: '❌ Server error. Please try again later.' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill all fields.' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: '✅ Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: '❌ Server error. Please try again later.' });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { name, fatherName, email, phone, password } = req.body;
    if (!name || !fatherName || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please fill all fields.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, fatherName, email, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful! You can now login.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

app.post('/update-profile', upload.single('profileImage'), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    const { name, fatherName, email, phone } = req.body;
    let updateData = { name, fatherName, email, phone };

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    await User.findByIdAndUpdate(userId, updateData);
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

app.get('/get-user-info', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
