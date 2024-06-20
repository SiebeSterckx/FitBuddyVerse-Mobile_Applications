import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import profileRouter from "./controller/profile.routes";
import exerciseRouter from "./controller/exercise.routes";
import workoutRouter from "./controller/workout.routes";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/status", (req, res) => {
	res.json({ message: "Back-end is running..." });
});

app.use("/profiles", profileRouter);
app.use("/exercises", exerciseRouter);
app.use("/workouts", workoutRouter);

app.listen(port || 3000, () => {
	console.log(`Back-end is running on port ${port}.`);
});
