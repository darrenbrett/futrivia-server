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

// Save user predictions
router.post("/predictions", async (ctx) => {
  const userId = ctx.request.body.userId;
  const predictionObj = {
    year: ctx.request.body.year.toString(),
    round: ctx.request.body.round.toString(),
    completed: ctx.request.body.completed,
    predictions: ctx.request.body.predictions,
  };
  try {
    let loginResponse = await usersCtlr.savePredictions(userId, predictionObj);
    ctx.body = loginResponse;
  } catch (error) {
    ctx.body = {
      error: error,
      message: "Error saving user predictions",
    };
  }
});

// Update last completed trivia set for a user
router.post("/update-user-stats", async (ctx) => {
  const username = ctx.request.body.username;
  const lastCompletedSet = ctx.request.body.lastCompletedSet;
  const pointsToAdd = ctx.request.body.pointsToAdd;
  try {
    let updateResponse = await usersCtlr.updateStats(username, lastCompletedSet, pointsToAdd);
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
  const lastCompletedBonusId = ctx.request.body.lastCompletedBonusId;
  const result = ctx.request.body.qResult;
  try {
    let updateResponse = await usersCtlr.updateBonusStats(username, lastCompletedBonusId, result);
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

// Get ranked users
router.get("/standings/:username", async (ctx) => {
  const {
    username
  } = ctx.params;
  const rankedUsers = await usersCtlr.getStandingsPerLevel(username);
  ctx.body = rankedUsers;
});

module.exports = router.routes();