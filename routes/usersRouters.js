const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddlewares');

// Controller
const {
  getAllUsers,
  createUser,
 // getUserById,
  updateUser,
  deleteUser,
  GetAllOrdersById,
  GetAllOrdersByUser,
  login,
  checkToken,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllUsers);

router.get('/check-token', checkToken);
router.get('/orders',GetAllOrdersByUser);
router.get('/orders/:id', GetAllOrdersById)
router
  .route('/:id')
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
