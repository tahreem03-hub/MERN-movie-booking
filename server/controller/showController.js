// this function will fetch movie data from TMDB and send it in response

import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

//api to get now playing movies from tmdb
export const getNowPlayingMovies = async (req, res) => {
    try {
        // we got this api end point from TMBD when ever we wil hit this api 
        // end point we willl get now playing movie list

        // we will get response from this api call whcih we will store in data object
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        })

        const movies = data.results;
        res.json({ success: true, movies: movies })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// api to add a new show to the db
export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;
        // we will find if movie is already in database
        let movie = await Movie.findById(movieId);

        // if movie is not in database fetch 
        // movie and credits from TMDB and add in db
        if (!movie) {
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                }),
                await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                })
            ]);
            // ye . data smjh nhi aya oper walay controller mn .results tha ?????????
            const movieApiData = movieDetailsResponse.data;
            const movieCreditData = movieCreditsResponse.data;

            // create object to add in db
            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                genres: movieApiData.genres,
                cast: movieCreditData.cast,
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime

            }
            // add movie in db
            // YE create func kuch return bhi krta h????????
            movie = await Movie.create(movieDetails);
        }
        ///??????????????????????????????????????????????
        const showsToCreate = []
        showsInput.forEach(show => {
            const showDate = show.date
            show.time.forEach(time => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                })
            })
        });

        if (showsToCreate.length > 0) {
          await  Show.insertMany(showsToCreate);
        }

        res.json({ success: true, message: 'shows added successfully' })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }


}