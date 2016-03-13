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
  parse: {
    options: {
      app_id: 'HrMPFQFNyOPjq8cR9i67xSyAzAggfJYwTetpDUwB',
      js_key: 'Pm8doOztn0N8iXfNzisX5RrV4r2y1wbbTKHxRoUr',
      api_key: 'a6It5RhMZ6Fdz7L5uRvWj3cPnGRBIISbYMh9CpX8'
    }
  },
  app: {
    title: 'maildoodle',
    description: 'Email template made easy.',
    meta: [
      {name: 'description', content: 'Email template made easy.'},
      {charset: 'utf-8'},
      {property: 'og:site_name', content: 'maildoodle'},
      {property: 'og:image', content: 'http://maildoodle.com/logo.png'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: 'maildoodle'},
      {property: 'og:description', content: 'Email template made easy.'},
      {property: 'og:card', content: 'summary'},
      {property: 'og:site', content: '@maildoodle'},
      {property: 'og:creator', content: '@maildoodle'},
      {property: 'og:image:width', content: '200'},
      {property: 'og:image:height', content: '200'}
    ]
  }
}, environment);
