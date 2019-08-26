const User = require('../models/user');
const UserController = require('../controllers/userController');

module.exports = async () => {
  // check if the super admin & it admin

  // IT Admin
  const ITAdmin = await User.find({ username: process.env.SEEDADMIN_IT_UN });
  // if (ITAdmin) {
  //   try {
  //     const noRoles = await User.findByIdAndUpdate(
  //       ITAdmin[0]._id,
  //       { $set: { roles: [], department: {} } },
  //       { fields: { passwordHash: 0 }, new: true }
  //     );
  //     console.log('noRoles', noRoles);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  if (!ITAdmin) {
    try {
      await UserController.seedSuperAdminIT();
      console.log('Super IT Admin has been seeded');
    } catch (error) {
      console.log('Unable to seed IT Admin', error);
    }
  }

  // Super Admin
  const SuperAdmin = await User.find({ username: process.env.SEEDADMIN_UN });

  if (!SuperAdmin) {
    try {
      await UserController.seedSuperAdmin();
      console.log('Super Admin has been seeded');
    } catch (error) {}
  }
};
