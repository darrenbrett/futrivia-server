const Router = require("koa-router");
const router = new Router();

const playersCtlr = require("./../ctlrs/players");

// Get all players
router.get("/", async (ctx) => {
  const players = await playersCtlr.getAll();
  ctx.body = players;
});

// Get filtered players
router.post("/filter", async (ctx) => {
  await Player.find(ctx.request.body)
    .then((players) => {
      ctx.body = players;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get players by name
router.post("/name", async (ctx) => {
  await Player.findOne(ctx.request.body)
    .then((player) => {
      ctx.body = player;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get a player
router.get("/api/player/:id", async (ctx) => {
  await Player.findOne()
    .then((player) => {
      ctx.body = player;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get players by team
router.get("/team/:team", async (ctx) => {
  const {
    team
  } = ctx.params;
  const teamPlayers = await playersCtlr.getPlayersPerTeam(team);
  ctx.body = teamPlayers;
});

// Get players by position
router.get("/api/players/position/:position", async (ctx) => {
  const {
    position
  } = ctx.params;
  const players = await playersCtlr.getPlayersByPosition(position);
  ctx.body = players;
});

// Get elite players - aggScore > 9
router.get("/elite", async (ctx) => {
  const elitePlayers = await playersCtlr.getElitePlayers();
  ctx.body = elitePlayers;
});

// Get player by > aggScore
router.get("/above/:num", async (ctx) => {
  const {
    num
  } = ctx.params;
  const playersAboveNum = await playersCtlr.getPlayersAggAbove(num);
  ctx.body = playersAboveNum;
});

// Get player by < aggScore
router.get("/below/:num", async (ctx) => {
  const {
    num
  } = ctx.params;
  const playersBelowNum = await playersCtlr.getPlayersAggBelow(num);
  ctx.body = playersBelowNum;
});

// Get top scorers
router.get("/scorers", async (ctx) => {
  console.log(ctx.params);
  await Player.find({
      "goals.year": {
        $exists: true,
      },
    })
    .sort({
      "goals.year": -1,
    })
    .then((players) => {
      ctx.body = players;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

module.exports = router.routes();
