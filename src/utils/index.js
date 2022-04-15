const makeResponse = (response, code = 201, payload = {}) => response
  .status(code)
  .send({ ...payload})

module.exports = { makeResponse }
