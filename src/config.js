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
    title: 'Email templates',
    description: 'Generic HTML email templates',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Email templates',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Email templates',
        'og:description': 'Generic HTML email templates'
      }
    }
  }
}, environment);
