/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var _ = require('lodash');
var _super = require('orange-sails-auth/api/models/User');

var extObj = {
  attributes: {
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
  }
};

_.merge(module.exports, _super);
_.merge(module.exports, extObj);
