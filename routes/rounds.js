const Router = require("koa-router");
const router = new Router();

const roundsCtlr = require("./../ctlrs/rounds");

// Get all rounds
router.get("/", async (ctx) => {
  console.log('get all rounds route called...');
  const rounds = await roundsCtlr.getAll();
  ctx.body = rounds;
});

// Get current round
router.get("/current", async (ctx) => {
  console.log('getCurrentRound() route called...');
  const round = await roundsCtlr.getCurrentRound();
  ctx.body = round;
  console.log('ctx.body: ', ctx.body);
});

module.exports = router.routes();
