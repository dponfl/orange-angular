/**
 * ShortController
 *
 * @description :: Server-side logic for managing shorts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function (req, res) {
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
*/

    // todo: make parameters validation
    var requestParams = req.allParams();
    var whereObj = {};

    _.forEach(requestParams, function (val, key) {
      if (val) {
        whereObj[key] = val;
      }
    });

    console.log('whereObj:')
    console.dir(whereObj);

    Short.find({
      where: whereObj,
    })
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data.length: ' + data.length);


        if (data.length == 0) {
          return res.notFound({
            code: 404,
            message: 'Not found'});
        }

        return res.ok({
          code: 200,
          message: 'OK',
          result: data});
      });


  } // find
};

