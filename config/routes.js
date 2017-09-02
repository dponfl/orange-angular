/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'index'
  },

  '/exclusive': {
    view: 'index'
  },

  '/shortterm': {
    view: 'index'
  },

  '/longterm': {
    view: 'index'
  },

  '/sale': {
    view: 'index'
  },

  '/qa': {
    view: 'index'
  },

  '/services': {
    view: 'index'
  },

  '/contacts': {
    view: 'index'
  },

  '/login': {
    view: 'index'
  },

  '/account': {
    view: 'index'
  },


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'POST /short/find': 'ShortController.find',
  'POST /short/findp': 'ShortController.findPager',

  'POST /long/find': 'LongController.find',
  'POST /long/findp': 'LongController.findPager',
  'POST /long/put': 'LongController.put',

  'POST /sale/find': 'SaleController.find',
  'POST /sale/findp': 'SaleController.findPager',

  'POST /exclusive/find': 'ExclusiveController.find',
  'POST /exclusive/findp': 'ExclusiveController.findPager',
  'POST /exclusive/put': 'ExclusiveController.put',

  'POST /sreq/create': 'S_reqController.create',
  'POST /sreq/createInfo': 'S_reqController.createInfo',

  'GET /config': 'ConfigController.loadConfig',

  // orange-sails-auth

  'POST /register': 'UserController.create',
  'GET /me': 'UserController.me',

  'POST /update': 'UserController.update',

  'POST /logout': 'AuthController.logout',

  'POST /auth/local': 'AuthController.callback',
  'POST /auth/local/:action': 'AuthController.callback',

  // FileUpload

  'POST /file/upload': 'FileController.upload',
  'POST /file/uploadmain': 'FileController.uploadmain',
  'POST /file/upload2': 'FileController.upload2',
  'POST /file/uploadmain2': 'FileController.uploadmain2',

};

