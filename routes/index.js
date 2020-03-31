const Router = require("koa-router");
const router = new Router();
const Player = require("./../models/Player");
const Game = require("./../models/Game");
const Team = require("./../models/Team");
const Round = require("./../models/Round");

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

// Get players by team
router.get("/api/players/team/:team", async (ctx) => {
  const {
    team
  } = ctx.params;
  await Player.find({
      currentTeam: team
    })
    .then(players => {
      ctx.body = players;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

// Get players by team
router.get("/api/players/position/:position", async (ctx) => {
  const {
    position
  } = ctx.params;
  await Player.find({
      position: position
    })
    .then(players => {
      ctx.body = players;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

// Get elite players - aggScore > 9
router.get("/api/players/elite", async (ctx) => {
  console.log(ctx.params);
  await Player.find({
      aggScore: {
        $gt: 9
      }
    }).sort({
      aggScore: -1
    })
    .then(players => {
      ctx.body = players;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

// Get player by > aggScore
router.get("/api/players/above/:num", async (ctx) => {
  const {
    num
  } = ctx.params;
  await Player.find({
      aggScore: {
        $gt: parseFloat(num)
      }
    }).sort({
      aggScore: -1
    })
    .then(players => {
      ctx.body = players;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});


// Get player by < aggScore
router.get("/api/players/below/:num", async (ctx) => {
  const {
    num
  } = ctx.params;
  await Player.find({
      aggScore: {
        $lt: parseFloat(num)
      }
    }).sort({
      aggScore: -1
    })
    .then(players => {
      ctx.body = players;
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

router.get("/api/teams", async ctx => {
  await Team.find()
    .then(teams => {
      ctx.body = teams;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/team/:id", async (ctx) => {
  await Team.findOne()
    .then(team => {
      ctx.body = team;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/rounds", async ctx => {
  await Round.find()
    .then(rounds => {
      ctx.body = rounds;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});

router.get("/api/round/:id", async (ctx) => {
  await Round.findOne()
    .then(round => {
      ctx.body = round;
    })
    .catch(err => {
      ctx.body = "Error: " + err;
    });
});


module.exports = router;
