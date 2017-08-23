'use strict'

exports = module.exports = function (app, mongoose) {
  var userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    email: String,
    description: { type: String },
    createdAt: {type: Date, default: Date.now},
    updateAt: Date
  })
  userSchema.set('autoIndex', (app.get('env') === 'development'))
  app.db.model('user', userSchema)
}
