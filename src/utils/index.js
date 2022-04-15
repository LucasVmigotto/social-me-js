/**
 *
 * Function that mount and return
 * a response to the request where
 * was used
 *
 * @param {object} response
 * @param {number} code
 * @param {object} payload
 * @returns The express response to the related
 * request
 */
const makeResponse = (response, code = 201, payload = {}) => response
  .status(code)
  .send({ ...payload})

module.exports = { makeResponse }
