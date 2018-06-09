import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Header } from 'semantic-ui-react';

import { fetchUser } from '../../actions/auth';
import { selectCurrentUser } from '../../reducers/selectors';

import UserDetailsCard from './UserDetailsCard';
import UserRoles from './UserRoles';
import UserCourses from './courses/UserCourses';
import UserCompetencies from './UserComps';

class UserLanding extends Component {
  componentDidMount() {
    const empId = this.props.match.params.id;
    const { fetchUser } = this.props;
    fetchUser(empId);
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
                <UserCompetencies />
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
  fetchUser
};

UserLanding = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLanding);

export default UserLanding;
