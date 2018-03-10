import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';
import { selectUserName } from '../../reducers/selectors';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import rootStyles from '../../styles/rootStyle';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import UserRoles from './UserRoles';
import UserCourses from './UserCourses';
import UserCourseAdder from './UserCourseAdder';

class User extends Component {
  componentDidMount() {
    const empId = this.props.match.params.id;
    const { fetchUser } = this.props;
    fetchUser(empId);
  }

  renderEmpInfo() {
    const { authUser } = this.props;
    if (!authUser.verified || '') {
      return (
        <div className="center-align">
          <h3>Awaiting account verfication</h3>
        </div>
      );
    } else {
      return (
        <Grid container>
          <Grid item xs={6}>
            <UserRoles />
          </Grid>
          <Grid item xs={6}>
            {/* <UserComps ucomps={authUser.courses} /> */}
          </Grid>
          <Grid item xs={12}>
            <UserCourses />
          </Grid>
          <Grid item xs={12}>
            <UserCourseAdder />
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Card raised className={classes.card}>
        <CardContent>
          <CardHeader>
            <Typography>User</Typography>
          </CardHeader>
          {this.renderEmpInfo()}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.user,
    userName: selectUserName(state)
  };
};

const mapDispatchToProps = { fetchUser };

User = withStyles(rootStyles)(User);

export default withRoot(connect(mapStateToProps, mapDispatchToProps)(User));
