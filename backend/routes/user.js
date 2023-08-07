import express from 'express';
import {
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser
} from '../controllers/userController.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// create new tour
router.post('/', verifyUser, createUser);

// update new User
router.put('/:id', verifyUser, updateUser);

// delete new User
router.delete('/:id', verifyUser, deleteUser);

// get a User
router.get('/:id', verifyUser, getSingleUser);

// get all User
router.get('/', verifyAdmin, getAllUser);

export default router;
