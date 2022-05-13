
const { Restaurant } = require('../models/restaurantsModels');
const { Review } = require('../models/reviewsModels');
const { catchAsync } = require('../utils/catchAsync');

const getAllRestaurant = catchAsync(async (req, res, next) => {
 

  res.status(200).json({
    posts,
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  
  res.status(201).json({ newPost });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
 
  res.status(200).json({
    post,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
 

  res.status(200).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {


  res.status(200).json({
    status: 'success',
  });
});
 const createReviewsById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});
 const updateReviewByRestaurantId= catchAsync(async (req, res, next) => {


  res.status(200).json({
    status: 'success',
  });
}); 
const desableReviewByRestaurantId = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});


module.exports = {
  getAllRestaurant,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReviewsById,
  updateReviewByRestaurantId,
  desableReviewByRestaurantId,
};
