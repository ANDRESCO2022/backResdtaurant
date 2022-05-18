const express = require('express');

// Middlewares
const { orderExists } = require('../middlewares/ordersMiddelwares');
const { mealExists } = require('../middlewares/mealsMiddlewares');
const { protectToken,protectAccountOwner} = require('../middlewares/usersMiddlewares');

const {
  createOrdersValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');
// Controller
const {
 createOrder,
 getMyOrder,
 updateOrder,
 deleteOrder,
} = require('../controllers/ordersController');

const router = express.Router();

router.use(protectToken);

router.route('/',mealExists)
.post( checkValidations, 
  createOrdersValidations, 
  createOrder);

router.patch('/:id', orderExists,  updateOrder);
router.delete('/:id',orderExists,deleteOrder)
router.get('/me', getMyOrder)
  
module.exports = { orderRouter: router };
