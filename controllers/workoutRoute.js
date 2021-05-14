const express = require('express');
const router = express.Router();

const db = require("../models");

router.get('/api/workouts', async (req, res) => {
    try {
      const allWorkouts = await db.Workout.aggregate([{
        $addFields: {
          totalDuration: {$sum: "$exercises.duration"}
        }
      }]);
      res.status(200).json(allWorkouts);
    } catch (err) {
      res.status(500).json(err);
    }
  })

router.post('/api/workouts', async (req, res) => {
  try {
    const newWorkout = await db.Workout.create({})

    res.status(200).json(newWorkout)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/api/workouts/:id', async (req, res) => {
  try {
  const updateWorkout = await db.Workout.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        $push: { exercises: req.body }
      },
      {
        new: true
      }
  )
  res.status(200).json(updateWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})

router.get('/api/workouts/range', async (req, res) => {
  try {
    const allWorkouts = await db.Workout.aggregate([{
      $addFields: {
        totalDuration: {$sum: "$exercises.duration"}
      }
    }])
    .sort({day: -1})
    .limit(7)
    res.status(200).json(allWorkouts);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;