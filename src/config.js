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
    isTranslationsEnabled: false,
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'maildoodle',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'maildoodle',
        'og:description': 'email templates have never been easier'
      }
    }
  }
}, environment);
