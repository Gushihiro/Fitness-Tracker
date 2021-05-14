const router = require('express').Router();
const workoutRoute = require('./workoutRoute');

router.use('/workouts', workoutRoute);

module.exports = router;