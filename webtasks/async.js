/*
  An example async operation that posts to some other service.
*/
var request = require('request');

/**
 * @param {object} ctx.data - Will contain the payload from our scaphold logic function
 */
module.exports = function(ctx, cb) {
  const postPayload = ctx.data;

  var options = {
    url: 'http://requestb.in/u3i3oeu3',
    method: 'POST',
    body: postPayload,
    json: true,
  };

  request(options, function (err, res, body) {
    if (err) {
      cb(err);
    } else if (res.statusCode >= 400) {
      // Mailchimp will return an error code of 400+ in res.
      cb(res);
    }
    cb(null, res);
  });
};
