/**
 * S_reqController
 *
 * @description :: Server-side logic for managing s_reqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	create: function (req, res) {

    console.log('<== S_reqController.js:create ==>');

/*
    console.log('=======================');
    console.log('req.body:');
    console.dir(req.body);
    console.log('req.headers:');
    console.dir(req.headers);
    console.log('req.ip:');
    console.dir(req.ip);
    console.log('req.ips:');
    console.dir(req.ips);
    console.log('req.method:');
    console.dir(req.method);
    console.log('req.params:');
    console.dir(req.params);
    console.log('req.allParams():');
    console.dir(req.allParams());
    console.log('=======================');
*/

    // todo: make parameters validation
    var requestParams = req.allParams();
    var createObj = {};

    _.forEach(requestParams, function (val, key) {
      if (val) {
        createObj[key] = val;
      }
    });

    createObj['user_agent'] = req.headers['user-agent'] || '';
    createObj['ip'] = req.ip || '';
    createObj['cookie'] = req.headers.cookie || '';

    console.log('createObj:');
    console.dir(createObj);

    S_req.create(createObj)
      .exec(function (err, data) {

/*
        // To test server error case
        var e = new Error('Some error message');
        return res.serverError(e);
*/

        if (err) {
          return res.serverError(err);
        }

        console.log('Sending email with request...');
        console.dir(data);
        var subject = 'Hello from Mailgun';
        var html = `
          <table>
            <tr>
              <th>Параметр</th>
              <th>Значение</th>
            </tr>
        `;

        var keys = [
          'objnumber',
          'name',
          'email',
          'phone',
          'skype',
          'whatsapp',
          'telegram',
          'viber',
          'additionalInfo',
          'period_start',
          'pariod_end',
        ];

        keys.forEach(function (key) {
          if (data[key]) {
            html += `
              <tr>
                <td>${key}</td>
                <td>${data[key]}</td>
              </tr>
            `;
          }
        });

        html += '</table>';

        EmailService.sendEmail(subject, html);

        return res.ok({result: 'ok', data: data});
      });
  }
};

