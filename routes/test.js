const express = require('express');
const router = express.Router();
const db = require('../database/index');

router.get('/', (req, res) => {
    res.json({'msg': 'This works'});
});

module.exports = router;