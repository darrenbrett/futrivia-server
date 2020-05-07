const Router = require("koa-router");
const router = new Router();

const usersCtlr = require("./../ctlrs/users");

// Get all users
router.get("/", async (ctx) => {
  const users = await usersCtlr.getAll();
  ctx.body = users;
});

// Get current round predictions for a user
router.post("/check-predictions", async ctx => {
  const userId = ctx.request.body.userId;
  const round = ctx.request.body.round;
  const response = await usersCtlr.hasUserSubmittedRoundPredictions(userId, round);
  ctx.body = response;
});

// Create a new user
router.post("/signup", async ctx => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  const response = await usersCtlr.create(email, password);
  if (response === "duplicate") {
    ctx.body = {
      message: "This email address already exists"
    };
    ctx.body.status = 409;
  } else {
    ctx.body = {
      message: "New user created successfully!"
    };
    ctx.body.status = 200;
  }
});

// Login a user
router.post("/login", async ctx => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  let loginResponse = await usersCtlr.login(email, password);
  if (loginResponse == 'Auth failed') {
    ctx.body = {
      message: 'Auth failed'
    };
    return ctx.body;
  }
  ctx.body = loginResponse;
});

// Save user predictions
router.post("/predictions", async ctx => {
  const userId = ctx.request.body.userId;
  const predictionObj = {
    year: ctx.request.body.year.toString(),
    round: ctx.request.body.round.toString(),
    completed: ctx.request.body.completed,
    predictions: ctx.request.body.predictions
  };
  try {
    let loginResponse = await usersCtlr.savePredictions(userId, predictionObj);
    ctx.body = loginResponse;
  } catch (error) {
    ctx.body = {
      error: error,
      message: 'Error saving user predictions'
    };
  }
});

module.exports = router.routes();
