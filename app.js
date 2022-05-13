const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { globalErrorHandler } = require('./controllers/errorsController');

// Routers
const { usersRouter } = require('./routes/usersRouters');
const { orderRouter } = require('./routes/ordersRouters');
const { restaurantRouter } = require('./routes/restaurantsRoutes');
const { mealRouter } = require('./routes/mealsRoutes');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());
const limiter = rateLimit({
  max: 1000,
  windowMs: 1 * 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});

app.use(limiter);


app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/meals', mealRouter);
app.use('*', globalErrorHandler);

module.exports = { app };
