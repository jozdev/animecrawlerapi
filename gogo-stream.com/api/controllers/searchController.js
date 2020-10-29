'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');

exports.list_all = function(req, res) {
  var anime = req.params.anime; 
  var url = settings.base_path + '/search.html?keyword=' + anime;

  request(url, reqOptions, function(error, response, body) {

    if( response.statusCode !== 200 || error ){
      res.json({
        "err" : true,
        "msg" : "🔍 - Couldn't load anime search."
      });
      return;
    }

    var $ = cheerio.load(body);
    var arr = [];
    $('div[class="video_player followed  default"] > ul > li').each(function(index, element){
      arr.push({
        image: $(element).find('a > div[class="img"] > div[class="picture"] > img').attr('src'),
        title: $(element).find('a > div[class="name"]').text().replace(/\n/g,' ').replace('                         ','').replace('                     ',''),
        url: $(element).find('a').attr('href')
      })
    });

    res.json(arr);
  });
};