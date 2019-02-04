/**
 * Index Controller to get all routes with index "/api"
 *
 * @exports {express} router
 */
const express = require('express');
const OAuthService = require('../service/OAuthServer');
const authController = require('./Auth');
const oAuthService = new OAuthService();
const router = express.Router();

/**
 * Middleware - "/api/auth/*"
 *
 * @param {String} route
 * @param {Class} authController
 */
router.use('/auth', authController);

module.exports = router;
