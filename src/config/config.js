module.exports = {
  baseUrl:
  process.env.REACT_APP_NODE_ENV === 'local'
  ? 'http://localhost:3002'
  : process.env.REACT_APP_NODE_ENV === 'staging'
  ? 'https://back-pro.educap.io'
  : process.env.REACT_APP_NODE_ENV === 'homologation'
  ? 'https://h-back.educap.io'
  : process.env.REACT_APP_NODE_ENV === 'production'
  ? 'https://back.educap.io'
  : 'http://localhost:3002',

};

 