import React from 'react';
import { isEmpty } from 'lodash';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AdminDeptBreadCrumb = ({ dept }) => {
  return (
    <Breadcrumb style={{ marginBottom: '2em' }}>
      <Breadcrumb.Section link as={Link} to="/admin/dept-tools">
        Department Tools
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section link as={Link} to="/admin/dept-views">
        Department Views
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right arrow" />
      <Breadcrumb.Section active>
        {isEmpty(dept)
          ? 'No Department found'
          : `Details for ${dept.departmentName}`}
      </Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default AdminDeptBreadCrumb;
