const { users } = require('../models');

exports.post = async (req, res, next) => {
  const data = await users.findAll();
  res.json({ data });
};

exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(201).send(`Update ${id}`);
};

exports.delete = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send(`Delete ${id}`);
};
