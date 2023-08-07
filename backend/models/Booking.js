import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        userEmail: {
            type: String
        },
        fullName: {
            type: String,
            required: true
        },
        tourName: {
            type: String,
            required: true
        },
        guestSize: {
            type: Number,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        bookAt: {
            type: Date,
            require: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
