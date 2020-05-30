const Router = require("koa-router");
const router = new Router();

const Team = require('./../models/Team');
const teamsCtlr = require('./../ctlrs/teams');

// Get all teams
router.get("/", async (ctx) => {
  const teams = await teamsCtlr.getAll();
  ctx.body = teams;
});

// Get team small logos
router.get("/logos", async (ctx) => {
  const logos = await teamsCtlr.getTeamLogos();
  ctx.body = logos;
});

// Get team by location
router.get("/:location", async (ctx) => {
  const {
    location
  } = ctx.params;
  const team = await teamsCtlr.getByLocation(location);
  ctx.body = team;
});

// Get eastern conference standings
router.get("/standings/east", async (ctx) => {
  await Team.find({
      conference: "Eastern",
    })
    .sort({
      "season.points": -1,
      "season.wins": -1,
      "season.goalDiff": -1
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
router.get("/standings/west", async (ctx) => {
  await Team.find({
      conference: "Western",
    })
    .sort({
      "season.points": -1,
      "season.wins": -1,
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
router.get("/standings/overall", async (ctx) => {
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

module.exports = router.routes();
