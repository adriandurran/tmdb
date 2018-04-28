const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const Competency = require('../models/competency');

module.exports = app => {
  app.get('/api/competencies', requireLogin, async (req, res) => {
    const dbComps = await Competency.find({});
    res.send(dbComps);
  });

  app.post('/api/competencies', requireAdmin, async (req, res) => {
    const newComp = req.body;
    console.log(newComp);
    const newCompCreated = await Competency.create(newComp);
    res.send(newCompCreated);
  });
};
