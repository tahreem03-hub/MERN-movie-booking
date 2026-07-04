import Booking from "../models/Booking.js";
import Show from "../models/Show.js"


// function to check availibility of selected seats for a show
const checkSeatAvailibility = async (showID, selectedSeats) => {
    try {
        const show = await Show.findById(showID);
        if (!show) return false

        const occupiedSeats = show.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        // return true if anySeatTaken is false and false otherwise
        return !isAnySeatTaken;

    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export const createBooking = async (req, res) => {
    try {
        const { showId, selectedSeats } = req.body;
        const { userId } = req.auth();
        const { origin } = req.headers;

        // check if seat is available for selected show
        const isAvailable = checkSeatAvailibility(showId, selectedSeats);

        if (!isAvailable) {
            res.json({ success: false, message: 'seats not available' })
        }

        //get show details
        const showData = await Show.findById(showId).populate('movie');

        //create booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        })

        // reserve the seats in the data
        selectedSeats.map(
            (seat) => {
                showData.occupiedSeats[seat] = userId
            });

        showData.markModified('occupiedSeats')
        await showData.save();

        // Stripe gateway initialize pending

        res.json({ success: true, message: 'Booking Successful' })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const getOccupiedSeats = async (req, res) => {
    try {
        const {showId} = req.params;
        const show = await Show.findById(showId);
        const occupiedSeats = Object.keys(show.occupiedSeats);
 
        res.json({ success: true, occupiedSeats})
    }
    catch (error) {
         console.log(error.message)
        res.json({ success: false, message: error.message })
    }
    
}

