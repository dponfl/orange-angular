/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    login: {
      type: 'string',
      size: 50
    },
    password: {
      type: 'string',
      size: 50
    },
    role: {
      type: 'string',
      size: 50
    },
  },
};

