import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import rootStyles from '../../styles/rootStyle';

import {
  selectUserRoleComps,
  selectUserCoursesCurrent
} from '../../reducers/selectors';

let EnhanceRoleToolbar = () => {
  return (
    <Toolbar>
      <div style={{ flex: '0 0 auto' }}>
        <Typography variant="title">Competencies</Typography>
      </div>
    </Toolbar>
  );
};

class UserComps extends Component {
  renderRoleComps(comps) {
    return comps.map((comp, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{comp.compname}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const { classes, userRoleComps } = this.props;
    return (
      <Paper>
        <EnhanceRoleToolbar />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Required</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderRoleComps(userRoleComps)}</TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoleComps: selectUserRoleComps(state),
    userCurCor: selectUserCoursesCurrent(state)
  };

  // iterate of the courses state to get the full details
  // compare pass date and validity
  // merge (or ignore courses past validity)
  // iterate over the comps state and check combination of user courses = competency
  // some things to think about....if the user has the courses for a  competency....but one of his courses
  // has expired...do we show the competency? Do we highlight this to the user in some way?
  // I think we need to tie the courses and competencies together in a clearly understandable way
  // added this to a pr and seperate branch
};

UserComps = withStyles(rootStyles)(UserComps);

export default connect(mapStateToProps)(UserComps);
