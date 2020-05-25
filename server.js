const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();

// // Authentication
// app.use(async (ctx, next) => {
//   if (!ctx.url.includes('login') && (!ctx.url.includes('signup'))) {
//     const authHeader = ctx.req.headers.authorization;
//     if (!authHeader) {
//       console.log('No auth header provided.');
//       ctx.response.status = 403;
//       ctx.response.body = "Authentication failed.";
//       return;
//     }
//     await routeAuth(ctx, authHeader, next);
//   } else if ((ctx.url.includes('login')) || (ctx.url.includes('signup'))) {
//     console.log('Login or signup API call triggered...');
//     await next();
//   }
// });

app.use(cors());
const bodyParser = require("koa-body");
const mongoose = require("mongoose");

const routing = require("./routes");
const routeAuth = require("./middleware/routeAuth");

app.use(bodyParser());
app.use(routing.routes());

// // Log response time of calls
// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`API response time: ${ms} ms.`);
// });

// // Authentication
// app.use(async (ctx, next) => {
//   console.log('new part...');
//   if (!ctx.url.includes('login') && (!ctx.url.includes('signup'))) {
//     const authHeader = ctx.req.headers.authorization;
//     if (!authHeader) {
//       console.log('No auth header provided.');
//       ctx.response.status = 403;
//       ctx.response.body = "Authentication failed.";
//       return;
//     }
//     await routeAuth(ctx, authHeader, next);
//   } else if ((ctx.url.includes('login')) || (ctx.url.includes('signup'))) {
//     console.log('Login or signup API call triggered...');
//     await next();
//   }
// });

// mongoose.connect("mongodb://localhost:27017/evpsl", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const connectToDB = async () => {
  let port;
  let env;
  if (process.argv[2] === "prod") {
    env = "Production";
    port = process.env.PORT || 4000;
    await mongoose.connect("mongodb://heroku_3jzbgvw8:tdn6as828vnlonj5p474llc60p@ds139884.mlab.com:39884/heroku_3jzbgvw8", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else if (process.argv[2] === "dev") {
    env = "Development";
    port = 3000;
    await mongoose.connect("mongodb://localhost:27017/evpsl", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    env = "Development";
    port = 3000;
    await mongoose.connect("mongodb://localhost:27017/evpsl", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  app.listen(port, () => console.log(`${env} server started. Listening on port ${port}...`));
};

connectToDB();

// mongoose.connect("mongodb://dking:Nutellaineurope90!@ds127492.mlab.com:27492/evpsl", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.listen(port, () => console.log(`Server started. Listening on port ${port}...`));
