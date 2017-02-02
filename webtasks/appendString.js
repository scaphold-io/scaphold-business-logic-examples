/**
 * A pre-operation function that passes metadata to future functions in the composition.
 */

/**
 * @param {object} ctx.data - Will contain the payload from our scaphold logic function
 */
module.exports = function(ctx, cb) {
  var input = ctx.data.input;
  const result = {
    input: input,
    metadata: {
      stringFieldPassedToAllFutureFunctions: "Hello, World!"
    }
  }
  cb(null, result);
};
