import workoutService from "../service/workout.service";
import express from "express";
const router = express.Router();

router.get("/:workoutId", async (req, res) => {
	const id = req.params.workoutId;
	try {
		if (req.query.embed === "all") {
			const workout = await workoutService.getWorkoutByIdIncludeAll({ id });
			res.json({ status: 200, workout });
		} else {
			const workout = await workoutService.getWorkoutById({ id });
			res.json({ status: 200, workout });
		}
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.get("/:profileId/feed", async (req, res) => {
	const id = req.params.profileId;
	try {
		const workouts = await workoutService.getAllFollowingWorkouts(id);
		res.json({ status: 200, workouts });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.get("/:workoutId/workout-page", async (req, res) => {
	const id = req.params.workoutId;
	try {
		const workout = await workoutService.getWorkoutByIdForWorkoutPage({ id });
		res.json({ status: 200, workout });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.post("/create", async (req, res) => {
	try {
		const workout = await workoutService.createWorkout(req.body);
		res.json({ status: 200, workout });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

router.get("/:workoutId/:type/:profileId", async (req, res) => {
	const workoutId = req.params.workoutId;
	const profileId = req.params.profileId;
	const type = req.params.type;
	try {
		const likedBy = await workoutService.likeWorkout(workoutId, profileId, type);
		res.json({ status: 200, likedBy });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});


router.post("/:workoutId/comment/:profileId", async (req, res) => {
	const workoutId = req.params.workoutId;
	const profileId = req.params.profileId;
	const message = req.body.message;
	try {
		const workoutComment = await workoutService.placeComment(workoutId, profileId, message);
		res.json({ status: 200, workoutComment });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});


router.get("/:workoutId/comments", async (req, res) => {
	const workoutId = req.params.workoutId;
	try {
		const comments = await workoutService.getWorkoutCommentsById(workoutId);
		res.json({ status: 200, comments });
	} catch (err) {
		res.status(500).send({ status: 500, message: err.message });
	}
});

export default router;
