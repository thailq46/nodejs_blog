const {mongooseToObject} = require('../../utils/mongoose');
const Course = require('../models/Course');

class CourseController {
  // [GET] /course
  show(req, res, next) {
    Course.findOne({slug: req.params.slug})
      .then((course) =>
        res.render('courses/show', {course: mongooseToObject(course)})
      )
      .catch((error) => next(error));
  }

  // [GET] /create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /store
  store(req, res, next) {
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect(`/me/stored/courses`))
      .catch((error) => next(error));
  }

  // [GET] /:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', {course: mongooseToObject(course)})
      )
      .catch((error) => next(error));
  }

  // [PUT] /:id
  update(req, res, next) {
    Course.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch((error) => next(error));
  }

  // [DELETE] /:id (Xoá mềm)
  destroy(req, res, next) {
    Course.delete({_id: req.params.id})
      .then(() => res.redirect('back'))
      .catch((error) => next(error));
  }

  // [PATCH] /:id/restore
  restore(req, res, next) {
    Course.restore({_id: req.params.id})
      .then(() => res.redirect('back'))
      .catch((error) => next(error));
  }

  // [DELETE] /:id/force (Xoá thật)
  forceDestroy(req, res, next) {
    Course.deleteOne({_id: req.params.id})
      .then(() => res.redirect('back'))
      .catch((error) => next(error));
  }
}

module.exports = new CourseController();
