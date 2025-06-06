const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dgyup30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


let db;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const connectDB = () => {
    try {
        db = client.db('hotelDB');
        console.log('MongoDB is connected✅');
    } catch (error) {
        console.error('MongoDB connection failed:', err);
        process.exit(1)
    }
}

const getDB = () => {
    if (!db) throw new Error('Database not connected!');
    return db;
}
module.exports = { getDB, connectDB }