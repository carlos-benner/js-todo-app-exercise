var express = require('express');
var router = express.Router();

router.use('/items', require('./components/item/item'));
router.use('/lists', require('./components/list/list'));

module.exports = router;
