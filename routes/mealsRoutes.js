const express = require('express');

const { mealsExists } = require('../middlewares/mealsMiddlewares');
const { protectToken } = require('../middlewares/usersMiddlewares');


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
  createMeals
);


router.route('/').get(getAllMeals)



router
  .use('/:id', mealsExists)
  .route('/:id')
  .get(getMealById)
  .patch(updateMealsById)
  .delete(deleteMeals);

module.exports = { mealRouter: router };
