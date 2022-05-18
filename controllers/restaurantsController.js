const { Restaurant } = require('../models/restaurantsModels');
const { Review } = require('../models/reviewsModels');
const { catchAsync } = require('../utils/catchAsync');

const getAllActiveRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
  });

  res.status(200).json({
    restaurants,
  });
});
const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({ newRestaurant });
});
const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, addres } = req.body;

  await restaurant.update({ name, addres });

  res.status(200).json({ status: 'success' });
});
const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});
const createReviewsByRestaurantId = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurantId } = req.params;
  const { sessionUser } = req;

  const newReview = await Review.create({
    comment,
    rating,
    restaurantId,
    userId: sessionUser.id,
  });
  res.status(200).json({ newReview });
});
const updateReviewByRestaurantId =  catchAsync(async (req, res, next) => {
  const { comment, rating} = req.body;
  const { restaurantId } = req.params;
    const { sessionUser } = req;

const review = await Review.findOne({ where: { restaurantId } });

  console.log(review);

  await review.update({ 
    comment, 
    rating,
     userId: sessionUser.id,
  });

  res.status(200).json({ status: 'success' });
});
const desableReviewByRestaurantId = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllActiveRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReviewsByRestaurantId,
  updateReviewByRestaurantId,
  desableReviewByRestaurantId,
};
