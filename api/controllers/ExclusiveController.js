/**
 * ExclusiveController
 *
 * @description :: Server-side logic for managing exclusives
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const BB = require('bluebird');
const moduleName = 'ExclusiveController.';

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

    console.log('<== ExclusiveController.js:find ==>');

    const methodName = 'find';

    // todo: make parameters validation
    var requestParams = req.allParams();
    // var whereObj = {};
    var whereObj = requestParams;

/*
    _.forEach(requestParams, function (val, key) {
      if (val) {
        whereObj[key] = val;
      }
    });
*/

    console.log(moduleName + methodName + ', whereObj:');
    console.dir(whereObj);

    BB.props({
      short: getShort(),
      long: getLong(),
      sale: getSale(),
    }).then(resolve, reject);

    function resolve(resolveData) {
      console.log(moduleName + methodName + '.resolve, resolveData:');
      console.dir(resolveData);

      return res.ok(resolveData);

    } // resolve

    function reject(rejectData) {
      console.log(moduleName + methodName + '.reject, rejectData:');
      console.dir(rejectData);

      return res.notFound(rejectData);

    } // reject

    function getShort() {
      return new BB(function (resolve, reject) {
        Short.find({
          where: whereObj,
        })
          .exec(function (err, data) {
            if (err) {
              return reject(err);
            }

            console.log('data.length: ' + data.length);


            if (data.length == 0) {
              return reject({
                code: 404,
                message: 'Not found'});
            }

            return resolve({
              code: 200,
              message: 'OK',
              result: data});
          });
      });
    } // getShort

    function getLong() {
      return new BB(function (resolve, reject) {
        Long.find({
          where: whereObj,
        })
          .exec(function (err, data) {
            if (err) {
              return reject(err);
            }

            console.log('data.length: ' + data.length);


            if (data.length == 0) {
              return reject({
                code: 404,
                message: 'Not found'});
            }

            return resolve({
              code: 200,
              message: 'OK',
              result: data});
          });
      });
    } // getLong

    function getSale() {
      return new BB(function (resolve, reject) {
        Sale.find({
          where: whereObj,
        })
          .exec(function (err, data) {
            if (err) {
              return reject(err);
            }

            console.log('data.length: ' + data.length);


            if (data.length == 0) {
              return reject({
                code: 404,
                message: 'Not found'});
            }

            return resolve({
              code: 200,
              message: 'OK',
              result: data});
          });
      });
    } // getSale



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

    console.log('<== ExclusiveController.js:findPager ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    // var whereObj = {};
    var whereObj = requestParams.conditions;

/*
    _.forEach(requestParams.conditions, function (val, key) {
      if (val) {
        whereObj[key] = val;
      }
    });
*/

    var pager = requestParams.pager;

    console.log('requestParams:');
    console.dir(requestParams);
    console.log('whereObj:');
    console.dir(whereObj);
    console.log('pager:');
    console.dir(pager);

    Exclusive.find({
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
    console.log('<== ExclusiveController.js:put ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    // var newObj = {};
    var newObj = newRecordParams;

/*
    _.forEach(newRecordParams, function (val, key) {
      if (val) {
        newObj[key] = val;
      }
    });
*/

    console.log('Ready to create new record:');
    console.dir(newObj);

    Exclusive.create(newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data: ');
        console.dir(data);

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

    console.log('<== ExclusiveController.js:update ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();
    // var newObj = {};
    var newObj = newRecordParams;

/*
    _.forEach(newRecordParams, function (val, key) {
      if (val) {
        newObj[key] = val;
      }
    });
*/

    console.log('Ready to update record:');
    console.dir(newObj);

    var findCriteria = {
      objnumber: newObj.objnumber,
      lang: newObj.lang
    };

    Exclusive.update(findCriteria, newObj)
      .exec(function (err, data) {
        if (err) {
          return res.serverError(err);
        }

        console.log('data: ');
        console.dir(data);

        return res.json({
          code: 200,
          message: 'OK',
          result: data});
      });

  }, // update
};

