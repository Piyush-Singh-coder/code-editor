import { RateLimiterMemory } from "rate-limiter-flexible";

const userLimiter = new RateLimiterMemory({
    points: 10, // 10 requests
    duration: 60, // per 60 seconds
})

export const userRateLimiter = async (req, res, next) => {
    try {
        await userLimiter.consume(req.userId);
        next();
    } catch {
        console.log("Error in rate limiter middleware");

        res.status(429).json({message: "Too many executions, please slow down"
        });
    }
}