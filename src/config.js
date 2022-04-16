module.exports = {

  API_PORT: process.env.API_PORT || 7200,

  API_HOST: process.env.API_HOST || '0.0.0.0',

  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key',

  JWT_EXP: process.env.JWT_EXP || '7d',

  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING || 'postgresql://admin:rootroot@social-me-pgsql/social_me_db',

  PG_POOL_MIN: 2,

  PG_POOL_MAX: 4,

  MAILHOG_HOST: process.env.MAILHOG_HOST || 'social-me-mailhog',

  MAILHOG_PORT: process.env.MAILHOG_PORT || 1025,

  SOCIAL_ME_EMAIL_NAME: process.env.SOCIAL_ME_EMAIL_NAME || 'Social.ME',
  SOCIAL_ME_EMAIL_ADDR: process.env.SOCIAL_ME_EMAIL_ADDR || 'no-reply@social.me',

  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  NODE_ENV: process.env.NODE_ENV || 'dev'
}
