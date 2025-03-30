module.exports = function adminMiddleware(req, res, next) {
    // Check if req.user (set by authMiddleware) exists and is an admin.
    // For example, here we check if the username is 'admin'
    if (req.user && req.user.username === 'admin') {
      return next();
    }
    return res.status(403).json({ error: 'Admin privileges required' });
  };
  