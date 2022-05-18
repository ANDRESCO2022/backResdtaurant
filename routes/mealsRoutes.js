const express = require('express');

const { mealsExists } = require('../middlewares/mealsMiddlewares');
const { protectToken,protectAdmin} = require('../middlewares/usersMiddlewares');

const {
  createMealsValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

const {
    createMeals,
    getAllMeals,
  getMealById,
  updateMealsById,
  deleteMeals,
} = require('../controllers/mealsController');

const router = express.Router();
router.use(protectToken);
router.post(
  '/:restaurantId',
  createMealsValidations,
  checkValidations,
  createMeals
);


router.route('/').get(getAllMeals)



router
  .use('/:id', mealsExists)
  .route('/:id')
  .get(getMealById)
  .patch(protectAdmin, updateMealsById)
  .delete(protectAdmin, deleteMeals);

module.exports = { mealRouter: router };
