"use strict";

module.exports.email = {
  service: 'Mailgun',
  auth: {
    user: 'dponfl@gmail.com',
    pass: 'DimaMailGun'},
  templateDir: 'api/emailTemplates',
  from: 'info@mycompany.com',
  testMode: false,
  ssl: true
};