const express = require('express');
const router = express.Router();
const JWTValidate = require('../middleware/JWTValidate')
const controller = require('../controllers/users');

router.post('/', JWTValidate, controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;