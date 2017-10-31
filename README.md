[![Build Status](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance.svg?branch=master)](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance)


# Learn Teach Code Attendance Tracker
## Track Attendance

## Award Badges

## Display Leaderboard

## Basic live messaging

Collections ->

[Users]
-_id
-email
-level
-username (optional)

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
