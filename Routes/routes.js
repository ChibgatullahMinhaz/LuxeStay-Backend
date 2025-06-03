const express = require('express');
const { startServer } = require('../Controller/controller');
const routes = express.Router();

routes.get('/', startServer)

module.exports = routes;