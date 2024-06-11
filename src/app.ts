import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { connect } from "./utils/mongodb";

connect();
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json({ strict: false }));
app.use(cors());
app.use("/api/v1", router);
app.get("*", (req, res) => {
  return res.status(404).json({
    error: "End point is not registered",
  });
});

// app.listen(port, async () => {
//   await connect();
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

export default app;