/*
  Pre-operation function that auto-increment the orderNo field every timea new purchase is made.
*/
var request = require('request');
var lodash = require('lodash');

/**
 * @param {object} ctx.data - Will contain the payload from our scaphold logic function
 */
module.exports = function(ctx, cb) {
  var purchasePayload = ctx.data.input;

  var options = {
    url: 'https://us-west-2.api.scaphold.io/graphql/my-awesome-app',
    method: 'POST',
    body: {
      query: 'query GetTopOrderNo { viewer { allPurchases(orderBy:[{ field: orderNo, direction: DESC }], first: 1) { edges { node { orderNo } } } } }',
    },
    json: true,
  };

  request(options, function (err, res, body) {
    var lastOrderNo = lodash.get(body, 'data.viewer.allPurchases.edges.0.node.orderNo', 0);
    purchasePayload.orderNo = lastOrderNo + 1;
    var result = {
      input: purchasePayload
    };
    cb(null, result);
  });
};