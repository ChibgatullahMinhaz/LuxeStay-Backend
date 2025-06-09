const express = require('express');
const { startServer, getAllHotel, getAllReviews, getFeaturedRooms, getMyBookings, makeBooking, makeReview, makeUpdateBookedDate, deleteBooking, getFilteredRooms } = require('../Controller/controller');
const verifyFirebaseToken = require('../middleware/verifyToken');
const routes = express.Router();


// get APIs
routes.get('/', startServer)
routes.get('/all/hotels', getAllHotel)
routes.get('/all/reviews', getAllReviews)
routes.get('/topRated/featured', getFeaturedRooms)
routes.get('/rooms/myBookings', verifyFirebaseToken, getMyBookings)
routes.get("/rooms", getFilteredRooms);

// posts APIs
routes.post('/room/bookings', verifyFirebaseToken, makeBooking)
routes.post('/give/review',verifyFirebaseToken, makeReview);

// patch
routes.patch('/booking/date/update', verifyFirebaseToken, makeUpdateBookedDate)

//delete
routes.delete('/api/delete/booking/:id',verifyFirebaseToken, deleteBooking)
module.exports = routes;