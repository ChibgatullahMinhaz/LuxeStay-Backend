const express = require('express');
const { startServer, getAllHotel, getAllReviews, getFeaturedRooms, getMyBookings, makeBooking } = require('../Controller/controller');
const verifyFirebaseToken = require('../middleware/verifyToken');
const routes = express.Router();

routes.get('/', startServer)
routes.get('/all/hotels', getAllHotel)
routes.get('/all/reviews', getAllReviews)
routes.get('/topRated/featured', getFeaturedRooms)
routes.get('/rooms/myBookings', verifyFirebaseToken, getMyBookings)
routes.post('/room/bookings', verifyFirebaseToken, makeBooking)
module.exports = routes;