const express = require('express');
const UserService = require('../service/User');
const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *    summary: Get User by ID
 *    description: Get User details by ID
 *    tags:
 *      - User
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *          format: uuid
 *        required:
 *          - id
 *    responses:
 *      200:
 *        description: Returns user object
 *      500:
 *        description: Server Error
 */
router.get('/:id', (request, response) => {
  userService.getUserById(request.params.id, (userErr, result) => {
    if (userErr) {
      response.status(500).send(authErr);
    }
    response.send(result);
  });
});

module.exports = router;
