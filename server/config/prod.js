module.exports = {
  seedAdmin: {
    userId: process.env.SEEDADMIN_ID,
    firstName: process.env.SEEDADMIN_FN,
    lastName: process.env.SEEDADMIN_LN,
    username: process.env.SEEDADMIN_UN,
    verified: process.env.SEEDADMIN_VERIFIED,
    isAdmin: process.env.SEEDADMIN_ISADMIN,
    isSuperAdmin: process.env.SEEDADMIN_ISSUPER,
    password: process.env.SEEDADMIN_PWD
  },
  seedAdminIT: {
    userId: process.env.SEEDADMIN_IT_ID,
    firstName: process.env.SEEDADMIN_IT_FN,
    lastName: process.env.SEEDADMIN_IT_LN,
    username: process.env.SEEDADMIN_IT_UN,
    verified: process.env.SEEDADMIN_IT_VERIFIED,
    isAdmin: process.env.SEEDADMIN_IT_ISADMIN,
    isSuperAdmin: process.env.SEEDADMIN_IT_ISSUPER,
    password: process.env.SEEDADMIN_IT_PWD
  }
};
