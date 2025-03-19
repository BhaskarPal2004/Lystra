import authRoute from './authRoutes.js';
import userRoute from './userRoutes.js';
import adRoute from './adRoutes.js';
import sellerRoute from './sellerRoutes.js';
import reviewRoute from './reviewRoutes.js';
import buyerRoute from './buyerRoutes.js';
import subscriptionRoute from './subscriptionRoutes.js';
import orderRoute from './orderRoutes.js';
import paymentRoute from './paymentRoute.js';
import otpRouter from './otpRoutes.js';
import chatRoute from './chatRoutes.js';
import followRoute from './followRoute.js';


const routes = (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/user', userRoute);
    app.use('/api/buyer', buyerRoute);
    app.use('/api/seller', sellerRoute);
    app.use('/api/ad', adRoute);
    app.use('/api/review', reviewRoute);
    app.use('/api/payment', paymentRoute);
    app.use('/api/subscription', subscriptionRoute);
    app.use('/api/order', orderRoute);
    app.use('/api/otp', otpRouter);
    app.use('/api/chat', chatRoute);
    app.use('/api/follow',followRoute);
};

export default routes;