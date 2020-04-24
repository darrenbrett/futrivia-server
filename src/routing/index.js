const router = require('koa-router')();
const users = require('./../../routes/users');

router.use('/users', users);

module.exports = router;
