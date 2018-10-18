/**
 * ContentController
 *
 * @description :: Server-side logic for managing contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
var controllerName = 'ContentController.';

module.exports = {
  update: function (req, res) {

    var methodName = 'update';
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

    console.log('<== ContentController.js:update ==>');

    // todo: make parameters validation
    var newRecordParams = req.allParams();

    console.log(controllerName + methodName + ': Ready to update record:');
    console.dir(newRecordParams);

    var findCriteria = {};

    if (!_.isNil(newRecordParams.content_type)
      && !_.isNil(newRecordParams.record)
    ) {

      switch (newRecordParams.content_type) {
        case 'home':
          findCriteria.content_type = newRecordParams.content_type;
          findCriteria.lang = newRecordParams.record.lang;
          break;
        case 'qa':
          findCriteria.content_type = newRecordParams.content_type;
          findCriteria.lang = newRecordParams.record.lang;
          break;
        case 'service':
          findCriteria.content_type = newRecordParams.content_type;
          findCriteria.lang = newRecordParams.record.lang;
          break;
        default:
          return res.notFound(controllerName + methodName + ': Content_type is not correct');
      }

      Content.update(findCriteria, newRecordParams.record)
        .exec(function (err, data) {
          if (err) {
            return res.serverError(err);
          }

          console.log(controllerName + methodName + ': updated data: ');
          console.dir(data);

          return res.json({
            code: 200,
            message: 'OK',
            result: data});
        });

    } else {
      return res.notFound(controllerName + methodName + ': No content_type or record');
    }


  }, // update
};

