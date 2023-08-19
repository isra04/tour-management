import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();

        res.status(200).json({
            success: true,
            message: 'Your tour is booked!',
            data: savedBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get single booking item
export const getBookingById = async (req, res) => {
    const bookingId = req.params.id;

    try {
        const bookItem = await Booking.findById(bookingId);
        res.status(200).json({
            status: true,
            message: 'successful',
            data: bookItem
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: 'not found'
        });
    }
};

// Get all booking by userId
export const getBookingByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const bookItem = await Booking.find({
            userId: userId
        });
        res.status(200).json({
            status: true,
            message: 'successful',
            data: bookItem
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: 'not found'
        });
    }
};

// Get all booking item

export const getAllBooking = async (req, res) => {
    try {
        const bookItems = await Booking.find();
        res.status(200).json({
            status: true,
            message: 'successful',
            data: bookItems
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
};
