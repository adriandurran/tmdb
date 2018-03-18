import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';
import { selectUserName } from '../../reducers/selectors';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import rootStyles from '../../styles/rootStyle';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import UserRoles from './UserRoles';
import UserCourses from './UserCourses';

import UserCompetencies from './UserComps';

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
        <Typography variant="display3" gutterBottom align="center">
          Awaiting account verfication
        </Typography>
      );
    } else {
      return (
        <Grid container>
          <Grid item>
            <UserRoles />
          </Grid>
          <Grid item>
            <UserCompetencies />
          </Grid>
          <Grid item xs={12}>
            <UserCourses />
          </Grid>
          {/* <Grid item xs={12}>
            <UserCourseAdder />
          </Grid> */}
        </Grid>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Card raised className={classes.card}>
        <CardContent>{this.renderEmpInfo()}</CardContent>
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
