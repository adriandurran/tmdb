import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';

import { Item, Header, Segment, Icon } from 'semantic-ui-react';

import {
  selectUserCompetenciesCurrent,
  selectUserRoleComps
} from '../../reducers/selectors/userSelectors';

import { compExist } from '../../utils/arrayhelpers';

class UserComps extends Component {
  renderReqComps() {
    const { reqComps, currentComps } = this.props;
    return reqComps.map(comp => {
      return (
        <Item key={comp._id}>
          <Item.Content>
            <Item.Header>
              {compExist(comp, currentComps) ? (
                <Icon name="check circle" color="green" />
              ) : (
                <Icon name="exclamation circle" color="red" />
              )}
              {comp.compName}
            </Item.Header>
            {compExist(comp, currentComps) ? (
              ''
            ) : (
              <Item.Description style={{ color: 'red' }}>
                You do not have this Competency or the required courses for this
                Competency are out of date.
              </Item.Description>
            )}
            <Item.Extra>
              {comp.courses.length} Courses required for this Competency
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  }

  // add a line for when the comp expires
  renderCurrentComps() {
    const { currentComps } = this.props;
    return currentComps.map(comp => {
      return (
        <Item key={comp._id}>
          <Item.Content>
            <Item.Header>{comp.compName}</Item.Header>
            {/* <Item.Extra>
              {comp.courses.length} Courses required for this Competency
            </Item.Extra> */}
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
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
    reqComps: selectUserRoleComps(state),
    currentComps: selectUserCompetenciesCurrent(state)
  };
};

UserComps = connect(mapStateToProps)(UserComps);

export default UserComps;
