const express = require('express');
const { startServer, getAllHotel } = require('../Controller/controller');
const routes = express.Router();

routes.get('/', startServer)
routes.get('/all', getAllHotel)
module.exports = routes;