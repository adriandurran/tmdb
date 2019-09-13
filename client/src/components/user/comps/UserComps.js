import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment, Card } from 'semantic-ui-react';

import { fetchRoles } from '../../../actions/roles';
import { fetchComps } from '../../../actions/comps';
import { fetchCourses } from '../../../actions/courses';

import {
  selectUserCompetenciesCurrent,
  selectUserCoursesCurrent
} from '../../../reducers/selectors/userSelectors';

import UserCurrentComps from './UserCurrentComps';

const UserComps = () => {
  const currentComps = useSelector(selectUserCompetenciesCurrent);
  const userCourses = useSelector(selectUserCoursesCurrent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchComps());
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div>
      <Segment padded>
        <Header as="h2" textAlign="center">
          Competencies
          <Header.Subheader>Current</Header.Subheader>
        </Header>
        <Card.Group centered itemsPerRow={2}>
          <UserCurrentComps
            currentComps={currentComps}
            userCourses={userCourses}
          />
        </Card.Group>
      </Segment>
    </div>
  );
};

export default UserComps;
