import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import {
    createBooking,
    getAllBooking,
    getBookingById
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBookingById);
router.get('/', verifyAdmin, getAllBooking);

export default router;
