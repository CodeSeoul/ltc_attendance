const Course = require('../models/Course').Course;

module.exports = {
    getCourses() {
        return Course.forge().orderBy('created_at', 'DESC').fetchAll();
    },

    createCourse(reqBody) {
        return new Course({
            title: reqBody.title,
            description: reqBody.description
        }).save();
    },

    getCourse(id) {
        return Course.where('id', id).fetch();
    },

    updateCourse(id, course) {
        return Course.where('id', id).save(course, {patch: true});
    },

    deleteCourse(id) {
        return Course.where('id', id).destroy();
    }
};
