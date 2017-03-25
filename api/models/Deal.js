/**
 * Deal.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'deal',
  attributes: {
    lang: {
      type: 'string',
      size: 2
    },
    order: {
      type: 'integer',
    },
    key: {
      type: 'string',
      size: 255
    },
    deal: {
      type: 'string',
      size: 255
    },
    show: {
      type: 'integer',
    },
  },
};

