const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Learn Teach Code Attendance Tracker', authedUser: req.user});
});

module.exports = router;
