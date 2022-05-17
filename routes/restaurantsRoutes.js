const express = require('express');

// Middlewares

const {restaurantExists}= require('../middlewares/restaurantsMiddlewares')

 const { protectToken } = require('../middlewares/usersMiddlewares');

// // Controller
 const {
   getAllActiveRestaurants,
   createRestaurant,
   getRestaurantById,
   updateRestaurant,
   deleteRestaurant,
   createReviewsByRestaurantId,
   updateReviewByRestaurantId,
   desableReviewByRestaurantId,
 } = require('../controllers/restaurantsController');


const router = express.Router();
router.use(protectToken);

router  
  .route('/')
  .post(createRestaurant)
  .get(getAllActiveRestaurants)

router
.use('/:id', restaurantExists)
.route('/:id')
.get(getRestaurantById)
.patch(updateRestaurant)
.delete(deleteRestaurant);
router.post('/reviews/:id',createReviewsByRestaurantId);
router
.use('/reviews/restauranId/:id',restaurantExists )
.patch(updateReviewByRestaurantId)
.delete(desableReviewByRestaurantId);


module.exports = { restaurantRouter: router };
