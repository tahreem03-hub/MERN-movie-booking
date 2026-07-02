import express from 'express'
import { getNowPlayingMovies } from '../controller/showController.js';

// create router
const showRouter = express.Router();

// create endpoint in this router
showRouter.get('/now-playing', getNowPlayingMovies)

export default showRouter;