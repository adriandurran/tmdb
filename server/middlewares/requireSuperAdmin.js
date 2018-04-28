module.exports = (req, res, next) => {
  if (req.user.isSuperAdmin) {
    return res.status(401).send({ error: 'You must be a Super Admin' });
  }

  next();
};
