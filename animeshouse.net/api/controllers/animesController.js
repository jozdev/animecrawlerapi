'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');

exports.list_all = function(req, res) {
  var page = !isNaN(Number(req.params.page)) ? req.params.page : 1; 
  var url = settings.base_path+'/anime/page/'+page;

  request(url, reqOptions, function(error, response, body) {

    if( response.statusCode !== 200 || error ){
      res.json({
        "err" : true,
        "msg" : "🔍 - Couldn't load animes."
      });
      return;
    }

    var $ = cheerio.load(body);
    var arr = [];
    $('div[class="animation-2 items"] > article[class="item tvshows"]').each(function(index, element){
      arr.push({
        image: $(element).find('div[class="poster"] > img').attr('src'), 
        title: $(element).find('div[class="data"] > h3').text(), 
        sinopse: $(element).find('div[class="texto"]').text(),
        genres: $(element).find('div[class="mta"] a').text(),
        data: $(element).find('div[class="data"] span').text(),
        redirect: $(element).find('div[class="data"] > h3 > a').attr('href')
      })
    });

    res.json(arr);
  });
};