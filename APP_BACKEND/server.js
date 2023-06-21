const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
app.use(cors());

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/posts", require("./routes/posts"));
app.use("/api/user", userRoutes);
