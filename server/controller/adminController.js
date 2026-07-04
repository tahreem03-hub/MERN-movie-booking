
import Booking from "../models/Booking.js"
import Show from "../models/Show.js"
import User from "../models/User.js"

// this controller when run it wil first run middleware protectAdmin which will automatically 


// API to check if user is admin or not
export const isAdmin = async (req, res) => {
    try {
        res.json({ success: true, message: "Admin" })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: "Not admin" })
    }
}

//API to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        // we will fetch only upcoming shows (greater than current date)
        const activeShows = await Show.find({ showDateTime: { $gte: new Date() } });

        const totalUsers = await User.countDocuments();

        // for total booking and total revenue 
        // are we counting only booking that have status paid?
        const bookings = await Booking.find({ isPiad: true })

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
            activeShows,
            totalUsers,
        }

        res.json({ success: true, dashboardData });
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

export const getAllShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie').sort({ showDateTime: 1 })
        res.json({ success: true, shows });
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate({
            path: 'show',
            populate: { path: "movie" }
        }).sort({ createdAt: -1 })

        res.json({ success: true, bookings });

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

