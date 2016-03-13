require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  app: {
    title: 'maildoodle',
    description: 'Email templates managed in cloud.',
    tracking: {
      code: 'UA-75042452-1'
    },
    isTranslationsEnabled: false,
    meta: [
      {name: 'description', content: 'Email templates managed in cloud.'},
      {charset: 'utf-8'},
      {property: 'og:site_name', content: 'maildoodle'},
      {property: 'og:image', content: 'http://maildoodle.com/logo.png'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: 'maildoodle'},
      {property: 'og:description', content: 'Email templates managed in cloud.'},
      {property: 'og:card', content: 'summary'},
      {property: 'og:site', content: '@maildoodle'},
      {property: 'og:creator', content: '@maildoodle'},
      {property: 'og:image:width', content: '200'},
      {property: 'og:image:height', content: '200'}
    ]
  }
}, environment);
