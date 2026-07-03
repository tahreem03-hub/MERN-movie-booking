import express from 'express'
import { addShow, getNowPlayingMovies, getShow, getShows } from '../controller/showController.js';
import { protectAdmin } from '../middleware/auth.js';

// create router
const showRouter = express.Router();

// create endpoint in this router
// before controller functions we will execute middleware for authentication
showRouter.get('/now-playing',protectAdmin , getNowPlayingMovies)
showRouter.post('/add',protectAdmin , addShow)
showRouter.get('/all', getShows)
showRouter.get('/:movieId', getShow)

export default showRouter;