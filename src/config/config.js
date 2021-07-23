module.exports = {
  baseUrl:
  process.env.REACT_APP_NODE_ENV === 'local'
  ? 'http://localhost:3000'
  : process.env.REACT_APP_NODE_ENV === 'staging'
  ? 'https://back-pro.educap.io/api'
  : process.env.REACT_APP_NODE_ENV === 'homologation'
  ? 'https://h-back.educap.io/api'
  : process.env.REACT_APP_NODE_ENV === 'production'
  ? 'https://back.educap.io/api'
  : 'http://localhost:3000/api',

};

 