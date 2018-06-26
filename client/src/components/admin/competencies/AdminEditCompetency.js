import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Header, Form, Dropdown, Button } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';

import { clearCompetency } from '../../../actions/comps';
import { selectCoursesForDropDown } from '../../../reducers/selectors/courseSelectors';
import {
  selectCompetency,
  selectCompetencyTypesForDropDown
} from '../../../reducers/selectors/compSelectors';

class AdminEditCompetency extends Component {
  componentWillUnmount() {
    this.props.clearCompetency();
  }

  selectedCompType() {
    const { comp } = this.props;
    if (_.isEmpty(comp) || !comp.compType) {
      return '';
    }

    return comp.compType._id;
  }

  selectedCourses() {
    const { comp } = this.props;
    if (_.isEmpty(comp)) {
      return [];
    }

    return comp.courses.map(course => course._id);
  }

  render() {
    const {
      courses,
      compTypes,
      handleSubmit,
      submitting,
      pristine
    } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit Competency
        </Header>
        <Form>
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
              value={this.selectedCompType()}
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
              value={this.selectedCourses()}
            />
          </Form.Group>
          <Form.Group>
            <Button
              fluid
              disabled={pristine || submitting}
              type="submit"
              size="medium"
            >
              Update Competency
            </Button>
            <Button
              fluid
              disabled={pristine || submitting}
              type="submit"
              size="medium"
            >
              Reset
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearCompetency
};

const mapStateToProps = state => {
  return {
    comp: selectCompetency(state),
    courses: selectCoursesForDropDown(state),
    compTypes: selectCompetencyTypesForDropDown(state)
  };
};

AdminEditCompetency = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditCompetency);

export default reduxForm({
  form: 'editComp'
})(AdminEditCompetency);
