module.exports = (req, res, next) => {
    req.user = { email: 'mockuser@example.com' };
    next();
  };
  