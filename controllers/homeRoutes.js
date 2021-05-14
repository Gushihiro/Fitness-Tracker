const router = require('express').Router();
const path = require('path');


// to index.html (Home)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../public/index.html'));
})

//to exercise.html (New Workout)
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname + '../../public/exercise.html'));
})

// to index.html (Continue Workout)
router.get('/exercise/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '../../public/index.html'))
})

// to stats.js (Dashboard)
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname + '../../public/stats.html'))
})

module.exports = router;