const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require('../../utils/mongoose');
const Course = require('../models/Course');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    const courseQuery = Course.find({}).sortable(req);
    // res.json(res.locals._sort);

    // find({}) nếu không truyền điều kiện gì vào thì sẽ select all documents in database
    Promise.all([courseQuery, Course.findDeleted()])
      .then(([course, deletedCount]) =>
        res.render('me/stored-courses', {
          course: mutipleMongooseToObject(course),
          deletedCount: deletedCount.filter((c) => c.deleted === true).length,
        })
      )
      .catch((err) => next(err));
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({deleted: true})
      .then((course) =>
        res.render('me/trash-courses', {
          course: mutipleMongooseToObject(course),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
