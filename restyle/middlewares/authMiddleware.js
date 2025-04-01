const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const [users] = await req.db.query(
      'SELECT is_admin FROM users WHERE id = ?',
      [req.userId]
    );

    if (users.length === 0 || !users[0].is_admin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (err) {
    console.error('Admin check failed:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { authenticate, checkAdmin };