const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser")

const connectDB = require("./config/connectDB.js");
const { recipesRoutes } = require("./routes/recipe.route.js");
const { userRoutes } = require("./routes/user.routes.js");

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:80",
  "http://foodblog.local",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", recipesRoutes);
app.use("/api/v1/auth", userRoutes);

app.listen(port, () => {
  try {
    connectDB();
    console.log(`Server is runing on http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});
