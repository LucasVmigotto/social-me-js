const Knex = require('knex')
const debug = require('debug')('api:knex')

exports.createKnex = ({ config, logger }) => {

  const knex = Knex({
    client: 'pg',
    connection: config.PG_CONNECTION_STRING,
    pool: {
      min: parseInt(config.PG_POOL_MIN, 10) || 2,
      max: parseInt(config.PG_POOL_MAX, 10) || 4
    }
  })

  knex.on('query-error', (err, { sql, bindings }) => {

    logger.error(err.message, { sql, bindings, detail: err.detail })

  })

  if (debug.enabled) {

    knex.on('query', ({ sql, bindings }) => {

      debug(sql, bindings)

    })

    const destroy = knex.destroy

    knex.destroy = function (...args) {

      knex.emit('destroy')

      return destroy.call(this, ...args)

    }

  }

  return knex

}
