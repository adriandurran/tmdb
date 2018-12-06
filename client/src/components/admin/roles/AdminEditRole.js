import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import {
  Header,
  Form,
  Dropdown,
  Button,
  Message,
  Segment
} from 'semantic-ui-react';

import { clearRole, adminUpdateRole } from '../../../actions/roles';
import { selectRole } from '../../../reducers/selectors/roleSelectors';
import { selectCompetenciesForDropDown } from '../../../reducers/selectors/compSelectors';

import semanticFormField from '../../shared/semanticFormField';

class AdminEditRole extends Component {
  state = {
    cForR: [],
    message: {
      visible: true
    }
  };

  componentDidMount() {
    const { role } = this.props;
    if (!_.isEmpty(role)) {
      let message = { ...this.state.message };
      message.header = `Edit ${role.roleName}`;
      this.setState({
        cForR: role.competencies.map((comp) => comp._id),
        message
      });
    }
  }

  componentWillUnmount() {
    this.props.clearRole();
  }

  handleSelectChange = (e, item) => {
    this.setState({
      cForR: item.value
    });
  };

  resetMessageState() {
    const { role } = this.props;
    let message = {};
    message.header = `Edit ${role.roleName}`;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  updateRole(values) {
    //   update role
    const { role, adminUpdateRole } = this.props;
    let upRole = { roleName: values.roleName, competencies: this.state.cForR };

    adminUpdateRole(role._id, upRole).then((res) => {
      let message = { ...this.state.message };
      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `${res.data.roleName} was successfully updated`;
        message.positive = true;
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating this Course. Error: ${res}`;
        message.negative = true;
      }
      this.setState({
        message
      });
      this.resetMessageState();
    });
  }

  render() {
    const { message, cForR } = this.state;
    const { comps, submitting, handleSubmit } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit Role
        </Header>
        <Message
          attached="top"
          header={message.header}
          content={message.content}
          visible={message.visible}
          positive={message.positive}
          negative={message.negative}
        />
        <Segment attached>
          <Form onSubmit={handleSubmit((values) => this.updateRole(values))}>
            <Form.Group>
              <Field
                component={semanticFormField}
                as={Form.Input}
                type="text"
                name="roleName"
                placeholder="Role name"
              />
            </Form.Group>
            <Form.Group>
              <Dropdown
                fluid
                selection
                multiple
                name="roleComps"
                options={comps}
                placeholder="Select competencies"
                onChange={this.handleSelectChange}
                value={cForR}
              />
            </Form.Group>
            <Form.Group>
              <Button fluid disabled={submitting} type="submit" size="medium">
                Update Role
              </Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearRole,
  adminUpdateRole
};

const mapStateToProps = (state) => {
  return {
    role: selectRole(state),
    comps: selectCompetenciesForDropDown(state),
    initialValues: selectRole(state)
  };
};

AdminEditRole = reduxForm({
  form: 'editRole',
  enableReinitialize: true
})(AdminEditRole);

AdminEditRole = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditRole);

export default AdminEditRole;
