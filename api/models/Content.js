/**
 * Content.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'content',
  attributes: {
    show: {
      type: 'boolean',
    },
    content_type: {
      type: 'string',
      size: 50
    },
    lang: {
      type: 'string',
      size: 2
    },
    content: {
      type: 'text',
    },
  },
};

