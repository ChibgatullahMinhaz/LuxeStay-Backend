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



