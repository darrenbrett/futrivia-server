const Router = require("koa-router");
const router = new Router();

const Game = require('./../models/Game');
const gamesCtlr = require("./../ctlrs/games");

// Get all games
router.get("/", async (ctx) => {
  await Game.find()
    .then((games) => {
      ctx.body = games;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

router.get("/latest", async (ctx) => {
  await Game.find()
    .sort({
      $natural: -1,
    })
    .limit(6)
    .then((games) => {
      console.log('games: ', games);
      ctx.body = games;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get a game
router.get("/:id", async (ctx) => {
  await Game.findOne()
    .then((game) => {
      ctx.body = game;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get all games by round
router.get("/seasonRound", async (ctx) => {
  await Game.find()
    .then((games) => {
      ctx.body = games;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

module.exports = router.routes();
