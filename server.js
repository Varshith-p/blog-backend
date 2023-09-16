require("dotenv").config();

const express = require("express");
const app = express();

require("express-async-errors");
const connectDB = require("./db/connectDB");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const postsRouter = require("./routes/postsRoutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/auth");
const { StatusCodes } = require("http-status-codes");
const endPoints = require("./utils/endPoints");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json(endPoints);
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authenticateUser, postsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
