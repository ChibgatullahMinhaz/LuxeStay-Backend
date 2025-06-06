const express = require('express');
const { startServer, getAllHotel, getAllReviews } = require('../Controller/controller');
const routes = express.Router();

routes.get('/', startServer)
routes.get('/all/hotels', getAllHotel)
routes.get('/all/reviews', getAllReviews)
module.exports = routes;