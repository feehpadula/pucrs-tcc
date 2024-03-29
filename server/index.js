const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
require("dotenv").config();
const topics = require("./routes/topics");
const items = require("./routes/items");
const data = require("./routes/data");
const reports = require("./routes/reports");
const user = require("./routes/user");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/topics", topics);
app.use("/items", items);
app.use("/data", data);
app.use("/reports", reports);
app.use("/user", user);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
