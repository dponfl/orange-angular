"use strict";

const _ = require('lodash');

module.exports = {
  upload: function (req, res) {

    console.log('<== FileController.js:upload ==>');

    console.log('req.allParams():');
    console.dir(req.allParams());

  },
};