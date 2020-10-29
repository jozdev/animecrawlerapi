'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');

exports.list_all = function(req, res) {

  var url = settings.base_path + req.params.episode;

  request(url, reqOptions, function(error, response, body) {

    if( response.statusCode !== 200 || error ){
      res.json({
        "err" : true,
        "msg" : "🔍 - Couldn't load anime video."
      });
      return;
    }

    console.log(new Date().getTime());

    var $ = cheerio.load(body);
    var arr = [];
    $('iframe').each(function(index, element){

      arr.push({
        player1: $(element).attr('src')
      })
    
    });

    res.json(arr);
  });
};
