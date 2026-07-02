// this function will fetch movie data from TMDB and send it in response

import axios from "axios";

export const getNowPlayingMovies= async(req, res)=>{
    try {
        // we got this api end point from TMBD when ever we wil hit this api 
        // end point we willl get now playing movie list

        // we will get response from this api call whcih we will store in data object
        const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
            headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
             accept: "application/json"
            }
        })

        const movies = data.results;
        res.json({success:true, movies:movies})
        
    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}