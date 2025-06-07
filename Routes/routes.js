const express = require('express');
const { startServer, getAllHotel, getAllReviews, getFeaturedRooms } = require('../Controller/controller');
const routes = express.Router();

routes.get('/', startServer)
routes.get('/all/hotels', getAllHotel)
routes.get('/all/reviews', getAllReviews)
routes.get('/all/featured', getFeaturedRooms)
module.exports = routes;