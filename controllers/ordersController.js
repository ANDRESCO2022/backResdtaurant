// Models
// const { Post } = require('../models/post.model');
const { User } = require('../models/usersModels');
 const { Order } = require('../models/ordersModels');

// Utils
const { catchAsync } = require('../utils/catchAsync');


const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const newOrder = await Order.create({  quantity,mealId, userId: sessionUser.id });

  res.status(201).json({ newOrder });});



const updateOrder = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const order = await Order.findOne({ where: { id } });

   await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
  });

});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id } });

  await order.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

;

const getMyOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id, status: 'active' },
    
  });

  res.status(200).json({ orders });
});

module.exports = {
createOrder,
 getMyOrder,
 updateOrder,
 deleteOrder,
}