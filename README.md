[![Build Status](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance.svg?branch=master)](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance)


# Learn Teach Code Attendance Tracker
This is a tool to help Learn Teach Code track and manage attendance to meetup events.

See Issues for the features we're working on.

Currently, the application has no authentication, and anyone can create events or register. The application is not yet ready for production, but the core features of event creation and attendance marking are there.

## Setup instructions

We'll assume you have no experience with NodeJS or the ecosystem.
### Mac
1. [Install brew](https://brew.sh/)
    * `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. [Install NodeJS](https://nodejs.org/en/download/package-manager/#macos)
    * `brew install node`
3. [Install MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
    1. `brew install mongodb`
    2. `sudo mkdir -p /data/db`
    3. `sudo chown -R $(id -un) /data/db`
4. Install dependencies
    * In the project directory, `npm install`
5. Run MongoDB
    * `mongod`
6. Run in dev mode
    * `npm run dev`

The server runs on port 3000, so you can visit it at [`http://localhost:3000`](http://localhost:3000)

## Testing

The testing database is set to `mongodb://localhost/test-database`, so MongoDB should be for your tests

npm test           => runs all tests once
npm run test-watch => runs all tests each time a change is saved



## Application Design
### Collections
#### Users
* _id
* email
* level
* name (optional)

#### UsersClasses
* _id
* user_id
* event_id
* date

#### Lecture
* _id
* event_id
* time
* location
* url

#### Event
* _id
* title
* description
