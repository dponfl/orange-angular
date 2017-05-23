"use strict";

module.exports = {
  loadConfig: function (req, res) {

    console.log('<== ConfigController.js:loadConfig ==>');

    var objPromise = Obj.find()
      .then(function (data) {
        return {obj: data};
      });

    var dealPromise = Deal.find()
      .then(function (data) {
        return {deal: data};
      });

    Promise.all([objPromise, dealPromise])
      .then(function (result) {

        console.log('loadConfig, result:');
        console.log(result);

        return res.ok({result: 'ok', data: result});
      }, function (reason) {

      });

  },
};