import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import clientRoutes from './src/routes/clientRoutes.js'

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors({
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.get("/", (req, res) => {
  res.status(200).send("Server is alive");
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", clientRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
