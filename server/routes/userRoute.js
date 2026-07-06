import express from 'express'
import {  getFavourites, getUserBookings, updateFavourites } from '../controller/userController.js';


const userRouter = express.Router();

userRouter.get('/my-bookings', getUserBookings)
userRouter.get('/favourites', getFavourites);
userRouter.post('/update-favourite', updateFavourites);


export default userRouter;