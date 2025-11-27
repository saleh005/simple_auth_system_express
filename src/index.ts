import express from "express";
import { sequelize } from "./config/connectionToDB.ts";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.routes";



const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/api/v1", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
}

start();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);