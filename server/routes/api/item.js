var express = require('express');
var router = express.Router();

/* GET item listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET item by id. */
router.get('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET items by list. */
router.get('/list/:id', function (req, res, next) {
    res.send('respond with a resource');
});

/* POST item to list */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT Edit item */
router.put('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* DELETE item */
router.delete('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
