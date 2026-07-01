import mongoose from "mongoose";

const dbConnect = async()=>{
    try{
        // ye line smjhni h
        mongoose.connection.on('connected', ()=>console.log('database connected'))
        
        await mongoose.connect(`${process.env.MONGODB_URI}/QuickShow`)
    }catch(error){
        console.error(error);
    }
}

export default dbConnect;