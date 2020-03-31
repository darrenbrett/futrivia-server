const Router = require("koa-router");
const router = new Router();
const Player = require("./../models/Player");
const Game = require("./../models/Game");

router.get("/api/players", async ctx => {
  await Player.find()
    .then(players => {
      ctx.body = players;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/player/:id", async (ctx) => {
  await Player.findOne()
    .then(player => {
      ctx.body = player;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/games", async ctx => {
  await Game.find()
    .then(games => {
      ctx.body = games;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/game/:id", async (ctx) => {
  await Game.findOne()
    .then(game => {
      ctx.body = game;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

module.exports = router;
