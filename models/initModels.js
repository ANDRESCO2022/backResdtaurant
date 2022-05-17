
const { User } = require('./usersModels');
const { Order } = require('./ordersModels');
const { Review } = require('./reviewsModels')
const { Restaurant } = require('./restaurantsModels')
const { Meal} = require('./mealsModels')
const initModels = () => {
  //user to  orders ___________
  User.hasOne(Order);
  Order.belongsTo(User);
  //meals to  orders ___________
  Order.hasOne(Meal)
  Meal.belongsTo(Order);

  //========user to reviews=======
  User.hasMany(Review);
  Review.belongsTo(User);

  //======restaurant to meals====
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);
  //======restaurant to reviewss====
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);
};

module.exports = { initModels };
