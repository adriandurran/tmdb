import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Header, Form, Dropdown, Button } from 'semantic-ui-react';

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
    cForCType: ''
  };

  componentDidMount() {
    const { comp } = this.props;
    if (_.isEmpty(comp)) {
      this.setState({
        cForC: []
      });
    } else {
      this.setState({
        cForC: comp.courses.map(course => course._id),
        cForCType: !comp.compType ? '' : comp.compType._id
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

  updateCompetency(values) {
    const { comp, adminUpdateComp } = this.props;
    let upComp = {
      compName: values.compName,
      shortName: values.shortName.toUpperCase(),
      courses: this.state.cForC,
      compType: this.state.cForCType
    };
    adminUpdateComp(comp._id, upComp).then(() => {
      // need to think about this a little
    });
  }

  render() {
    const { courses, compTypes, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit Competency
        </Header>
        <Form onSubmit={handleSubmit(values => this.updateCompetency(values))}>
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
