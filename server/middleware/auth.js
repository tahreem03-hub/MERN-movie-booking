import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = req.auth();
        
        const user = clerkClient.users.getUser(userId)
        if ((await user).privateMetadata.role !== 'admin') {
            res.json({ success: false, message: 'Unauthorized access' })
        }
        next();
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}