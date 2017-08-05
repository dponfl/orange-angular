"use strict";

const _ = require('lodash');

module.exports = {
  upload: function (req, res) {

    console.log('<== FileController.js:upload ==>');

    console.log('req.allParams():');
    console.dir(req.allParams());

    req.file('someimg').upload(function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      console.log('FileController, result:');
      console.dir(result);

      return res.json(result);
    });

  },
};