import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  fetchCourses,
  fetchCourseTypes,
  fetchCourseLevels
} from '../../../actions/courses';

const CourseDashBoard = () => {
  const dispatch = useDispatch();

  dispatch(fetchCourses());
  dispatch(fetchCourseLevels());
  dispatch(fetchCourseTypes());

  return (
    <Card as={Link} to="/admin/course-tools" raised>
      <Card.Content>
        <Header as="h2">Courses</Header>
      </Card.Content>
      <Card.Content description="Add & Manage & View Courses" />
      <Card.Content extra />
    </Card>
  );
};

export default CourseDashBoard;
