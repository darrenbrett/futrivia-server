'use strict';

const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-body-parser');

const lastNames = require('./data/lastNames.json');

const app = new Koa();
const router = new KoaRouter();

// JSON Prettier middleware
app.use(json());

// app.use(body);

app.use(router.routes()).use(router.allowedMethods());

app.use(async ctx => {
  ctx.body = {
    greeting: 'Hello North Carolina!'
  };
  // ctx.response.status = 202;
});

const test = async (ctx) => {
  ctx.body = {
    greeting: 'Hello Test!'
  };
};

const getLastNames = async (ctx) => {
  ctx.body = {
    lastNames
  };
};

// Routes
router.get('/test', test);

router.get('/last-names', getLastNames);

app.listen(3000, () => {
  console.log('Running on port 3000...');
});
