const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: {type: String, maxLength: 255},
    description: {type: String},
    image: {type: String},
    videoId: {type: String},
    slug: {type: String, slug: 'name', unique: true},
  },
  {timestamps: true}
);

// Add plugins
Course.plugin(mongooseDelete, {overrideMethods: 'all', deletedAt: true});
module.exports = mongoose.model('Course', Course);
