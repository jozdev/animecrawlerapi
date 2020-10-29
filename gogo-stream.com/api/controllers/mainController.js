'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');

exports.list_all = function(req, res) {

  var url = settings.base_path;
  setInterval(function(){
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
        title: 'gogo-stream.com Crawler API - 🔥💪🌍', 
        author: 'jozdev',
        entries: [
            {
        'LastAnimesEpisodesAdded': '/last',
        'Search': '/search/[:anime]',
        'GetAnimeVideo': '/videos/kami-no-tou-episode-13',
            }
        ]

      })
   

    res.json(arr);

  });
}, 5000);
};
