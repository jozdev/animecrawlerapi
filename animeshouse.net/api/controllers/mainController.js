'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');

exports.list_all = function(req, res) {

  var url = settings.base_path;

  request(url, reqOptions, function(error, response, body) {

    if( response.statusCode !== 200 || error ){
      res.json({
        "err" : true,
        "msg" : "🔍 - Couldn't load our API."
      });
      return;
    }

    console.log(new Date().getTime());

    var $ = cheerio.load(body);
    var arr = [];
    var arr2 = []
      arr.push({
        title: 'AnimesHouse Crawler API - 🔥💪🌍', 
        author: 'jozdev',
        entries: [
            {
        'NewAnimeReleases': '/releases',
        'LastAnimesEpisodesAdded': '/last',
        'AllAnimes': '/anime/[:page]',
        'AllMovies': '/movies/[:page]',
        'Gender': '/gender/[:gender]/[:page]',
        'Search': '/search/[:anime]',
        'GetAnimeVideo': '/video/[black-clover-episodio-130-legendado-hd]',
        'GetMovieVideo': '/movie/[kono-subarashii-sekai-ni-shukufuku-wo-kurenai-densetsu]'
            }
        ]

      })
   

    res.json(arr);

  });
};
