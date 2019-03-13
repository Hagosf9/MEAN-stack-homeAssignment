const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/logout', ctrlUser.logOut);

module.exports = router;
