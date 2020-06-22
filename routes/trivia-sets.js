const Router = require("koa-router");
const router = new Router();

const triviaSetsCtlr = require("./../ctlrs/trivia-sets");

// Get all users
router.get("/", async (ctx) => {
  const users = await triviaSetsCtlr.getAll();
  ctx.body = users;
});

// Get sets for each topic
router.get("/topics/all", async (ctx) => {
  const {
    topic
  } = ctx.params;
  const setsPerUniqueTopics = await triviaSetsCtlr.getSetsForUniqueTopics();
  ctx.body = setsPerUniqueTopics;
});

// Get sets for a topic
router.get("/topic-sets/:topic", async (ctx) => {
  const {
    topic
  } = ctx.params;
  const setsForTopic = await triviaSetsCtlr.getAvailableSetsPerTopic(topic);
  ctx.body = setsForTopic;
});

module.exports = router.routes();