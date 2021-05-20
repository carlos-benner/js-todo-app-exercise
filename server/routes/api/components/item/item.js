const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

//#region swagger schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - list_id
 *         - label
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id for the to-do item.
 *         list_id:
 *           type: string
 *           description: The id of the list this to-do item belongs to.
 *         label:
 *           type: string
 *           description: The text of the to-do
 *         created_at:
 *           type: string
 *           description: Time this to-do item was created
 *         completed_at:
 *           type: string
 *           description: Time this to-do item was marked as completed
 *       example:
 *          id: '1'
 *          list_id: '1'
 *          label: 'Finish this to-do project'
 *          created_at: ''
 */
//#endregion

//#region swagger Todo Item tag
/**
 * @swagger
 * tags:
 *  name: To-do Items
 *  description: The to-do items api
 */
//#endregion

//#region swagger GET item listing
/**
 * @swagger
 *  /api/items:
 *      get:
 *          summary: Returns the list of all the to-do items
 *          tags: [To-do Items]
 *          responses:
 *              200:
 *                  description: The list of the to-do items
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Item'
 */
//#endregion

router.get('/', function (req, res, next) {
    const items = req.app.db.get('items');
    res.json(items);
});

//#region swagger GET item by id
/**
 * @swagger
 *  /api/items/{id}:
 *      get:
 *          summary: Get to-do item by id
 *          tags: [To-do Items]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The item ID
 *          responses:
 *              200:
 *                  description: The to-do item by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Item'
 *              404:
 *                  description: Item not found
 */

//#endregion

router.get('/:id', function (req, res, next) {
    const item = req.app.db.get('items').find({ id: req.params.id }).value();
    res.status(item ? 200 : 404).json(item);
});

//#region Swagger GET item by list id
/**
 * @swagger
 *  /api/items/list{id}:
 *      get:
 *          summary: Get to-do items by their list id
 *          tags: [To-do Items]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The list ID
 *          responses:
 *              200:
 *                  description: The to-do item by list id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Item'
 */

//#endregion

router.get('/list/:id', function (req, res, next) {
    const items = req.app.db
        .get('items')
        .filter({ list_id: req.params.id })
        .value();
    res.json(items);
});

//#region swagger POST Create a new item
/**
 * @swagger
 *  /api/items:
 *      post:
 *          summary: Creates a new to-do item that belongs to the list with list_id
 *          tags: [To-do Items]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item'
 *          responses:
 *              200:
 *                  description: Item successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Item'
 *              500:
 *                  description: Some server error
 */

//#endregion

router.post('/', function (req, res, next) {
    try {
        req.body.id = undefined;
        let item = {
            ...req.body,
        };
        item.id = nanoid(req.app.get('db-id-length'));
        item.created_at = new Date().toISOString();
        if (req.app.db.get('lists').find({ id: req.body.list_id }).value()) {
            if (item.id && item.label && item.created_at && item.list_id) {
                req.app.db.get('items').push(item).write();
                return res.json(req.app.db.get('items').find({ id: item.id }));
            } else {
                return res.status(400).json();
            }
        } else {
            return res.status(400).json();
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

//#region swagger PUT Update item
/**
 * @swagger
 *  /api/items/{id}:
 *      put:
 *          summary: Updates an item by id
 *          tags: [To-do Items]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The item ID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item'
 *          responses:
 *              200:
 *                  description: Item successfully modified
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Item'
 *              404:
 *                  description: Item not found
 *              500:
 *                  description: Some server error
 */

//#endregion

router.put('/:id', function (req, res, next) {
    try {
        const item = req.app.db.get('items').find({ id: req.params.id });
        item.assign(req.body).write();
        res.status(item.value() ? 200 : 404).json(
            req.app.db.get('items').find({ id: req.params.id }).value()
        );
    } catch (err) {
        return res.status(500).json(err);
    }
});

//#region swagger DELETE remove item
/**
 * @swagger
 *  /api/items/{id}:
 *      delete:
 *          summary: Removes an item by id
 *          tags: [To-do Items]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The item ID
 *          responses:
 *              200:
 *                  description: Item successfully removed
 *              404:
 *                  description: Item not found
 *              500:
 *                  description: Some server error
 */

//#endregion

router.delete('/:id', function (req, res, next) {
    try {
        const item = req.app.db
            .get('items')
            .find({ id: req.params.id })
            .value();
        req.app.db.get('items').remove({ id: req.params.id }).write();
        res.status(item ? 200 : 404).json();
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;
