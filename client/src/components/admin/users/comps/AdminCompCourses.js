import React from 'react';
import { List } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import { courseForCompsCheck } from '../../../../utils/compHelpers';
import { selectUserManageCoursesCurrent } from '../../../../reducers/selectors/adminSelectors';

const AdminCompCourses = ({ courses }) => {
  const userCoursesCurrent = useSelector(selectUserManageCoursesCurrent);

  return (
    <>
      {courses.map((course) => {
        return (
          <List.Item key={course._id}>
            <List.Icon
              name="certificate"
              color={
                courseForCompsCheck(course, userCoursesCurrent)
                  ? 'green'
                  : 'red'
              }
            />
            <List.Content>
              <List.Header>{course.courseName}</List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </>
  );
};

export default AdminCompCourses;
