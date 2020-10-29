'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.list_all = function(req, res) {  
  var xhttp = new XMLHttpRequest();
  var url = 'https://animeshouse.net/filme/' + req.params.url;

  request(url, reqOptions, function(error, response, body) {

    if( response.statusCode !== 200 || error ){
      res.json({
        "err" : true,
        "msg" : "🔍 - Couldn't load movie video."
      });
      return;
    }

    var $ = cheerio.load(body);
    var arr = [];
    $('link[rel="shortlink"]').each(function(index, element){
      let id = $(element).attr('href').replace('https://animeshouse.net/?p=', ''); 
      xhttp.open("POST", "https://animeshouse.net/wp-admin/admin-ajax.php", true);  //POST REQUEST 
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
      xhttp.send("action=doo_player_ajax&post=" + id + "&nume=1&type=movie"); //SEND TO POST
      xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
          if (xhttp.status === 200) {
            let movieresponse = xhttp.responseText.replace("<iframe class='metaframe rptss' src='", "").replace("' frameborder='0' scrolling='no' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "")
            arr.push({
              video: movieresponse.toString()
            })
          } 
        } else {
        console.log('error');
      }
      res.json(arr);
    }
    });


  });
};