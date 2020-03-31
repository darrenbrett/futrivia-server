const router = require('koa-router')();
const users = require('../api/users/routes');
const players = require('./../../routes/players');

router.use('/users', users);
router.use('/players', players);

module.exports = router;
