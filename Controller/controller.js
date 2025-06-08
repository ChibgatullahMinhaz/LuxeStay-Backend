const { ObjectId } = require("mongodb");
const { getDB } = require("../Config/db")

exports.startServer = (req, res) => {
    res.send('LuxeStay server getting hotter')
}
exports.getAllHotel = async (req, res) => {
    try {
        const db = getDB();
        const hotelCollection = db.collection('hotels');
        const result = await hotelCollection.find().toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching hotel data:", error);
        res.status(500).json({ error: "Failed to fetch hotel data." });
    }
}


exports.makeReview = async (req, res) => {
    try {
        const db = getDB()
        const reviewCollection = db.collection('roomsReviews');
        const reviewData = req.body;
        console.log(reviewData)
        const userEmail = req.body.email;
        const validEmail = req.user.email;
        console.log(userEmail, validEmail)
        if (userEmail.toLowerCase() !== validEmail.toLowerCase()) {
            return res.status(401).json({ error: "Unauthorized: Invalid User" });
        }
        const result = await reviewCollection.insertOne(reviewData)
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add review data.' })
    }
}
exports.getAllReviews = async (req, res) => {
    try {
        const db = getDB();
        const reviewCollection = db.collection('roomsReviews');
        const result = await reviewCollection
            .find()
            .sort({ _id: -1 })
            .toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching review data:", error);
        res.status(500).json({ error: "Failed to fetch review data." });
    }
};

exports.getFeaturedRooms = async (req, res) => {
    try {
        const db = getDB();
        const reviewCollection = db.collection("roomsReviews");
        const roomsCollection = db.collection("hotels");

        const reviews = await reviewCollection.find().sort({ rating: -1 }).limit(6).toArray();

        const roomIds = [...new Set(reviews.map(review => review.roomId))];

        const result = await roomsCollection.find({
            id: { $in: roomIds.map(id => id) }
        }).toArray();
        res.send(result);

    } catch (error) {
        console.error("Error fetching featured rooms:", error);
        res.status(500).json({ error: "Failed to fetch featured rooms." });
    }
};


exports.makeBooking = async (req, res) => {
    try {
        const db = getDB();
        const bookingsCollection = db.collection('bookings')
        const hotelCollection = db.collection('hotels');

        const bookedData = req.body;
        const userEmail = req.body.email;
        const validEmail = req.user.email;

        if (userEmail.toLowerCase() !== validEmail.toLowerCase()) {
            return res.status(401).json({ error: "Unauthorized: Invalid User" });
        }
        const room = await hotelCollection.findOne({ id: bookedData.roomId })

        if (!room) {
            return res.status(404).send('no room find')
        }
        if (room.isAvailable === false) {
            return res.status(400).send('room is not available')
        }

        bookedData.createdAt = new Date();
        const result = await bookingsCollection.insertOne(bookedData);

        const query = { id: bookedData.roomId }
        const updateDoc = { $set: { isAvailable: false } }

        await hotelCollection.updateOne(query, updateDoc)
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ message: "Failed to make booking", error });
    }
}

exports.getMyBookings = async (req, res) => {
    try {
        const db = getDB();
        const bookingsCollection = db.collection('bookings')
        const userEmail = req.query.email;
        const validEmail = req.user.email;

        if (userEmail.toLowerCase() !== validEmail.toLowerCase()) {
            return res.status(401).json({ error: "Unauthorized: Invalid User" });
        }

        const query = { email: userEmail }
        const result = await bookingsCollection.find(query).toArray();
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bookings data." });
    }
}

exports.makeUpdateBookedDate = async (req, res) => {
    try {
        const db = getDB();
        const bookingsCollection = db.collection('bookings')
        const id = req.body.roomId
        const updatedDate = req.body;
        const userEmail = req.body.email;
        const validEmail = req.user.email;

        if (userEmail.toLowerCase() !== validEmail.toLowerCase()) {
            return res.status(401).json({ error: "Unauthorized: Invalid User" });
        }
        const createdAt = new Date();
        const query = {
            roomId: id
        }
        const updateDoc = {
            $set: {
                createdAt: createdAt,
                bookingDate: updatedDate?.newDate
            }
        }
        const result = await bookingsCollection.updateOne(query, updateDoc)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({ error: 'Fail To update booked date' })
    }
}

exports.deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const db = getDB();
        const bookingsCollection = db.collection('bookings')
        const hotelCollection = db.collection('hotels');

        const result = await bookingsCollection.deleteOne({ roomId: bookingId });
        const query = { id: bookingId }
        const updateDoc = { $set: { isAvailable: true } }

        await hotelCollection.updateOne(query, updateDoc)
        res.status(200).send(result)

    } catch (error) {
        res.status(500).send(error, 'Failed to Delete Booking')
    }
}