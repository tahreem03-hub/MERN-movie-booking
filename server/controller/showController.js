// this function will fetch movie data from TMDB and send it in response

export const getNowPlaywingMovies= async(req, res)=>{
    try {
        // we got this api end point from TMBD when ever we wil hit this api 
        // end point we willl get now playing movie list

        // we will get response from this api call whcih we will store in data object

        const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
            header: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
        })

        const movies = data.result;
        res.json({success:true, movies:movies})
        
    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}