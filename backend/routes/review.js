import express from 'express';
import {
    createReview,
    getReviewsByUser
} from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:tourId', verifyUser, createReview);
router.get('/getReviewsByUser/:id', getReviewsByUser);

export default router;
