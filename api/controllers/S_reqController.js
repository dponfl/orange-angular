/**
 * S_reqController
 *
 * @description :: Server-side logic for managing s_reqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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

    console.log('createObj:');
    console.dir(createObj);

    S_req.create(createObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        return res.ok();
      });
  }
};

