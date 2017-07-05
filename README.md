[![Build Status](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance.svg?branch=master)](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance)

#Learn Teach Code Attendance Tracker
## Track Attendance

## Award Badges

## Display Leaderboard

## Basic live messaging

 mongodb://heroku_d895z9hp:74v0ph37vib5v5gf02jb675acf@ds135522.mlab.com:35522/heroku_d895z9hp


Collections ->

[Users]
-_id
-email
-level
-name (optional)

[UsersClasses]
-_id
-user_id
-course_id
-date

[Lecture]
-_id
-course_id
-time
-location
-url

[Course]
-_id
-title
-description

## Testing instructions
testing database is set to mongodb://localhost/test-database
so mongo needs to be running in order to run tests

npm test           => runs all tests once
npm run test-watch => runs all tests each time a change is saved
