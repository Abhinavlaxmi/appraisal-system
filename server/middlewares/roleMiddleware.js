const permit = (...allowed) => {
    return (req, res, next) => {
      if (req.user && allowed.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    };
  };
  
  module.exports = { permit };
  