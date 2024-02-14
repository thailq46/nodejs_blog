const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    _id: {type: Number},
    name: {type: String, maxLength: 255},
    description: {type: String},
    image: {type: String},
    videoId: {type: String},
    slug: {type: String, slug: 'name', unique: true},
  },
  {timestamps: true,_id: false}
);

CourseSchema.query.sortable = function (req) {
    if(req.query.hasOwnProperty('_sort')){
        const isValidtype = ['asc','desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

// Add plugins
CourseSchema.plugin(mongooseDelete, {overrideMethods: 'all', deletedAt: true});
CourseSchema.plugin(AutoIncrement);
module.exports = mongoose.model('Course', CourseSchema);
