"use strict";

// var wellknown = require('nodemailer-wellknown');

module.exports = {
  test: function(options, cb) {
    console.log('EmailService:');
    console.log(options);
    return cb({emailOptions: options});
  },
  sendEmail: function (params) {
    var template = 'welcomeEmail';
    var data = {
      Name: params.name,
    };
    var options = {
      to: params.email,
      subject: 'Welcome email',
    };
    var cb = function (err) {
      console.log('EmailService, sendEmail');
      console.log(err || 'Mail was successfully sent!');
    };

/*
    var config = wellknown('Mailgun');

    console.log('Mailgun config:');
    console.log(config);
*/

    sails.hooks.email.send(template, data, options, cb);
  }
};