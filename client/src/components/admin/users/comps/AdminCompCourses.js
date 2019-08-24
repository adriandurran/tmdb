import React from 'react';
import { List } from 'semantic-ui-react';

const AdminCompCourses = ({ courses }) => {
  return (
    <>
      {courses.map((course, i) => {
        return (
          <List.Item key={course._id + i}>
            <List.Icon name="book" />
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
