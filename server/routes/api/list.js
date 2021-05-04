var express = require('express');
var router = express.Router();

/* GET All lists. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET list by id. */
router.get('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

/* POST Add list */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT Edit list */
router.put('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* DELETE list */
router.delete('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
