import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useAuth, useUser } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

{/* we will create it using create context hook imported from react */ }
export const AppContext = createContext()

export const AppProvider = ({ children }) => {


    {/* we have to call the API (using axios) using that we will get the isAdmin value whether it is true or false */ }
    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favouriteMovies, setFavouriteMovies] = useState([])

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()


    {/* will be executed when we open the web page and whenever the user changes */ }
    const fetchIsAdmin = async () => {
        try {
            // in headers we have to authorize the user
            const { data } = await axios.get('/api/admin/is-admin', {
                headers:
                    { Authorization: `Bearer ${await getToken()}` }
            })

            setIsAdmin(data.isAdmin)

            {/* if the user is not admin an trying to open path /admin redirect him to home page */ }
            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error("You are not authorized to access admin dashboard.")
            }

        } catch (error) {
            console.log(error)
        }
    }

    {/* add a function using that we can fetch the shows 
    we will execute this function whenever we will load this page*/}
    const fetchShows = async () => {
        try {
            const { data } = await axios.get("/api/show/all")
            if (data.success) {
                setShows(data.shows)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    {/*fetch the favourite movies for the user
    we will execute this function whenever the user is logged in*/}
    const fetchFavouriteMovies = async () => {
        try {
            const { data } = await axios.get("/api/user/favourites", {
                headers:
                    { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setFavouriteMovies(data.movies)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        {/*when the user is available then it will call this function*/ }
        if (user) {
            fetchIsAdmin()
            fetchFavouriteMovies()
        }
    }, [user])

    useEffect(() => {
        fetchShows()
    }, [])


    const value = { 
        axios, 
        fetchIsAdmin,
        user, getToken, navigate, isAdmin, shows,
        favouriteMovies, fetchFavouriteMovies
    }
    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
    )
}

{/* Now to access this context in another file here we'll create a function*/ }
export const useAppContext = () => {
    useContext(AppContext)
}