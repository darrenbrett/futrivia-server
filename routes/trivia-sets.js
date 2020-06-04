const Router = require("koa-router");
const router = new Router();

const triviaSetsCtlr = require("./../ctlrs/trivia-sets");

// Get all users
router.get("/", async (ctx) => {
  const users = await triviaSetsCtlr.getAll();
  ctx.body = users;
});
