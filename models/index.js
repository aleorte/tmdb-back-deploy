const User = require ("./User")
const Favorite= require ("./Favorite")

User.belongsToMany(Favorite, {through: 'user_to_favorite'})


module.exports = {User, Favorite}