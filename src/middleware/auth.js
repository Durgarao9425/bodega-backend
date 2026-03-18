const jwt = require('jsonwebtoken');

// Authentication Middleware
// This function checks if the user has a valid JWT token
// It runs BEFORE the route handler for protected routes

const authMiddleware = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    // Header format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Please login.' });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the userId to request so the route can use it
    // Support both req.userId (cart routes) and req.user.id (user routes)
    req.userId = decoded.userId;
    req.user = { id: decoded.userId };

    // Move to the next function (the actual route handler)
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please login again.' });
  }
};

module.exports = authMiddleware;
