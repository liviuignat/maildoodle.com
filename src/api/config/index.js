import development from './development';

const env = process.env.NODE_ENV;

const configs = {
  integration_tests: require('./integration_tests'),
  qa: require('./qa'),
  production: require('./production')
};

export default Object.assign({}, development, configs[env]);
