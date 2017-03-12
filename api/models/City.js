/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    lang: {
      type: 'string',
      required: true
    },
    order: {
      type: 'integer',
      required: true
    },
    key: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    show: {
      type: 'boolean',
      required: true
    },
  },
  tableName: 'city'
};

