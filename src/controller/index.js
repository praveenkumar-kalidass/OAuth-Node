/**
 * Index Controller to get all routes with index "/api"
 *
 * @exports {express} router
 */
const express = require('express');
const authController = require('./Auth');
const router = express.Router();

/**
 * Middleware - "/api/auth/*"
 *
 * @param {String} route
 * @param {Class} authController
 */
router.use('/auth', authController);

module.exports = router;
