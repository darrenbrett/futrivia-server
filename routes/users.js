const Router = require("koa-router");
const router = new Router();

const usersCtlr = require("./../ctlrs/users");

// Get all users
router.get("/", async (ctx) => {
  const users = await usersCtlr.getAll();
  ctx.body = users;
});

// Get a user by username
router.get("/stats/:username", async (ctx) => {
  const {
    username
  } = ctx.params;
  const user = await usersCtlr.getUser(username);
  ctx.body = user;
});

// Create a new user
router.post("/signup", async (ctx) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  const response = await usersCtlr.create(email, password);
  if (response === "duplicate") {
    ctx.body = {
      message: "This email address already exists",
    };
    ctx.body.status = 409;
  } else {
    ctx.body = {
      message: "New user created successfully!",
    };
    ctx.body.status = 200;
  }
});

// Login a user
router.post("/login", async (ctx) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  let loginResponse = await usersCtlr.login(email, password);
  if (loginResponse == "Auth failed") {
    ctx.body = {
      message: "Auth failed",
    };
    return ctx.body;
  }
  ctx.body = loginResponse;
});

// Update last completed trivia set for a user
router.post("/update-user-stats", async (ctx) => {
  const username = ctx.request.body.username;
  const lastCompletedSet = ctx.request.body.lastCompletedSet;
  const lastCompletedTopic = ctx.request.body.lastCompletedTopic;
  const pointsToAdd = ctx.request.body.pointsToAdd;
  try {
    let updateResponse = await usersCtlr.updateStats(username, lastCompletedSet, lastCompletedTopic, pointsToAdd);
    ctx.body = updateResponse;
  } catch (error) {
    ctx.body = {
      error: error,
      message: "Error saving players stats update",
    };
  }
});

// Update last completed trivia set for a user
router.post("/update-user-bonus", async (ctx) => {
  const username = ctx.request.body.username;
  const result = ctx.request.body.qResult;
  try {
    let updateResponse = await usersCtlr.updateBonusStats(username, result);
    ctx.body = updateResponse;
  } catch (error) {
    ctx.body = {
      error: error,
      message: "Error saving players stats update",
    };
  }
});


// Get next trivia set for a given user
router.get("/next-set/:username/:topic", async (ctx) => {
  const {
    username
  } = ctx.params;
  const {
    topic
  } = ctx.params;
  const nextTriviaSet = await usersCtlr.getNextTriviaSet(username, topic);
  ctx.body = nextTriviaSet;
});

// Get next bonus question for a given user
router.get("/next-bonus/:username", async (ctx) => {
  const {
    username
  } = ctx.params;
  const nextBonusQuestion = await usersCtlr.getNextBonusQuestion(username);
  ctx.body = nextBonusQuestion;
});

// Get number of available sets for a given topic
router.get("/topic-sets-available/:username", async (ctx) => {
  const {
    username
  } = ctx.params;
  const topicSetsAvailable = await usersCtlr.userTopicsSetsAvailable(username);
  ctx.body = topicSetsAvailable;
});

// Get ranked users
router.get("/standings/:username", async (ctx) => {
  const {
    username
  } = ctx.params;
  const rankedUsers = await usersCtlr.getStandingsPerLevel(username);
  ctx.body = rankedUsers;
});

// Reset user
router.get("/reset/:username", async (ctx) => {
  const {
    username
  } = ctx.params;
  const resetUser = await usersCtlr.resetUser(username);
  ctx.body = resetUser;
});

module.exports = router.routes();