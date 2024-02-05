module.exports = {
  // Handle with Array
  mutipleMongooseToObject: (mongooses) => {
    return mongooses.map((c) => c.toObject());
  },
  mongooseToObject: (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
