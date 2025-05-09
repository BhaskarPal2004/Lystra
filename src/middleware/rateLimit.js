import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 minutes
  limit: 5,
  message: "Too many request please try after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false
})

export default limiter