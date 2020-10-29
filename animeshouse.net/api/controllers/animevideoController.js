'use strict';

var cheerio = require('cheerio'),
    request = require('request'),
    settings = require('../settings'),
    reqOptions = require('../req-options');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.list_all = function(req, res) { 
  var xhttp = new XMLHttpRequest();
  var xhttp2 = new XMLHttpRequest();
  var xhttp3 = new XMLHttpRequest();
  var url = 'https://animeshouse.net/episodio/' + req.params.url;


  request(url, reqOptions, function(error, response, body) {

    if( response.statusCode !== 200 || error ){
      res.json({
        "err" : true,
        "msg" : "🔍 - Couldn't load anime video."
      });
      return;
    }

    var $ = cheerio.load(body);
    var arr = [];

    $('link[rel="shortlink"]').each(function(index, element){
      let id = $(element).attr('href').replace('https://animeshouse.net/?p=', ''); 
      xhttp.open("POST", "https://animeshouse.net/wp-admin/admin-ajax.php", true);  
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
      xhttp2.open("POST", "https://animeshouse.net/wp-admin/admin-ajax.php", true);  
      xhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
      xhttp3.open("POST", "https://animeshouse.net/wp-admin/admin-ajax.php", true);  
      xhttp3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
      xhttp.send("action=doo_player_ajax&post=" + id + "&nume=1&type=tv"); 
      xhttp2.send("action=doo_player_ajax&post=" + id + "&nume=2&type=tv"); 
      xhttp3.send("action=doo_player_ajax&post=" + id + "&nume=3&type=tv"); 

      xhttp.onload = function () {

        if (xhttp.readyState === xhttp.DONE || xhttp2.readyState === xhttp2.DONE || xhttp3.readyState === xhttp.DONE )   {
          if (xhttp.status === 200 || xhttp2.status === 200 || xhttp3.status === 200) {
            let animeres = xhttp.responseText.replace("<iframe class='metaframe rptss' src='", "").replace("' frameborder='0' scrolling='no' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "")
            let animeres2 = xhttp2.responseText.replace("<iframe class='metaframe rptss' src='", "").replace("' frameborder='0' scrolling='no' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "")
            let animeres3 = xhttp3.responseText.replace("<iframe class='metaframe rptss' src='", "").replace("' frameborder='0' scrolling='no' allow='autoplay; encrypted-media' allowfullscreen></iframe>", "")

            arr.push({
              player1: animeres.toString(),
              player2: animeres2.toString(),
              player3: animeres3.toString()
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
