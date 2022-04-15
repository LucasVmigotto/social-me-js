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

/**
 * Function that mount email
 * address in necessary pattern
 * as <name> <email>
 *
 * @param {object} info
 * @param {string} info.name
 * @param {string} info.email
 * @returns {string} The string
 * with the necessary format
 */
const mountAddress = ({ name, email }) =>
  `${name} <${email}>`

module.exports = {
  makeResponse,
  mountAddress
}
