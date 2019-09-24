const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
// const body = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// JSON Prettier middleware
app.use(json());

// app.use(body);

app.use(router.routes()).use(router.allowedMethods());

const test = async (ctx) => {
  ctx.body = {
    greeting: 'Hello Test!'
  };
};

// Routes
router.get('/', ctx => ctx.body = "Hello Planet!");
router.get('/test', test);

app.listen(3000, () => {
  console.log('Running on port 3000...');
});
