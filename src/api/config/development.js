export default {
  mongodb: {
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/maildoodle'
  },
  componentsApiUrl: process.env.COMPONENTS_API_URI || 'http://localhost:4000/api'
};
