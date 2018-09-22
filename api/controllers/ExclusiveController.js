/**
 * ExclusiveController
 *
 * @description :: Server-side logic for managing exclusives
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const BB = require('bluebird');
const moduleName = 'ExclusiveController.';
const _ = require('lodash');

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

    const methodName = 'findPager';


    console.log('<== ExclusiveController.js:findPager ==>');

    // todo: make parameters validation
    var requestParams = req.allParams();
    // var whereObj = {};
    var whereObj = requestParams.conditions;

    var pager = requestParams.pager;

    console.log('requestParams:');
    console.dir(requestParams);
    console.log('whereObj:');
    console.dir(whereObj);
    console.log('pager:');
    console.dir(pager);

    if (!_.isNil(whereObj.deal)) {

      switch (whereObj.deal) {
        case 'short_term':
          BB.props({
            short: getShort(),
          }).then(resolve, reject);
          break;
        case 'long_term':
          BB.props({
            long: getLong(),
          }).then(resolve, reject);
          break;
        case 'sales':
          BB.props({
            sale: getSale(),
          }).then(resolve, reject);
          break;
      }

    } else {
      BB.props({
        short: getShort(),
        long: getLong(),
        sale: getSale(),
      }).then(resolve, reject);
    }

    function resolve(resolveData) {
      console.log(moduleName + methodName + '.resolve, resolveData:');
      console.dir(resolveData);

      if (
        (_.isNil(resolveData.short) || _.isNil(resolveData.short.result)
        || !_.isNil(resolveData.short) && !_.isNil(resolveData.short.result) && resolveData.short.result.length == 0)
        && (_.isNil(resolveData.long) || _.isNil(resolveData.long.result)
        || !_.isNil(resolveData.long) && !_.isNil(resolveData.long.result) && resolveData.long.result.length == 0)
        && (_.isNil(resolveData.sale) || _.isNil(resolveData.sale.result)
        || !_.isNil(resolveData.sale) && !_.isNil(resolveData.sale.result) && resolveData.sale.result.length == 0)
      ) {
        return res.notFound();
      } else {
        return res.ok(resolveData);
      }
    } // resolve

    function reject(rejectData) {
      console.log(moduleName + methodName + '.reject, rejectData:');
      console.dir(rejectData);

      return res.notFound(rejectData);
    } // reject

    function getShort() {
      return new BB(function (resolve, reject) {
        Short.find({
          where: _.omit(whereObj, ['deal']) ,
          sort: 'objnumber ASC',
        }).paginate({page: pager.page, limit: pager.limit})
          .exec(function (err, data) {
            if (err) {
              return reject(err);
            }

            console.log('getShort...');

            if (err) {
              return reject(err);
            }

            console.log('data.length: ' + data.length);
            console.log('data:');
            console.dir(data);


            if (data.length == 0) {
              return resolve({
                code: 404,
                message: 'Not found, short_term',
                result: data
              });
            }

            return resolve({
              code: 200,
              message: 'OK',
              result: data
            });
          });
      });
    } // getShort

    function getLong() {
      return new BB(function (resolve, reject) {
        Long.find({
          where: _.omit(whereObj, ['deal']) ,
          sort: 'objnumber ASC',
        }).paginate({page: pager.page, limit: pager.limit})
          .exec(function (err, data) {
            if (err) {
              return reject(err);
            }

            console.log('getLong...');

            if (err) {
              return reject(err);
            }

            console.log('data.length: ' + data.length);
            console.log('data:');
            console.dir(data);


            if (data.length == 0) {
              return resolve({
                code: 404,
                message: 'Not found, long_term',
                result: data
              });
            }

            return resolve({
              code: 200,
              message: 'OK',
              result: data
            });
          });
      });
    } // getLong

    function getSale() {
      return new BB(function (resolve, reject) {
        Sale.find({
          where: _.omit(whereObj, ['deal']) ,
          sort: 'objnumber ASC',
        }).paginate({page: pager.page, limit: pager.limit})
          .exec(function (err, data) {

            console.log('getSale...');

            if (err) {
              return reject(err);
            }

            console.log('data.length: ' + data.length);
            console.log('data:');
            console.dir(data);


            if (data.length == 0) {
              return resolve({
                code: 404,
                message: 'Not found, sale',
                result: data
              });
            }

            return resolve({
              code: 200,
              message: 'OK',
              result: data
            });
          });
      });
    } // getSale
  }, // findPager
};

