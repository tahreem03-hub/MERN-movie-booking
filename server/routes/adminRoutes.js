import express from 'express'
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controller/adminController.js'
import { protectAdmin } from '../middleware/auth.js';


const adminRouter = express.Router()

adminRouter('/is-admin', protectAdmin, isAdmin);
adminRouter('/dashboard', protectAdmin, getDashboardData);
adminRouter('/all-shows', protectAdmin, getAllShows);
adminRouter('/all-bookings', protectAdmin, getAllBookings);

export default adminRouter;

