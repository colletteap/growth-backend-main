module.exports = (req, res, next) => {
    req.user = { email: 'test@example.com' };
    next();
  };
  