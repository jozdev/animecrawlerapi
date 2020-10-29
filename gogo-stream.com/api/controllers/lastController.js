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
        "msg" : "🔍 - Couldn't load last animes."
      });
      return;
    }

    console.log(new Date().getTime());

    var $ = cheerio.load(body);
    var arr = [];
    //ul[class="listing items"] > li[class="video-block"]
    $('div[class="video_player followed  default"] > ul > li').each(function(index, element){

      arr.push({
        image: $(element).find('a > div[class="img"] > div[class="picture"] > img').attr('src'),
        title: $(element).find('a > div[class="name"]').text().replace(/\n/g,' ').replace('                         ','').replace('                     ',''),
        url: $(element).find('a').attr('href')
      })
    
    });

    res.json(arr);
  });
}, 5000);
};
