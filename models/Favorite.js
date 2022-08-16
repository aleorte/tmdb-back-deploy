const S = require("sequelize");
const db = require("../db");

class Favorite extends S.Model {}
Favorite.init(
  {
    userId: {
      type: S.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: S.INTEGER,
      allowNull: false,
    },
    title:{
      type: S.STRING,
      allowNull: false,
    },
    overview: {
      type: S.TEXT,
      allowNull: false,
    },
    poster_path: {
      type: S.STRING,
      allowNull: false,
    },
    vote_average:{
      type:S.DECIMAL,
      allowNull:false
    }
  },
  { sequelize: db, modelName: "favorite" }
);

module.exports = Favorite;
