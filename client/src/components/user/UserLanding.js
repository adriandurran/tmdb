import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Header } from 'semantic-ui-react';

import { fetchRoles } from '../../actions/roles';
import { fetchComps } from '../../actions/comps';
import { fetchCourses } from '../../actions/courses';
import { selectCurrentUser } from '../../reducers/selectors/userSelectors';

import UserDetailsCard from './UserDetailsCard';
import UserRoles from './UserRoles';
import UserCourses from './courses/UserCourses';
import UserComps from './comps/UserComps';
import UserReqComps from './comps/UserReqComps';

class UserLanding extends Component {
  componentDidMount() {
    const { fetchRoles, fetchComps, fetchCourses } = this.props;
    fetchRoles();
    fetchComps();
    fetchCourses();
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        {!user.verified || '' ? (
          <Header as="h2" textAlign="center">
            Awaiting account verfication
          </Header>
        ) : (
          <Grid>
            <Grid.Row columns={3} centered>
              <Grid.Column>
                <UserDetailsCard />
              </Grid.Column>
              <Grid.Column>
                <UserRoles />
              </Grid.Column>
              <Grid.Column>
                <UserReqComps />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <UserComps />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <UserCourses />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

const mapDispatchToProps = {
  fetchRoles,
  fetchComps,
  fetchCourses
};

UserLanding = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLanding);

export default UserLanding;
