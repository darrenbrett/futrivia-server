const Router = require("koa-router");
const router = new Router();

const users = require('./users');
const triviaSets = require('./trivia-sets');

router.use('/api/users', users);
router.use('/api/trivia-sets', triviaSets);

module.exports = router;
