const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", '/', 'node_modules')));
router.use(express.static(path.join(__dirname, "..", '/', 'img')));



module.exports = router;
