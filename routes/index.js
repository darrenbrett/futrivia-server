const Router = require("koa-router");
const router = new Router();

const users = require('./users');
const players = require('./players');
const games = require('./games');
const rounds = require('./rounds');
const triviaSets = require('./trivia-sets');

router.use('/api/users', users);
router.use('/api/players', players);
router.use('/api/games', games);
router.use('/api/rounds', rounds);
router.use('/api/trivia-sets', triviaSets);

module.exports = router;
