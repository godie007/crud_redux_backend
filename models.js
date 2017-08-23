'use strict'

exports = module.exports = function (app, mongoose) {
  // embeddable docs first
  require('./schema/User')(app, mongoose)
  require('./schema/Appointment')(app, mongoose)
  require('./schema/AppointmentType')(app, mongoose)
}
