import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import {
    createBooking,
    getAllBooking,
    getBookingById,
    getBookingByUserId
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBookingById);
router.get('/getBookingByUser/:id', getBookingByUserId);
router.get('/', verifyAdmin, getAllBooking);

export default router;
