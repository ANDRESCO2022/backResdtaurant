const express = require('express');

// Middlewares

const {restaurantExists}= require('../middlewares/restaurantsMiddlewares')



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
  router
    .use('/reviews/:restauranId',   
     restaurantExists)
    .patch(updateReviewByRestaurantId)
    .delete(desableReviewByRestaurantId);
router
  .use('/:id', restaurantExists)
  .route('/:id')
  .get(getRestaurantById)
  .patch( protectAdmin,updateRestaurant)
  .delete(protectAdmin, deleteRestaurant);


module.exports = { restaurantRouter: router };
