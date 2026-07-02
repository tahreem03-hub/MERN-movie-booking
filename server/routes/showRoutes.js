import express from 'express'
import { getNowPlaywingMovies } from '../controller/showController';

// create router
const showRouter = express.Router();

// create endpoint in this router

showRouter('/now-playing', getNowPlaywingMovies)

export default showRouter;