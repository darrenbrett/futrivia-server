const Router = require("koa-router");
const router = new Router();
// const router = require('koa-router')();
// const router = new Router();

const users = require('./users');

const teamsCtrl = require("./../ctlrs/teams");
const playersCtlr = require("./../ctlrs/players");
const roundsCtlr = require("./../ctlrs/rounds");

router.use('/api/users', users);


// Player Routes ****************************

// Get all players
router.get("/api/players", async (ctx) => {
  const players = await playersCtlr.getAll();
  ctx.body = players;
});

// Get filtered players
router.post("/api/players/filter", async (ctx) => {
  await Player.find(ctx.request.body)
    .then((players) => {
      ctx.body = players;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get players by name
router.post("/api/player/name", async (ctx) => {
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
router.get("/api/players/team/:team", async (ctx) => {
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
router.get("/api/players/elite", async (ctx) => {
  const elitePlayers = await playersCtlr.getElitePlayers();
  ctx.body = elitePlayers;
});

// Get player by > aggScore
router.get("/api/players/above/:num", async (ctx) => {
  const {
    num
  } = ctx.params;
  const playersAboveNum = await playersCtlr.getPlayersAggAbove(num);
  ctx.body = playersAboveNum;
});

// Get player by < aggScore
router.get("/api/players/below/:num", async (ctx) => {
  const {
    num
  } = ctx.params;
  const playersBelowNum = await playersCtlr.getPlayersAggBelow(num);
  ctx.body = playersBelowNum;
});

// Get top scorers
router.get("/api/players/scorers", async (ctx) => {
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

// Game Routes ****************************

// Get all games
router.get("/api/games", async (ctx) => {
  await Game.find()
    .then((games) => {
      ctx.body = games;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get a game
router.get("/api/game/:id", async (ctx) => {
  await Game.findOne()
    .then((game) => {
      ctx.body = game;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get all games by round
router.get("/api/games/seasonRound", async (ctx) => {
  await Game.find()
    .then((games) => {
      ctx.body = games;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/games/latest", async (ctx) => {
  await Game.find()
    .sort({
      $natural: -1,
    })
    .limit(6)
    .then((games) => {
      ctx.body = games;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Round Routes ****************************

// Get all rounds
router.get("/api/rounds", async (ctx) => {
  const rounds = await roundsCtlr.getAll();
  ctx.body = rounds;
});

// Get current round
router.get("/api/rounds/current", async (ctx) => {
  const {
    location
  } = ctx.params;
  const team = await roundsCtlr.getCurrentRound();
  ctx.body = team;
});

// Team Routes ****************************

// Get all teams
router.get("/api/teams", async (ctx) => {
  const teams = await teamsCtrl.getAll();
  ctx.body = teams;
});

// Get team small logos
router.get("/api/teams/logos", async (ctx) => {
  const logos = await teamsCtrl.getTeamLogos();
  ctx.body = logos;
});

// Get team by location
router.get("/api/teams/:location", async (ctx) => {
  const {
    location
  } = ctx.params;
  const team = await teamsCtrl.getByLocation(location);
  ctx.body = team;
});

// Standings Routes *******************

// Get eastern conference standings
router.get("/api/standings/east", async (ctx) => {
  await Team.find({
      conference: "Eastern",
    })
    .sort({
      "season.points": -1,
      "season.goalDiff": -1,
    })
    .populate("roster", ["fullName", "position"])
    .then((teams) => {
      ctx.body = teams;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get western conference standings
router.get("/api/standings/west", async (ctx) => {
  await Team.find({
      conference: "Western",
    })
    .sort({
      "season.points": -1,
      "season.goalDiff": -1,
    })
    .populate("roster", ["fullName", "position"])
    .then((teams) => {
      ctx.body = teams;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

// Get overall standings
router.get("/api/standings/overall", async (ctx) => {
  await Team.find()
    .sort({
      "season.points": -1,
      "season.goalDiff": -1,
    })
    .populate("roster", ["fullName", "position"])
    .then((teams) => {
      ctx.body = teams;
    })
    .catch((err) => {
      ctx.body = "Error: " + err;
    });
});

module.exports = router;
