const rateLimit = require("express-rate-limit")

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
})

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
})

module.exports = { apiLimiter, authLimiter };