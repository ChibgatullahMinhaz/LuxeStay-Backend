const express = require('express');
const { startServer, getAllHotel, getAllReviews, getFeaturedRooms, getMyBookings, makeBooking, makeReview } = require('../Controller/controller');
const verifyFirebaseToken = require('../middleware/verifyToken');
const routes = express.Router();

routes.get('/', startServer)
routes.get('/all/hotels', getAllHotel)
routes.get('/all/reviews', getAllReviews)
routes.get('/topRated/featured', getFeaturedRooms)
routes.post('/give/review',verifyFirebaseToken, makeReview)
routes.get('/rooms/myBookings', verifyFirebaseToken, getMyBookings)
routes.post('/room/bookings', verifyFirebaseToken, makeBooking)
module.exports = routes;