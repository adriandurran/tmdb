const User = require('../models/user');
const UserController = require('../controllers/userController');

module.exports = async () => {
  // check if the super admin & it admin

  // IT Admin
  const ITAdmin = await User.find({ username: process.env.SEEDADMIN_IT_UN });

  if (!ITAdmin) {
    try {
      await UserController.seedSuperAdminIT();
    } catch (error) {
      console.log('Unable to seed IT Admin', error);
    }
  }

  // Super Admin
  const SuperAdmin = await User.find({ username: process.env.SEEDADMIN_UN });

  if (!SuperAdmin) {
    try {
      await UserController.seedSuperAdmin();
    } catch (error) {
      console.log('Unable to seed Super Admin', error);
    }
  }
};
