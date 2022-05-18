const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

// Controller
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  GetAllOrdersById,
  GetAllOrdersByUser,
  login,
  checkToken,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', checkValidations,createUserValidations , createUser);

router.post('/login', login);


router.use(protectToken);

router.get('/', getAllUsers);

router.get('/check-token', checkToken);
router.get('/orders', GetAllOrdersByUser);
router.get('/orders/:id', GetAllOrdersById)
router
  .route('/:id')
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };

