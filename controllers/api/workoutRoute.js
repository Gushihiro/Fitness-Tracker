const express = require('express');
const router = express.Router();
const { Exercise, Workout } = require('../../models');
const db = require("../../models");

router.get('/', async (req, res) => {
  try {
    const allWorkouts = await db.Workout.find({}).populate('exercises');
    allWorkouts[allWorkouts.length - 1].addUpDuration();
    allWorkouts[allWorkouts.length - 1].addUpDistance();
    res.status(200).json(allWorkouts)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const newWorkout = await db.Workout.create({})

    res.status(200).json(newWorkout)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/:id', async (req, res) => {
  try {
  const newExercise = await db.Exercise.create(req.body);

  const updatedWorkout = await db.Workout.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $push: { exercises: newExercise._id }
      },
      {
        new: true
      }
  )
  res.status(200).json(updatedWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

})

router.get('/range', async (req, res) => {
  try {
    const allWorkouts = await db.Workout.find({}).sort(
      {
        day: -1
      }
    ).limit(7).populate('exercises')

    allWorkouts.forEach(workout => {
      workout.addUpDuration();
    });
    res.status(200).json(allWorkouts)
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;