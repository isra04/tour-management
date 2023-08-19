import Review from '../models/Review.js';
import Tour from '../models/Tour.js';

export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });
    try {
        const savedReview = await newReview.save();
        // after creating a new review now update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        });
        res.status(200).json({
            success: true,
            message: 'Review submitted',
            data: savedReview
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'failed to submit' });
    }
};

export const getReviewsByUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const reviews = await Review.find({
            userId: userId
        });
        res.status(200).json({
            status: true,
            message: 'successful',
            data: reviews
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            message: 'not found'
        });
    }
};
