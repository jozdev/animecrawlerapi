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
        "msg" : "🔍 - Couldn't load last animes."
      });
      return;
    }

    console.log(new Date().getTime());

    var $ = cheerio.load(body);
    var arr = [];
    $('article[class="item se episodes"]').each(function(index, element){

      arr.push({
        image: $(element).find('div[class="poster"] img').attr('src'), 
        title: $(element).find('div[class="data"] h3').text(), 
        episode: $(element).find('div[class="data"] .epi').text(),
        url: $(element).find('div[class="data"] a').attr('href').replace('https://animeshouse.net/episodio/',''),
      })
    
    });

    res.json(arr);
  });
};
