'use strict';
module.exports = function(app) {
  var main = require('../controllers/mainController');
  var releases = require('../controllers/releaseController')
  var last = require('../controllers/lastController');
  var animes = require('../controllers/animesController');
  var movies = require('../controllers/moviesController');
  var gender = require('../controllers/genderController');
  var animevideo = require('../controllers/animevideoController');
  var movie = require('../controllers/movievideoController');
  var search = require('../controllers/searchController')
  
  //Main
  app.route('/')
  .get(main.list_all);

  //AnimeReleases
  app.route('/releases')
  .get(releases.list_all);
  
  //RecentAnime
  app.route('/last')
  .get(last.list_all);

  //Animes
  app.route('/anime/:page?')
  .get(animes.list_all);

  //Movies
  app.route('/movies/:page?')
  .get(movies.list_all);

  //Anime Video
  app.route('/video/:url')
  .get(animevideo.list_all)

    //Movie Video
    app.route('/movie/:url')
    .get(movie.list_all)

  //Gender
  app.route('/gender/:gender/:page?')
  .get(gender.list_all);

  //Search
  app.route('/search/:anime')
  .get(search.list_all);


};
