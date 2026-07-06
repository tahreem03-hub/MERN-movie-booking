import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dbConnect from './configs/db.js';

import { clerkMiddleware } from '@clerk/express'


import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoute.js';

const app=express();
const port=3000;



// why await added here when it was already there in function def
await dbConnect();

//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// creation of first api route (home route)
app.get('/', (req, res)=> res.send("server is live"))
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=>console.log(`server listening at http://localhost:${port}/`))

