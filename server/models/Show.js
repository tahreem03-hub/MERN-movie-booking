import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
    {
        // here we have added reference of movie model
        movie: {type: String, required:true, ref:'Movie'},
        showDateTime: {type: Date, required:true},
        showPrice: {type:Number, required:true},
        occupiedSeats: {type: Object, default: {}},
    }, {minimize:false}
    // without minimize: false, Mongoose removes empty objects.
)

const Show=mongoose.model('Show', showSchema)
export default Show;