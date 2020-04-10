const Router = require("koa-router");
const router = new Router();

// Get all players
const Player = require("./../models/Player");

router.get("/api/players", async ctx => {
  await Player.find()
    .then(players => {
      ctx.body = players;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

module.exports = {
  router
};
