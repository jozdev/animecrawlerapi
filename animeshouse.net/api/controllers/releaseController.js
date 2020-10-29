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
        "msg" : "🔍 - Couldn't load last releases."
      });
      return;
    }

    console.log(new Date().getTime());

    var $ = cheerio.load(body);
    var arr = [];
    $('article[class="item tvshows"]').each(function(index, element){

      arr.push({
        image: $(element).find('div[class="poster"] img').attr('src'), 
        title: $(element).find('div[class="data dfeatur"] h3').text(), 
        year: $(element).find('div[class="data dfeatur"] span').text(), 
        redirect: $(element).find('div[class="data dfeatur"] a').attr('href'),
      })
    
    });

    res.json(arr);
  });
};