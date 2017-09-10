/**
 * LongController
 *
 * @description :: Server-side logic for managing longs
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

    console.log('<== LongController.js:find ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    var whereObj = {};

    _.forEach(requestParams, function (val, key) {
      if (val) {
        whereObj[key] = val;
      }
    });

    console.log('whereObj:');
    console.dir(whereObj);

    Long.find({
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


  }, // find

  findPager: function (req, res) {
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

    console.log('<== LongController.js:findPager ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    var whereObj = {};
    var pager = 0;

    _.forEach(requestParams.conditions, function (val, key) {
      if (val) {
        whereObj[key] = val;
      }
    });

    pager = requestParams.pager;

    console.log('requestParams:');
    console.dir(requestParams);
    console.log('whereObj:');
    console.dir(whereObj);
    console.log('pager:');
    console.dir(pager);

    Long.find({
      where: whereObj,
      sort: 'objnumber ASC',
    }).paginate({page: pager.page, limit: pager.limit})
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

        // todo: delete after tests of delay
/*
        setTimeout(function () {
          return res.ok({
            code: 200,
            message: 'OK',
            result: data
          });
        }, 3000);
*/

        // todo: uncomment after tests of delay

         return res.ok({
         code: 200,
         message: 'OK',
         result: data
         });
      });


  }, // findPager

  put: function (req, res) {
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

    console.log('<== LongController.js:put ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    var newObj = {};

    _.forEach(newRecordParams, function (val, key) {
      if (val) {
        newObj[key] = val;
      }
    });

    console.log('Ready to create new record:');
    console.dir(newObj);

    Long.create(newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data: ' + data);

        return res.created({
          code: 201,
          message: 'OK',
          result: data});
      });


  }, // put
    update: function (req, res) {
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

    console.log('<== LongController.js:update ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    var newObj = {};

    _.forEach(newRecordParams, function (val, key) {
      if (val) {
        newObj[key] = val;
      }
    });

    console.log('Ready to update record:');
    console.dir(newObj);

    var findCriteria = {
      objnumber: newObj.objnumber,
      lang: newObj.lang
    };

    Long.update(findCriteria, newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data: ' + data);

        return res.json({
          code: 200,
          message: 'OK',
          result: data});
      });

  }, // update

};

