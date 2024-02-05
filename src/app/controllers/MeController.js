const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require('../../utils/mongoose');
const Course = require('../models/Course');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((course) =>
        res.render('me/stored-courses', {
          course: mutipleMongooseToObject(course),
        })
      )
      .catch((err) => next(err));
  }
}

module.exports = new MeController();
