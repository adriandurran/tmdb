import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Header, Form, Dropdown, Button, Message } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';

import { clearCompetency, adminUpdateComp } from '../../../actions/comps';
import { selectCoursesForDropDown } from '../../../reducers/selectors/courseSelectors';
import {
  selectCompetency,
  selectCompetencyTypesForDropDown
} from '../../../reducers/selectors/compSelectors';

class AdminEditCompetency extends Component {
  state = {
    cForC: [],
    cForCType: '',
    message: {
      visible: true
      // positive: false,
      // negative: false
    }
  };

  componentDidMount() {
    const { comp } = this.props;
    if (_.isEmpty(comp)) {
      this.setState({
        cForC: []
      });
    } else {
      let message = { ...this.state.message };
      message.header = `Edit ${comp.compName}`;
      this.setState({
        cForC: comp.courses.map(course => course._id),
        cForCType: !comp.compType ? '' : comp.compType._id,
        message
      });
    }
  }

  componentWillUnmount() {
    this.props.clearCompetency();
  }

  handleSelectChange = (e, item) => {
    this.setState({
      cForC: item.value
    });
  };

  handleSelectCompChange = (e, item) => {
    this.setState({
      cForCType: item.value
    });
  };

  resetMessageState() {
    const { comp } = this.props;
    let message = {};
    message.header = `Edit ${comp.compName}`;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  updateCompetency(values) {
    const { comp, adminUpdateComp } = this.props;
    let upComp = {
      compName: values.compName,
      shortName: values.shortName.toUpperCase(),
      courses: this.state.cForC,
      compType: this.state.cForCType
    };
    adminUpdateComp(comp._id, upComp).then(res => {
      // need to think about this a little
      // this is just temp i want to use redux for this
      // with some redux middleware
      let message = { ...this.state.message };

      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `${res.data.compName} was successfully updated`;
        message.positive = true;
      } else {
        message.header = 'Ooops!';
        message.content = `Something went wrong updating this Competency. Error: ${
          res.data
        }`;
        message.negative = true;
      }
      this.setState({
        message
      });
      this.resetMessageState();
    });
  }

  render() {
    const { courses, compTypes, handleSubmit, submitting } = this.props;
    const { message } = this.state;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit Competency
        </Header>
        <Message
          attached
          header={message.header}
          content={message.content}
          visible={message.visible}
          positive={message.positive}
          negative={message.negative}
        />
        <Form
          onSubmit={handleSubmit(values => this.updateCompetency(values))}
          className="attached fluid segment"
        >
          <Form.Group inline widths="equal">
            <Field
              fluid
              component={semanticFormField}
              as={Form.Input}
              type="text"
              name="shortName"
              placeholder="Short name"
            />
            <Field
              fluid
              name="compName"
              component={semanticFormField}
              as={Form.Input}
              type="text"
              placeholder="Competency Name"
            />
          </Form.Group>
          <Form.Group>
            <Dropdown
              selection
              name="compTypes"
              options={compTypes}
              placeholder="Select a Competency Type"
              onChange={this.handleSelectCompChange}
              value={this.state.cForCType}
            />
          </Form.Group>
          <Form.Group>
            <Dropdown
              fluid
              selection
              multiple
              name="compCourses"
              options={courses}
              placeholder="Select a Course"
              onChange={this.handleSelectChange}
              value={this.state.cForC}
            />
          </Form.Group>
          <Form.Group>
            <Button fluid disabled={submitting} type="submit" size="medium">
              Update Competency
            </Button>
            {/* <Button fluid disabled={submitting} size="medium">
              Reset
            </Button> */}
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearCompetency,
  adminUpdateComp
};

const mapStateToProps = state => {
  return {
    comp: selectCompetency(state),
    courses: selectCoursesForDropDown(state),
    compTypes: selectCompetencyTypesForDropDown(state),
    initialValues: selectCompetency(state)
  };
};

AdminEditCompetency = reduxForm({
  form: 'editComp',
  enableReinitialize: true
})(AdminEditCompetency);

AdminEditCompetency = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditCompetency);

export default AdminEditCompetency;
