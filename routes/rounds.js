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
  const round = await roundsCtlr.getCurrentRound();
  ctx.body = round;
  console.log('ctx.body: ', ctx.body);
});

// Get filtered round
router.post("/filtered", async (ctx) => {
  const round = await roundsCtlr.getFilteredRound();
  ctx.body = round;
  console.log('ctx.body: ', ctx.body);
});

module.exports = router.routes();
