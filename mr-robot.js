// Description:
//   Countdown until next Mr. Robot episode, from episodate.com.
//
//  Dependencies:
//    cheerio
//    string
//
// Commands:
//   hubot mrrobot
//
// Author:
//   @jorgeepunan

var cheerio = require('cheerio');
var S       = require('string');
var moment  = require('moment');
var countdown  = require('moment-countdown');

module.exports = function(robot) {
  robot.respond(/mrrobot/i, function(msg) {

    var url = 'https://www.episodate.com/tv-show/mr-robot';

    msg.robot.http(url).get()(function(err, res, body) {
      var $ = cheerio.load(body);
      if (res.statusCode !== 200 || body === 'ERROR') {
        return msg.reply('ERROR. Try again.');
      }
      var cleanTitle  = S( $('.site-tv-show .row.text-center h3.text-size-25.margin-bottom-15').text() ).stripTags().s;
      var cleanNext   = S( $('#countdownTime').next().find('a').text() ).stripTags().s;
      var nextEpisode  = $('#countdownTime').attr('data-date');

      msg.send( cleanTitle + ': ' + moment(nextEpisode,'MMMM Do YYYY, h:mm:ss a').countdown().toString() + '.\n' +  cleanNext);

    });

  });
};
