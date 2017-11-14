[![Build Status](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance.svg?branch=master)](https://travis-ci.org/LearnTeachCodeSeoul/ltc_attendance)


# Learn Teach Code Attendance Tracker
This is a tool to help Learn Teach Code track and manage attendance to meetup events.

See Issues for the features we're working on.

The application is not yet ready for production, but the core features of event creation and attendance marking are there. 

## Setup instructions

We'll assume you have no experience with NodeJS or the ecosystem.
### Mac
1. [Install brew](https://brew.sh/)
    * `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. [Install NodeJS](https://nodejs.org/en/download/package-manager/#macos)
    * `brew install node`
3. Update SQLite3
    * `brew install sqlite3`
4. Install dependencies
    * In the project directory, `npm install`
5. Setup config files
    1. Copy config/database.template.js to config/database.dev.js
    2. Remove HOST, USER, PASSWORD, DATABASE (Optional, but cleaner)
6. Run in dev mode
    * `npm run dev`

The server runs on port 3000, so you can visit it at [`http://localhost:3000`](http://localhost:3000)

## Testing

npm test           => runs all tests once
npm run test-watch => runs all tests each time a change is saved



## Application Design
### Collections
#### Users
* id
* username
* password
* email
* level
* name (optional)
* website
* hometown
* description
* checkIns
* createdAt
* updatedAt

#### Event
* id
* title
* description
* instructors
* createdAt
* updatedAt

#### CheckIn
* id
* user
* event
* createdAt
* updatedAt
