module.exports = {
  mongoURI: process.env.MONGODB_URI,
  cookieKey: process.env.COOKIE_KEY,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  seedAdmin: {
    userId: process.env.SEEDADMIN_ID,
    firstName: process.env.SEEDADMIN_FN,
    lastName: process.env.SEEDADMIN_LN,
    username: process.env.SEEDADMIN_UN,
    verified: process.env.SEEDADMIN_VERIFIED,
    isAdmin: process.env.SEEDADMIN_ISADMIN,
    isSuperAdmin: process.env.SEEDADMIN_ISSUPER,
    password: process.env.SEEDADMIN_PWD
  }
};
