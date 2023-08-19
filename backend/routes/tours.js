import express from 'express';
import {
    createTour,
    deleteTour,
    getAllTour,
    getFeaturedTour,
    getSingleTour,
    getTourBySearch,
    updateTour,
    getTourCount,
    getAllCities
} from '../controllers/tourController.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create new tour
router.post('/', verifyAdmin, createTour);

// update new tour
router.put('/:id', verifyAdmin, updateTour);

// delete new tour
router.delete('/:id', verifyAdmin, deleteTour);

// get a tour
router.get('/:id', getSingleTour);

// get all tours
router.get('/', getAllTour);

// get all distinct cities
router.get('/search/getAllCities', getAllCities);

// search tour
router.get('/search/getTourBySearch', getTourBySearch);

// get featured tour
router.get('/search/getFeaturedTour', getFeaturedTour);

router.get('/search/getTourCount', getTourCount);

export default router;
