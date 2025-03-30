const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Expecting the token to be in the format "Bearer <token>"
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    // Attach decoded user info to request for later use
    req.user = decoded;
    next();
  });
};
