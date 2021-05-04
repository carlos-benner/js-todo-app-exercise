var express = require('express');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id for the to-do list.
 *         title:
 *           type: string
 *           description: The title of the to-do list
 *         created_at:
 *           type: string
 *           description: Time this to-do list was created
 *         completed_at:
 *           type: string
 *           description: Time this to-do list was marked as completed
 */

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
