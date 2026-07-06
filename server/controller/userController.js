import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";


// API controller function to get booking of a user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth().userId

        const bookings = await Booking.find({ user }).populate({
            path: "Show",
            populate: { path: "movie" }
        }).sort({ createdAt: -1 })

        res.json({ succes: true, bookings })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

// API controller function to update favourite movie in clerk user meta data
export const updateFavourites = async (req, res) => {
    try {
        const { movieId } = req.body;
        
        // get logged in user's id
        const userId = req.auth().userId
        // get user object to access its metadata
        const user = await clerkClient.users.getUser(userId)

        if (!user.privateMetadata.favourites) {
            user.privateMetadata.favourites = [];
        }

        if (!user.privateMetadata.favourites.includes(movieId)) {
            user.privateMetadata.favourites.push(movieId);
        }else{  // if movie is already in favourites wee will remove it from favourites
            user.privateMetadata.favourites = user.privateMetadata.favourites.filter( item => item !=movieId )
        }

        await clerkClient.users.updateUserMetadata(userId, { privateMetadata: user.privateMetadata })

        res.json({ succes: true, message: 'Favourite Added Successfully' })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

export const getFavourites = async (req, res) => {
    try {
        const user = await clerkClient.users.getUser(req.auth().userId);
        const favourites = user.privateMetadata.favourites;

        // getting movies from database using movie id
        //it will provide all these movies that is available in this favorites
        const movies = await Movie.find({_id: {$in: favourites}})

        res.json({success:true, movies})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}

