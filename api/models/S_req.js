/**
 * S_req.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 's_req',
  attributes: {
    objnumber: {
      type: 'string',
      size: 25
    },
    req_type: {
      type: 'string',
      size: 50
    },
    deal_type: {
      type: 'string',
      size: 50
    },
    obj: {
      type: 'string',
      size: 50
    },
    city: {
      type: 'string',
      size: 50
    },
    room: {
      type: 'string',
      size: 50
    },
    name: {
      type: 'string',
      size: 50
    },
    email: {
      type: 'string',
      size: 50
    },
    phone: {
      type: 'string',
      size: 50
    },
    skype: {
      type: 'string',
      size: 50
    },
    whatsapp: {
      type: 'string',
      size: 50
    },
    telegram: {
      type: 'string',
      size: 50
    },
    viber: {
      type: 'string',
      size: 50
    },
    additionalInfo: {
      type: 'string',
      size: 255
    },
    period_start: {
      type: 'datetime',
    },
    pariod_end: {
      type: 'datetime',
    },
    user_agent: {
      type: 'string',
      size: 255
    },
    ip: {
      type: 'string',
      size: 50
    },
    cookie: {
      type: 'string',
      size: 255
    },
  },
};

