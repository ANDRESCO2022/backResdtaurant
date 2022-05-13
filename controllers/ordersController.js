// Models
// const { Post } = require('../models/post.model');
const { User } = require('../models/usersModels');
 const { Order } = require('../models/ordersModels');

// Utils
const { catchAsync } = require('../utils/catchAsync');


const createOrder = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const { sessionUser } = req;

  const newPost = await Post.create({ title, content, userId: sessionUser.id });

  res.status(201).json({ newPost });
});



const updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findOne({ where: { id } });

  await post.update({ title, content });

  res.status(200).json({ status: 'success' });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id } });

  await post.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

;

const getMyOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const posts = await Post.findAll({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] },
      },
    ],
  });

  res.status(200).json({ posts });
});

module.exports = {
createOrder,
 getMyOrder,
 updateOrder,
 deleteOrder,
}