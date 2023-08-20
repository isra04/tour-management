import express from 'express';
import {
    createReview,
    getReviewsByUser
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/:tourId', createReview);
router.get('/getReviewsByUser/:id', getReviewsByUser);

export default router;
