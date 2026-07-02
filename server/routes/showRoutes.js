import express from 'express'
import { addShow, getNowPlayingMovies } from '../controller/showController.js';
import { protectAdmin } from '../middleware/auth.js';

// create router
const showRouter = express.Router();

// create endpoint in this router
// before controller functions we will execute middleware for authentication
showRouter.get('/now-playing',protectAdmin , getNowPlayingMovies)
showRouter.post('/add',protectAdmin , addShow)

export default showRouter;