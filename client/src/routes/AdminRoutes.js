import React, { lazy } from 'react';

import { LazyComponent, PrivateAdminRoute } from './routeHelpers';

//Dashboard
const AdminDashBoard = lazy(() =>
  import('../components/admin/dashboard/AdminDashboard')
);
const AdminDeptView = lazy(() =>
  import('../components/admin/departments/AdminDeptView')
);

// TOOLS
const AdminDeptTools = lazy(() =>
  import('../components/admin/departments/AdminDeptTools')
);

const AdminApplicationTools = lazy(() =>
  import('../components/admin/apptools/AdminApplicationTools')
);
const AdminCourseTools = lazy(() =>
  import('../components/admin/courses/AdminCourseTools')
);

const AdminCourseManager = lazy(() =>
  import('../components/admin/courses/AdminCourseManager')
);

const AdminDeptManager = lazy(() =>
  import('../components/admin/departments/AdminDeptManager')
);
const AdminDeptCards = lazy(() =>
  import('../components/admin/departments/AdminDeptCards')
);
const AdminDeptUserView = lazy(() =>
  import('../components/admin/departments/AdminDeptUserView')
);

const AdminUsersNoDeptTable = lazy(() =>
  import('../components/admin/users/dept/AdminUsersNoDeptTable')
);

// courses

const AdminCourseTypes = lazy(() =>
  import('../components/admin/courses/AdminCourseTypes')
);
const AdminCourseLevels = lazy(() =>
  import('../components/admin/courses/AdminCourseLevels')
);
const AdminUserCseManager = lazy(() =>
  import('../components/admin/users/courses/AdminUserCseManager')
);
const AdminCourseView = lazy(() =>
  import('../components/admin/courses/AdminCourseView')
);

// ojts

//comps
const AdminCompManager = lazy(() =>
  import('../components/admin/competencies/AdminCompManager')
);
const AdminCompetencyView = lazy(() =>
  import('../components/admin/competencies/AdminCompetencyView')
);
const AdminCompTools = lazy(() =>
  import('../components/admin/competencies/AdminCompTools')
);

// roles
const AdminRoleManager = lazy(() =>
  import('../components/admin/roles/AdminRoleManager')
);
const AdminRoleView = lazy(() =>
  import('../components/admin/roles/AdminRoleView')
);
const AdminRoleTools = lazy(() =>
  import('../components/admin/roles/AdminRoleTools')
);

// user
const AdminUserAccess = lazy(() =>
  import('../components/admin/users/access/AdminUserAccess')
);
const AdminUserManager = lazy(() =>
  import('../components/admin/users/roles/AdminUserManager')
);

const AllUserView = lazy(() => import('../components/admin/users/AllUserView'));
const AdminUserTools = lazy(() =>
  import('../components/admin/users/AdminUserTools')
);

const AppFeedbackManager = lazy(() =>
  import('../components/feedback/AppFeedbackManager')
);

const AdminOJTTools = lazy(() =>
  import('../components/admin/onjobtraining/AdminOJTTools')
);

const AdminRoutes = () => {
  const user = null;
  return (
    <>
      <PrivateAdminRoute
        user={user}
        path="/admin/dashboard"
        component={LazyComponent(AdminDashBoard)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/dept-tools"
        component={LazyComponent(AdminDeptTools)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/dept-manager/view/:id"
        component={LazyComponent(AdminDeptView)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/app-tools"
        component={LazyComponent(AdminApplicationTools)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/course-tools"
        component={LazyComponent(AdminCourseTools)}
      />

      <PrivateAdminRoute
        user={user}
        exact
        path="/admin/course-manager"
        component={LazyComponent(AdminCourseManager)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/course-types"
        component={LazyComponent(AdminCourseTypes)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/course-levels"
        component={LazyComponent(AdminCourseLevels)}
      />
      <PrivateAdminRoute
        user={user}
        exact
        path="/admin/course-manager/view/:id"
        component={LazyComponent(AdminCourseView)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/ojt-tools"
        component={LazyComponent(AdminOJTTools)}
      />
      {/* <PrivateAdminRoute
          user={user}
          path="/admin/ojt-manager"
          component={LazyComponent(AdminOJTManager)}
        /> */}
      <PrivateAdminRoute
        user={user}
        path="/admin/comp-tools"
        component={LazyComponent(AdminCompTools)}
      />
      <PrivateAdminRoute
        user={user}
        exact
        path="/admin/comp-manager"
        component={LazyComponent(AdminCompManager)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/comp-manager/view/:id"
        component={LazyComponent(AdminCompetencyView)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/role-tools"
        component={LazyComponent(AdminRoleTools)}
      />
      <PrivateAdminRoute
        exact
        user={user}
        path="/admin/role-manager"
        component={LazyComponent(AdminRoleManager)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/role-manager/view/:id"
        component={LazyComponent(AdminRoleView)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/user-tools"
        component={LazyComponent(AdminUserTools)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/user-access-manager"
        component={LazyComponent(AdminUserAccess)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/user-manager"
        component={LazyComponent(AdminUserManager)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/user-views"
        component={LazyComponent(AllUserView)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/user-courses-manager"
        component={LazyComponent(AdminUserCseManager)}
      />

      <PrivateAdminRoute
        exact
        user={user}
        path="/admin/dept-manager"
        component={LazyComponent(AdminDeptManager)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/dept-views"
        component={LazyComponent(AdminDeptCards)}
      />
      <PrivateAdminRoute
        user={user}
        path="/admin/dept-user-view/:id"
        component={LazyComponent(AdminDeptUserView)}
      />

      <PrivateAdminRoute
        user={user}
        path="/admin/users-no-dept"
        component={LazyComponent(AdminUsersNoDeptTable)}
      />
      <PrivateAdminRoute
        user={user}
        path="/application/feedback-manager"
        component={LazyComponent(AppFeedbackManager)}
      />
    </>
  );
};

export default function() {
  return AdminRoutes;
}
