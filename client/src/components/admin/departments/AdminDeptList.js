import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Header, Icon, Button } from 'semantic-ui-react';

import { selectDepts } from '../../../reducers/selectors/deptSelectors';

class AdminDeptList extends Component {
  renderDeptList() {
    const { depts } = this.props;

    return depts.map(dept => {
      return (
        <List.Item key={dept._id}>
          <List.Content floated="right">
            <Button icon onClick={this.handleListClick} value={dept._id}>
              <Icon name="wrench" />
            </Button>
          </List.Content>
          <List.Content>
            {dept.departmentName} ({dept.departmentCode})
          </List.Content>
        </List.Item>
      );
    });
  }

  handleListClick = (e, { value }) => {
    console.log(value);
    // I think  launch modal to edit....just a small form
  };

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Department List
        </Header>
        <List divided verticalAlign="middle">
          {this.renderDeptList()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    depts: selectDepts(state)
  };
};

AdminDeptList = connect(mapStateToProps)(AdminDeptList);

export default AdminDeptList;
