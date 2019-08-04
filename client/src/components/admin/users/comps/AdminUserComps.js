import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { List, Header, Accordion, Icon } from 'semantic-ui-react';

import {
  selectUserManage,
  selectUserManageCompetenciesCurrent
} from '../../../../reducers/selectors/adminSelectors';

import { compExist } from '../../../../utils/arrayhelpers';

import { fetchComps } from '../../../../actions/comps';

class AdminUserComps extends Component {
  state = { activeIndex: 0 };

  componentDidMount() {
    this.props.fetchComps();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderRoleReqComps() {
    const { activeIndex } = this.state;
    const { user } = this.props;
    if (!isEmpty(user)) {
      return user.roles.map((role, i) => {
        return (
          <>
            <Accordion.Title
              active={activeIndex === i}
              index={i}
              onClick={this.handleClick}
              key={role._id}
            >
              <Icon name="dropdown" />
              {role.roleName}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === i} key={role._id + i}>
              <List divided verticalAlign="middle">
                {this.renderReqComps(role.competencies)}
              </List>
            </Accordion.Content>
          </>
        );
      });
    }
  }

  renderReqComps(comps) {
    const { currentComps } = this.props;

    return comps.map((comp) => {
      let compSt = 'Required';
      if (comp.compType) {
        compSt = comp.compType.compType;
      }
      return (
        <List.Item key={comp._id}>
          {compExist(comp, currentComps) ? (
            <List.Icon
              name="check circle"
              color="green"
              size="large"
              verticalAlign="middle"
            />
          ) : (
            <List.Icon
              name={
                compSt === 'Required'
                  ? 'exclamation circle'
                  : 'exclamation triangle'
              }
              color={compSt === 'Required' ? 'red' : 'orange'}
              size="large"
              verticalAlign="middle"
            />
          )}
          <List.Content>
            <List.Header>
              {comp.compName} - {compSt}
            </List.Header>
            <List.Description>
              {comp.courses.length} Courses required for Competency
            </List.Description>
            <List.List>{this.renderCompCourses(comp.courses)}</List.List>
          </List.Content>
        </List.Item>
      );
    });
  }

  renderCompCourses(courses) {
    return courses.map((course, i) => {
      return (
        <List.Item key={course._id + i}>
          <List.Icon name="book" />
          <List.Content>
            <List.Header>{course.courseName}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }

  // TODO ---- need to add in check on the courses to see if any expire within 3 months
  renderCurrentComps() {
    const { currentComps, user } = this.props;
    if (!isEmpty(user)) {
      return currentComps.map((comp, i) => {
        return (
          <List.Item key={comp._id}>
            <List.Content>
              <List.Header>{comp.compName}</List.Header>
              <List.Description>
                {comp.courses.length} Courses required for Competency
              </List.Description>
            </List.Content>
          </List.Item>
        );
      });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <>
        {!isEmpty(user) && (
          <>
            <Header as="h3" textAlign="center">
              Competencies
            </Header>
            <Accordion fluid styled>
              {this.renderRoleReqComps()}
            </Accordion>
            <Header as="h4" textAlign="center">
              Current Competencies
            </Header>
            <List divided verticalAlign="middle">
              {this.renderCurrentComps()}
            </List>
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  fetchComps
};

const mapStateToProps = (state) => {
  return {
    user: selectUserManage(state),
    currentComps: selectUserManageCompetenciesCurrent(state)
  };
};

AdminUserComps = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserComps);

export default AdminUserComps;
