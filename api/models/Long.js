/**
 * Long.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'long',
  attributes: {
    exclusive: {
      type: 'boolean',
    },
    objnumber: {
      type: 'string',
      size: 25
    },
    lang: {
      type: 'string',
      size: 2
    },
    show: {
      type: 'integer',
    },
    home: {
      type: 'integer',
    },
    tag: {
      type: 'string',
      size: 255
    },
    city: {
      type: 'string',
      size: 255
    },
    address: {
      type: 'text',
    },
    obj: {
      type: 'string',
      size: 255
    },
    room: {
      type: 'string',
      size: 255
    },
    bathroom: {
      type: 'text',
    },
    pool: {
      type: 'text',
    },
    price: {
      type: 'text',
    },
    description: {
      type: 'text',
    },
    info: {
      type: 'text',
    },
    maps: {
      type: 'text',
    },
    imgmain: {
      type: 'string',
      size: 255
    },
    imggallery: {
      type: 'text',
    },
    youtube: {
      type: 'string',
      size: 255
    },
  },
};

