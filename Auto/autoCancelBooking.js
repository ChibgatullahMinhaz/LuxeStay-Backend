const cron = require('node-cron');
const moment = require('moment');
const { ObjectId } = require('mongodb');
const { getDB } = require('../Config/db');

const autoCancel = () => {
    cron.schedule('*/5 * * * *', async () => {
        try {
            console.log('Running auto-cancel job every 5 minutes...');

            const db = getDB();
            const bookingsCollection = db.collection('bookings');
            const hotelCollection = db.collection('hotels');

            const today = moment().startOf('day').toDate();

            const expiredBookings = await bookingsCollection.find({
                endDate: { $lt: today }
            }).toArray();

            if (expiredBookings.length === 0) {
                console.log('No expired bookings found.');
                return;
            }

            for (const booking of expiredBookings) {
                await bookingsCollection.updateOne(
                    { _id: new ObjectId(booking._id) },
                    { $set: { status: 'expired' } }
                );

                await hotelCollection.updateOne(
                    { id: booking.roomId },
                    { $set: { isAvailable: true } }
                );

                console.log(`Expired booking updated for room ${booking.roomId}`);
            }

            console.log('Auto-cancel job completed.');

        } catch (error) {
            console.error('Auto-cancel job error:', error);
        }
    });
};

module.exports = autoCancel;
