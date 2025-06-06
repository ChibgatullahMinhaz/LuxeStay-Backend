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
            .sort({ date: -1 })
            .toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching review data:", error);
        res.status(500).json({ error: "Failed to fetch review data." });
    }
};
