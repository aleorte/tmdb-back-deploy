const express = require("express");
const { Favorite, User } = require("../models");
const userFavorite = express.Router();

userFavorite.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userFav = await Favorite.findAll({ where: { userId } });
    console.log(userFav);
    return res.status(200).send(userFav);
  } catch (error) {
    return res.sendStatus(404);
  }
});

userFavorite.post("/add", async (req, res) => {
  try {
    console.log(req.body)
    const { userId, movieId, title, poster_path, overview, vote_average } = req.body;
    await Favorite.findOrCreate({
      where: { movieId, userId },
      defaults: { userId, movieId, title, poster_path, overview, vote_average },
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error)
    return res.status(404).send({ message: "No se pudo añadir a favoritos" });
  }
});

userFavorite.delete("/remove/:userId/:movieId", async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    await Favorite.destroy({
      where: { userId, movieId },
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error)
    return error;
  }
});

// userFavorite.delete("/remove" ,(req,res)=>{
//   const { userId,movieId} = req.body;
//   Favorite.destroy({where:{movieId,userId}})
//   .then(()=>res.sendStatus(200))
//   .catch((err)=>console.log(err))
// })

module.exports = userFavorite;
