// const Router = require("koa-router");
// const router = new Router();
// const bodyParser = require("koa-bodyparser");
// const bcrypt = require("bcrypt");
// const teams = require("./teams");

// const usersCtlr = require("./../ctlrs/users");

// // User Routes ****************************

// // Get all users
// router.get("/api/users", async (ctx) => {
//   const users = await usersCtlr.get();
//   ctx.body = users;
// });

// // Create a new user
// router.post("/api/users/signup", async (ctx) => {
//   const username = ctx.request.body.username;
//   const password = ctx.request.body.password;
//   let newUserResponse = await usersCtlr.create(username, password);
//   if (newUserResponse === "duplicate") {
//     ctx.body = {
//       message: "This username already exists",
//       status: 409,
//     };
//   } else {
//     ctx.body = {
//       message: "New user created successfully!",
//       status: 200,
//     };
//   }
// });

// module.exports = router;
