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

router.get('/me', getMyOrder)
router.patch('/:id',protectAccountOwner, updateOrder)



router.delete('/:id',protectAccountOwner, deleteOrder)
  
module.exports = { orderRouter: router };
