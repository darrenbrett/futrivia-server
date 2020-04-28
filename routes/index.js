const Router = require("koa-router");
const router = new Router();

const users = require('./users');
const players = require('./players');
const games = require('./games');
const rounds = require('./rounds');
const teams = require('./teams');

router.use('/api/users', users);
router.use('/api/players', players);
router.use('/api/games', games);
router.use('/api/rounds', rounds);
router.use('/api/teams', teams);

module.exports = router;
