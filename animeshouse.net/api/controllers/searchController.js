'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');

exports.list_all = function(req, res) {
  var anime = req.params.anime; 
  var url = settings.base_path+'/?s=' + anime;

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
    $('.result-item').each(function(index, element){
      arr.push({
        image: $(element).find('img').attr('src'), 
        title: $(element).find('.details > .title').text(), 
        sinopse: $(element).find('.details > .contenido p').text(),
        data: $(element).find('.details > .meta > .year').text(),
        redirect: $(element).find('.details > .title > a').attr('href')
      })
    });

    res.json(arr);
  });
};