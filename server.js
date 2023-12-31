const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 5000;
const checkBookingEndDates = require('./utils/scheduledTasks');
const checkBookingEndDatesOngoing = require('./utils/updateRideOngoing');
// const checkBookingEndDatesTwo = require('./utils/scheduledBooking');

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});
// checkBookingEndDates();
// checkBookingEndDatesOngoing();
// checkBookingEndDatesTwo();
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(5000, () => {
    console.log(`Server running on http://localhost:${5000}`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
