const Router = require("koa-router");
const router = new Router();

const roundsCtlr = require("./../ctlrs/rounds");

// Get all rounds
router.get("/", async (ctx) => {
  const rounds = await roundsCtlr.getAll();
  ctx.body = rounds;
});

// Get current round
router.get("/current", async (ctx) => {
  const team = await roundsCtlr.getCurrentRound();
  ctx.body = team;
});

module.exports = router.routes();
