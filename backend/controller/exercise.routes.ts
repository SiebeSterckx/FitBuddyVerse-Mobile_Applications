import express from "express";
const router = express.Router();
import exerciseService from "../service/exercise.service";


router.get("/", async (req, res) => {
	try {
		const exercises = await exerciseService.getAllExercises();
		res.status(200).json({ status: "success", exercises });
	} catch (error) {
		res.status(404).json({ status: "error", errorMessage: error.message });
	}
});

router.get("/:id", async (req, res) => {
	const exerciseIdParam = req.params.id;
	const exerciseId = parseInt(exerciseIdParam); // Convert to number

	try {
		const exercise = await exerciseService.getExerciseById(exerciseId);
		res.status(200).json({ status: "success", exercise });
	} catch (error) {
		res.status(404).json({ status: "error", errorMessage: error.message });
	}
});

router.get("/:id/:profileId/workout-graph", async (req, res) => {
	const exerciseIdParam = req.params.id;
	const profileIdParam = req.params.profileId;

	const exerciseId = parseInt(exerciseIdParam); // Convert to number
	const profileId = parseInt(profileIdParam); // Convert to number
	if (isNaN(exerciseId) || isNaN(profileId)) {
		res.status(400).json({
			status: "error",
			errorMessage: "Invalid exerciseId or profileId",
		});
		return;
	}
	try {
		const graph = await exerciseService.getWorkoutGraphForExercise(
			exerciseId,
			profileId
		);
		res.status(200).json({ status: "success", graph });
	} catch (error) {
		res.status(404).json({ status: "error", errorMessage: error.message });
	}
});

router.get("/:id/:profileId/personal-best", async (req, res) => {
	const exerciseIdParam = req.params.id;
	const profileIdParam = req.params.profileId;

	const exerciseId = parseInt(exerciseIdParam); // Convert to number
	const profileId = parseInt(profileIdParam); // Convert to number
	if (isNaN(exerciseId) || isNaN(profileId)) {
		res.status(400).json({
			status: "error",
			errorMessage: "Invalid exerciseId or profileId",
		});
		return;
	}
	try {
		const personal_best = await exerciseService.getPersonalBestForExercise(
			exerciseId,
			profileId
		);
		res.status(200).json({ status: "success", personal_best });
	} catch (error) {
		res.status(404).json({ status: "error", errorMessage: error.message });
	}
});

router.get("/:id/:profileId/exercise-history", async (req, res) => {
	const exerciseIdParam = req.params.id;
	const profileIdParam = req.params.profileId;

	const exerciseId = parseInt(exerciseIdParam); // Convert to number
	const profileId = parseInt(profileIdParam); // Convert to number

	if (isNaN(exerciseId) || isNaN(profileId)) {
		res.status(400).json({
			status: "error",
			errorMessage: "Invalid exerciseId or profileId",
		});
		return;
	}
	try {
		const exercise_details = await exerciseService.getExerciseHistory(
			exerciseId,
			profileId
		);
		res.status(200).json({ status: "success", exercise_details });
	} catch (error) {
		res.status(404).json({ status: "error", errorMessage: error.message });
	}
});

export default router;
