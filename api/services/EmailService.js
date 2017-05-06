"use strict";

var Mailgun = require('mailgun-js');

module.exports = {
  test: function(options, cb) {
    console.log('EmailService:');
    console.log(options);
    return cb({emailOptions: options});
  },
  sendEmail: function (subject, html) {
    var api_key = 'key-c3d2a9801173b2ac5edd206c0c469601';
    var domain = 'sandbox39dd8ba22aad4440ac6be87d983d89ac.mailgun.org';

    var data = {
      from: 'order@orangevillas.com',
      to: 'dshchfl@gmail.com',
      subject: subject,
      html: html,
    };

    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    mailgun.messages().send(data, function (err, body) {
      console.log('EmailService, sendEmail');

      if (err) {
        console.log('Error:');
        console.dir(err);
        return;
      }

      console.log('Mail was successfully sent!');
      console.dir(body);
    });

  }
};