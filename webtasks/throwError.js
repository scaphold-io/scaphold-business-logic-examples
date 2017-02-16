/**
 * A pre-opration function that throws and error thus invalidating the mutation.
 */

/**
 * @param {object} ctx.data - Will contain the payload from our scaphold logic function
 */
module.exports = function(ctx, cb) {
  cb("SOMETHING WENT WRONG!!!", null);
};
