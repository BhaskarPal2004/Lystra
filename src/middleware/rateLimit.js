import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  limit: 10,
  message:"Too many request",
  standardHeaders: true,
  legacyHeaders: false
})

export default limiter