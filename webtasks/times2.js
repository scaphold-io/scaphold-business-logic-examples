/**
 * A pre-opration function that multiplies the value of an input field by 2 before
 * being saved to the database.
 */

/**
 * @param {object} ctx.data - Will contain the payload from our scaphold logic function
 */
module.exports = function(ctx, cb) {
  var input = ctx.data.input;
  const result = {
    input: {
      value: input.value * 2
    }
  }
  cb(null, result);
};
