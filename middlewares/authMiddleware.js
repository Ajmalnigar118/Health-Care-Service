// middlewares/authMiddleware.js

function verifyAdminToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token === 'admin12345token') {
    next(); // Authorized
  } else {
    res.status(401).json({ message: 'Unauthorized admin access' });
  }
}

module.exports = { verifyAdminToken };
