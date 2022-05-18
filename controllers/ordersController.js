// Models
const { Meal } = require('../models/mealsModels');
const { User } = require('../models/usersModels');
const { Order } = require('../models/ordersModels');
const { Restaurant } = require('../models/restaurantsModels');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const mealPrice = await Meal.findOne({
    where: { id: mealId },
  });

  let totalOrder = quantity * mealPrice.price;

  const newOrder = await Order.create({
    quantity,
    mealId,
    totalPrice: totalOrder,
    userId: sessionUser.id,
  });

  res.status(201).json({ newOrder });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({ where: { id } });

  await order.update({ status: 'completed' });

  res.status(200).json({ status: 'success' });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id } });

  await order.update({ status: 'canceled' });

  res.status(200).json({
    status: 'success',
  });
});

const getMyOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [{ model: Restaurant, attributes: ['name'] }],
      },
    ],
  });

  res.status(200).json({ orders });
});

module.exports = {
  createOrder,
  getMyOrder,
  updateOrder,
  deleteOrder,
};
