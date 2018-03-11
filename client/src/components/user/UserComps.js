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
import Grid from 'material-ui/Grid';
import WarningIcon from 'material-ui-icons/Warning';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';
import Tooltip from 'material-ui/Tooltip';
import _ from 'lodash';
import {
  selectUserRoleComps,
  selectUserCompetenciesCurrent
} from '../../reducers/selectors';

class UserComps extends Component {
  renderToolBar(rcomp, ucomp) {
    let compComp = _.intersection(rcomp, ucomp);
    return (
      <Toolbar>
        <div style={{ flex: '1' }}>
          <Typography variant="title">Competencies</Typography>
        </div>
        {compComp.length < rcomp.length && (
          <Tooltip
            id="comp-warning"
            title="User does not have the required competencies for this role!"
          >
            <WarningIcon style={{ color: 'red' }} />
          </Tooltip>
        )}
        {compComp.length >= rcomp.length && (
          <Tooltip
            id="comp-ok"
            title="User has the required competencies for this role"
          >
            <CheckCircleIcon style={{ color: 'green' }} />
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  renderRoleComps(comps) {
    return comps.map((comp, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{comp.compname}</TableCell>
        </TableRow>
      );
    });
  }

  renderUserComps(comps) {
    return comps.map((comp, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{comp.compname}</TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const { userRoleComps, userCurrentComps } = this.props;
    return (
      <Paper>
        {this.renderToolBar(userRoleComps, userCurrentComps)}
        <Grid container spacing={8}>
          <Grid item>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Required</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.renderRoleComps(userRoleComps)}</TableBody>
            </Table>
          </Grid>
          <Grid item>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Current</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.renderUserComps(userCurrentComps)}</TableBody>
            </Table>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoleComps: selectUserRoleComps(state),
    userCurrentComps: selectUserCompetenciesCurrent(state)
  };
};

UserComps = withStyles(rootStyles)(UserComps);

export default connect(mapStateToProps)(UserComps);
