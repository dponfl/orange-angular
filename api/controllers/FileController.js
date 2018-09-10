"use strict";

const _ = require('lodash');
const del = require('del');
let objNum = '';
// const imgFileNameElement = '_$$$_-_$$$_';
const imgFileNameElement = '';

const cloud = require('cloudinary');
const controllerName = 'FileController.';

cloud.config({
  cloud_name: process.env.C_NAME || 'none',
  api_key: process.env.C_KEY || 'none',
  api_secret: process.env.C_SECRET || 'none'
});

module.exports = {
  upload: function (req, res) {

    const methodName = 'upload';

    var fileName = '';

    console.log('<== FileController.js:upload ==>');

    console.log('req.allParams():');
    console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimg').upload({
      dirname: '../../assets/img',
      saveAs: setFileName,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      // console.log('FileController, upload result:');
      // console.dir(result);

      fileName = result.files[0].fd.slice(result.files[0].fd.indexOf('assets')).split('\\').join('/');

      // console.log('Transformed file name: ' + fileName);

      cloud.v2.uploader.upload(fileName, {
        use_filename: true
      }, function (errCloud, resCloud) {

        if (errCloud) {

          console.log(controllerName + methodName + ', Cloudinary error:');
          console.dir(errCloud);

          return res.send(500, errCloud);
        }

        console.log(controllerName + methodName + ', Cloudinary success:');
        console.dir(resCloud);

        result.url = resCloud.url;
        
        del([fileName])
          .then(function (paths) {
            console.log('Deleted file:\n', paths.join('\n'));
          });

        return res.json(result);

      });
    });

  }, // upload

  uploadmain: function (req, res) {

    const methodName = 'uploadmain';

    var fileName = '';

    console.log('<== FileController.js:uploadmain ==>');

    console.log('req.allParams():');
    console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimgmain').upload({
      dirname: '../../assets/img',
      saveAs: setFileNameMain,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      // console.log('FileController, uploadmain result:');
      // console.dir(result);

      fileName = result.files[0].fd.slice(result.files[0].fd.indexOf('assets')).split('\\').join('/');

      // console.log('Transformed file name: ' + fileName);

      cloud.v2.uploader.upload(fileName, {
        use_filename: true
      }, function (errCloud, resCloud) {

        if (errCloud) {

          console.log(controllerName + methodName + ', Cloudinary error:');
          console.dir(errCloud);

          return res.send(500, errCloud);
        }

        console.log(controllerName + methodName + ', Cloudinary success:');
        console.dir(resCloud);

        result.url = resCloud.url;

        del([fileName])
          .then(function (paths) {
            console.log('Deleted file:\n', paths.join('\n'));
          });


        return res.json(result);

      });

    });

  }, // uploadmain

  upload2: function (req, res) {

    console.log('<== FileController.js:upload2 ==>');

    console.log('req.allParams():');
    console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimg2').upload({
      dirname: '../../.tmp/public/img',
      saveAs: setFileName,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      console.log('FileController, upload2 result:');
      console.dir(result);

      return res.json(result);
    });

  }, // upload2

  uploadmain2: function (req, res) {

    console.log('<== FileController.js:uploadmain2 ==>');

    console.log('req.allParams():');
    console.dir(req.allParams());

    objNum = req.allParams().obj;

    req.file('someimgmain2').upload({
      dirname: '../../.tmp/public/img',
      saveAs: setFileNameMain,
    }, function (err, uploadedFiles) {
      if (err) return res.send(500, err);
      var result = {
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      };

      console.log('FileController, uploadmain2 result:');
      console.dir(result);

      return res.json(result);
    });

  }, // uploadmain2

};

function setFileName(__newFileStream, next) {
/*
  console.log('setFileName, __newFileStream');
  console.log('headers');
  console.dir(__newFileStream.headers);
  console.log('name: ', __newFileStream.name);
  console.log('filename: ', __newFileStream.filename);
  console.log('byteCount: ', __newFileStream.byteCount);
  console.log('field: ', __newFileStream.field);
*/

  return next(undefined, objNum + '' +
    imgFileNameElement + '_' + __newFileStream.filename);
} // setFileName

function setFileNameMain(__newFileStream, next) {
  return next(undefined, objNum + '_main' +
    imgFileNameElement + '_' + __newFileStream.filename);
} // setFileNameMain