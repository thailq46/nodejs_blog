const {mutipleMongooseToObject} = require('../../utils/mongoose');
const Course = require('../models/Course');

class SiteController {
  // [GET] /home
  index(req, res, next) {
    Course.find({})
      .then((course) => {
        res.render('home', {course: mutipleMongooseToObject(course)});
      })
      .catch((err) => next(err));
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
