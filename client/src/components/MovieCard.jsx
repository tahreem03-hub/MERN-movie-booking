import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StarIcon } from 'lucide-react'

const MovieCard = ({movie}) => {

    const navigate=useNavigate()


    {/* no need of h in parent div Because you're using flex flex-col justify-between — the card's height is being driven by its content, not a fixed value. */}
    return (

        <div className=' flex flex-col justify-between p-3
        bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
            <img onClick={()=>{navigate(`/movies/${movie._id}`); scrollTo(0,0)}} 
            src={movie.backdrop_path}
                alt="" className=' h-52 w-full rounded-lg object-cover object-right-bottom cursor-pointer' />
            <div className='pl-4'>

                <p className='font-semibold mt-2 truncate'>{movie.title}</p>
                <p className='text-gray-400 text-sm mt-2'>
                    {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map
                    (genre => genre.name).join(" | ")} • {movie.runtime}
                    </p>

                <div className='flex items-center justify-between mt-4 pb-3'>
                    <button 
                    onClick={()=>{navigate(`/movies/${movie._id}`); scrollTo(0,0)}}
                    className='bg-primary hover:bg-primary-dull rounded-full px-4 py-2 text-xs transition font-medium cursor-pointer'>Buy Now</button>
                    <p className='flex items-center gap-1 text-xs text-gray-400 mt-1 pr-1'>
                        <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                        {movie.vote_average.toFixed(1)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
