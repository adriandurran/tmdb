import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Item, Header, Segment } from 'semantic-ui-react';

import {
  selectCurrentUser,
  selectUserRoleComps
} from '../../reducers/selectors/userSelectors';

// import _ from 'lodash';
import { selectUserCompetenciesCurrent } from '../../reducers/selectors/userSelectors';

class UserComps extends Component {
  // renderToolBar(rcomp, ucomp) {
  //   let compComp = _.intersection(rcomp, ucomp);
  //   return (
  //     <Toolbar>
  //       <div style={{ flex: '1' }}>
  //         <Typography variant="title">Competencies</Typography>
  //       </div>
  //       {compComp.length < rcomp.length && (
  //         <Tooltip
  //           id="comp-warning"
  //           title="User does not have the required competencies for this role!"
  //         >
  //           <WarningIcon style={{ color: 'red' }} />
  //         </Tooltip>
  //       )}
  //       {compComp.length >= rcomp.length && (
  //         <Tooltip
  //           id="comp-ok"
  //           title="User has the required competencies for this role"
  //         >
  //           <CheckCircleIcon style={{ color: 'green' }} />
  //         </Tooltip>
  //       )}
  //     </Toolbar>
  //   );
  // }

  renderReqComps() {
    const { reqComps } = this.props;
    return reqComps.map(comp => {
      return (
        <Item key={comp._id}>
          <Item.Content>
            <Item.Header>{comp.compName}</Item.Header>
            <Item.Extra>
              {comp.courses.length} Courses required for this Competency
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  renderCurrentComps() {
    const { currentComps } = this.props;
    return currentComps.map(comp => {
      return (
        <Item key={comp._id}>
          <Item.Content>
            <Item.Header>{comp._id}</Item.Header>
            {/* <Item.Extra>
              {comp.courses.length} Courses required for this Competency
            </Item.Extra> */}
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    // const { user, userCurrentComps } = this.props;
    return (
      <div>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Competencies
            <Header.Subheader>Required</Header.Subheader>
          </Header>
          <Item.Group>{this.renderReqComps()}</Item.Group>
        </Segment>
        <Segment padded>
          <Header as="h2" textAlign="center">
            Competencies
            <Header.Subheader>Current</Header.Subheader>
          </Header>
          <Item.Group>{this.renderCurrentComps()}</Item.Group>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state),
    reqComps: selectUserRoleComps(state),
    currentComps: selectUserCompetenciesCurrent(state)
  };
};

UserComps = connect(mapStateToProps)(UserComps);
export default UserComps;
