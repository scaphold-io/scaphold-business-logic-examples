/*
  Every time a user is created in our Scaphold API, subscribe them
  to a list in mailchimp.
*/
var request = require('request');

// Edit these to target your mailchimp account and list.
const MAILCHIMP_API_KEY = 'XXXX';
const MAILCHIMP_LIST_ID = 'XXXX';
const MAILCHIMP_DC = 'XXXX';

/**
 * @param {object} ctx.data - Will contain the payload from our scaphold logic function
 */
module.exports = function(ctx, cb) {
  const userPayload = ctx.data;
  if (!userPayload.changedUser || !userPayload.changedUser.username) {
    return cb(
      new Error('The logic payload does not contain a username with an email address')
    );
  }

  var options = {
    url: 'https://' + MAILCHIMP_DC + '.api.mailchimp.com/3.0/lists/' + MAILCHIMP_LIST_ID + '/members',
    method: 'POST',
    headers: {
      'AUTHORIZATION': 'apikey ' + MAILCHIMP_API_KEY,
    },
    body: {
      email_address: userPayload.changedUser.username,
      status: 'subscribed',
    },
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
