const express = require('express');

// Middlewares

const {restaurantExists}= require('../middlewares/restaurantsMiddlewares')
const {reviewExists}= require('../middlewares/reviewsMiddlewares')



 const { protectToken,protectAdmin } = require('../middlewares/usersMiddlewares');

 const {
   createRestaurantValidations,
   createReviewsValidations,
   checkValidations,
 } = require('../middlewares/validationsMiddlewares');
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
  .post( checkValidations,
    createRestaurantValidations,
    createRestaurant)
  .get(getAllActiveRestaurants)
  
  router.post(
    '/reviews/:restaurantId',
    createReviewsValidations,
    checkValidations,
    createReviewsByRestaurantId
  );
  router.patch('/reviews/:reviewId', updateReviewByRestaurantId)
    router.delete('/reviews/:reviewId', desableReviewByRestaurantId);
router
  .use('/:id', restaurantExists)
  .route('/:id')
  .get(getRestaurantById)
  .patch( protectAdmin,updateRestaurant)
  .delete(protectAdmin, deleteRestaurant);


module.exports = { restaurantRouter: router };
