 const { Meal } = require('../models/mealsModels');
 const { Restaurant } = require('../models/restaurantsModels');


 const { catchAsync } = require('../utils/catchAsync');

 const getAllMeals = catchAsync(async (req, res, next) => {
   const meals = await Meal.findAll({
     where: { status: 'active' },
     include: [
       {
         model: Restaurant,
     
          },
     ],
   });

   res.status(200).json({ meals });
 });

 const createMeals = catchAsync(async (req, res, next) => {
   const { name, price } = req.body;
   const { restaurantId } = req.params;
   

   const newMeal = await Meal.create({ 
     name,
     price, 
     restaurantId
   
     });

   res.status(201).json({ newMeal });
 });

 const getMealById = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const meal = await Meal.findOne({ where: { id },
   include: [
       {
         model: Restaurant,
     
          },
     ],
  });

   res.status(200).json({
     meal,
   });
 });

 const updateMealsById = catchAsync(async (req, res, next) => {
   const { meal } = req;
   const { name, price } = req.body;

   await meal.update({ name, price });

   res.status(200).json({ status: 'success' });
 });

 const deleteMeals = catchAsync(async (req, res, next) => {
   const { meal } = req;

   await meal.update({ status: 'deleted' });
   res.status(200).json({
     status: 'success',
   });
 });

 module.exports = {
   createMeals,
   getAllMeals,
   getMealById,
   updateMealsById,
   deleteMeals,
 };