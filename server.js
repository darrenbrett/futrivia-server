const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();
app.use(cors());
const bodyParser = require("koa-body");
const mongoose = require("mongoose");

const routing = require("./routes");

app.use(bodyParser());
app.use(routing.routes());
// app.use(router.routes());
// app.use("/user", userRoutes);
const port = "3000";

app.use((ctx) => {
  ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});

mongoose.connect("mongodb://localhost:27017/evpsl", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => console.log(`Server started. Listening on port ${port}...`));
