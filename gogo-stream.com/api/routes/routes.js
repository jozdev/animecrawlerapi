'use strict';
module.exports = function(app) {
  var main = require('../controllers/mainController');
  var last = require('../controllers/lastController');
  var animevideo = require('../controllers/animevideoController');
  var search = require('../controllers/searchController');

  
  //Main
  app.route('/')
  .get(main.list_all);
  
  //RecentAnime
  app.route('/last')
  .get(last.list_all);

  //Video
  app.route('/video/:episode/')
  .get(animevideo.list_all)

  //Search
  app.route('/search/:anime')
  .get(search.list_all);



};
