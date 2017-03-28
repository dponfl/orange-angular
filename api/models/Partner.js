/**
 * Partner.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'partner',
  attributes: {
    key: {
      type: 'string',
      size: 255
    },
    partner: {
      type: 'string',
      size: 255
    },
  },
};

