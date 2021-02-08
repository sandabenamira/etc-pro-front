module.exports = {
  baseUrl:
  process.env.REACT_APP_NODE_ENV === 'local'
  ? 'http://localhost:3000/api'
  : process.env.REACT_APP_NODE_ENV === 'staging'
  ? 'https://back-pro.educap.io/api'
  : process.env.REACT_APP_NODE_ENV === 'homologation'
  ? 'https://h-back.educap.io/api'
  : process.env.REACT_APP_NODE_ENV === 'production'
  ? 'https://back.educap.io/api'
  : 'http://localhost:3000/api',

  roleIdSuperAdmin: 1,
  roleIdAdmin: 2,
  roleIdProfessor: 3,
  roleIdParent: 4,
  roleIdStudent: 5,
  roleIdSupervisor: 6,
  roleIdDirector: 7,
  frequencyMonthly: 4,
  frequencyQuarterly: 5,
  frequencyAnnually: 7,
  unpaidInvoice: 0,
  partiallyPaidInvoice: 1,
  billPaid: 2,
  lateInvoice: 3,
  privateStatus:2,
  publicStatus:1,
  allStatus:0
};

 