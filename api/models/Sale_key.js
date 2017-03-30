/**
 * Sale_key.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sale_key',
  attributes: {
    lang: {
      type: 'string',
      size: 2
    },
    order: {
      type: 'integer',
    },
    group: {
      type: 'integer',
    },
    key: {
      type: 'string',
      size: 255
    },
    label: {
      type: 'string',
      size: 255
    },
    show: {
      type: 'integer',
    },
    home: {
      type: 'integer',
    },
  },
};

