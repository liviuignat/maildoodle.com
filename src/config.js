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
    title: 'maildoodle.com',
    description: 'Email templates for your software managed in cloud. Templating engine for emails stored in the cloud - edit, test and manage all your software business emails in one place.',
    tracking: {
      code: 'UA-75042452-1'
    },
    isTranslationsEnabled: false,
    meta: [
      {charset: 'utf-8'},
      {name: 'title', content: 'maildoodle.com'},
      {name: 'description', content: 'Email templates for your software managed in cloud. Templating engine for emails stored in the cloud - edit, test and manage all your software business emails in one place.'},
      {name: 'robots', content: 'index,follow'},
      {name: 'keywords', content: 'email, organize, cloud, edit, rest, api, access'},
      {name: 'audience', content: 'all'},
      {name: 'Content-Type', content: 'text/html; charset=utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {property: 'og:site_name', content: 'maildoodle.com'},
      {property: 'og:image', content: 'http://maildoodle.com/images/logo144x144.png'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: 'maildoodle'},
      {property: 'og:description', content: 'Email templates for your software managed in cloud. Templating engine for emails stored in the cloud - edit, test and manage all your software business emails in one place.'},
      {property: 'og:card', content: 'summary'},
      {property: 'og:site', content: '@maildoodle'},
      {property: 'og:creator', content: '@maildoodle'},
      {property: 'og:image:width', content: '50'},
      {property: 'og:image:height', content: '50'}
    ],
    link: [
      {rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'icon', type: 'image/ico', href: '/favicon.ico'}
    ]
  }
}, environment);
