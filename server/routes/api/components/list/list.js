const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

//Define swagger schema for list
/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - list_id
 *         - label
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
 *       example:
 *          id: '1'
 *          title: 'Things to do'
 *          created_at: '2018-04-23'
 */

/**
 * @swagger
 * tags:
 *  name: To-do Lists
 *  description: The to-do lists api
 */

/**
 * @swagger
 *  /api/lists:
 *      get:
 *          summary: Returns the list of all the to-do lists
 *          tags: [To-do Lists]
 *          responses:
 *              200:
 *                  description: The array with all to-do lists
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              lists:
 *                                  $ref: '#/components/schemas/List'
 */

/* GET all to-do lists. */
router.get('/', function (req, res, next) {
    const lists = req.app.db.get('lists');
    res.json(lists);
});

/**
 * @swagger
 *  /api/lists/{id}:
 *      get:
 *          summary: Get to-do list by id, including its items.
 *          tags: [To-do Lists]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The list ID
 *          responses:
 *              200:
 *                  description: The to-do list by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/List'
 *              404:
 *                  description: List not found
 */

/* GET list by id. */
router.get('/:id', function (req, res, next) {
    let list = req.app.db.get('lists').find({ id: req.params.id }).value();
    list.items = [
        ...req.app.db.get('items').filter({ list_id: req.params.id }),
    ];
    res.status(list ? 200 : 404).json(list);
});

/**
 * @swagger
 *  /api/lists:
 *      post:
 *          summary: Creates a new to-do list
 *          tags: [To-do Lists]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/List'
 *          responses:
 *              200:
 *                  description: List successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/List'
 *              500:
 *                  description: Some server error
 */

/* POST list to list */
router.post('/', function (req, res, next) {
    try {
        const list = {
            id: nanoid(req.app.get('db-id-length')),
            ...req.body,
        };
        req.app.db.get('lists').push(list).write();

        return res.json(list);
    } catch (err) {
        return res.status(500).send(err);
    }
});

/**
 * @swagger
 *  /api/lists/{id}:
 *      put:
 *          summary: Updates a list by id
 *          tags: [To-do Lists]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The list ID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/List'
 *          responses:
 *              200:
 *                  description: List successfully modified
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/List'
 *              404:
 *                  description: List not found
 *              500:
 *                  description: Some server error
 */

/* PUT Edit list */
router.put('/:id', function (req, res, next) {
    try {
        const list = req.app.db.get('lists').find({ id: req.params.id });
        list.assign(req.body).write();
        res.status(list.value() ? 200 : 404).json(
            req.app.db.get('lists').find({ id: req.params.id }).value()
        );
    } catch (err) {
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 *  /api/lists/{id}:
 *      delete:
 *          summary: Removes a list by id
 *          tags: [To-do Lists]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The list ID
 *          responses:
 *              200:
 *                  description: List successfully removed
 *              404:
 *                  description: List not found
 *              500:
 *                  description: Some server error
 */

/* DELETE list */
router.delete('/:id', function (req, res, next) {
    try {
        const list = req.app.db
            .get('lists')
            .find({ id: req.params.id })
            .value();
        req.app.db.get('lists').remove({ id: req.params.id }).write();
        res.status(list ? 200 : 404).json();
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
