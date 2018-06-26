import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Header, Form, Dropdown, Button, Message } from 'semantic-ui-react';

import semanticFormField from '../../shared/semanticFormField';

import { clearCourse, adminUpdateCourse } from '../../../actions/courses';

import {
  selectCourseTypesForDropDown,
  selectCourseLevelsForDropDown,
  selectCourse
} from '../../../reducers/selectors/courseSelectors';
import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';

class AdminEditCourse extends Component {
  state = {
    level: '',
    type: '',
    message: {
      visible: true
    },
    notes: ''
  };

  componentDidMount() {
    const { course } = this.props;
    if (!_.isEmpty(course)) {
      let message = { ...this.state.message };
      message.header = `Edit ${course.courseName}`;
      this.setState({
        level: course.level,
        type: course.type,
        message
      });
    }
  }

  resetMessageState() {
    const { course } = this.props;
    let message = {};
    message.header = `Edit ${course.courseName}`;
    setTimeout(() => {
      this.setState({ message });
    }, 3000);
  }

  componentWillUnmount() {
    this.props.clearCourse();
  }

  handleLevelChange = (e, item) => {
    this.setState({
      level: item.value
    });
  };

  handleTypeChange = (e, item) => {
    this.setState({
      type: item.value
    });
  };

  handleNotesChange = (e, item) => {
    this.setState({
      notes: item.value
    });
  };

  updateCourse(values) {
    const { course, adminUpdateCourse, user } = this.props;
    const { level, type, notes } = this.state;
    const newNote = {
      noteDate: Date.now(),
      noteText: notes,
      noteBy: user._id
    };
    const allNotes = [...course.notes, newNote];

    console.log(allNotes);
    let upCourse = {
      courseName: values.courseName,
      validity: values.validity,
      level,
      type,
      notes: allNotes
    };

    adminUpdateCourse(course._id, upCourse).then(res => {
      let message = { ...this.state.message };
      if (res.status === 200) {
        message.header = 'Success!';
        message.content = `${res.data.courseName} was successfully updated`;
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
    const { levels, types, handleSubmit, submitting } = this.props;
    const { message, notes } = this.state;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit Course
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
          onSubmit={handleSubmit(values => this.updateCourse(values))}
          className="attached fluid segment"
        >
          <Form.Group inline widths="equal">
            <Field
              fluid
              component={semanticFormField}
              as={Form.Input}
              type="text"
              name="courseName"
              placeholder="Course name"
            />
            <Field
              fluid
              name="validity"
              component={semanticFormField}
              as={Form.Input}
              type="number"
              placeholder="Course Validity"
            />
          </Form.Group>
          <Form.Group inline widths="equal">
            <Dropdown
              selection
              inline
              name="type"
              options={types}
              placeholder="Select a Course Type"
              onChange={this.handleTypeChange}
              style={{ marginRight: '1em' }}
              value={this.state.type}
            />
            <Dropdown
              selection
              inline
              name="level"
              options={levels}
              placeholder="Select a Course Level"
              onChange={this.handleLevelChange}
              value={this.state.level}
            />
          </Form.Group>
          <Form.TextArea
            autoHeight
            onChange={this.handleNotesChange}
            value={notes}
            placeholder="Enter notes here...."
            rows={3}
          />
          <Form.Group>
            <Button fluid disabled={submitting} type="submit" size="medium">
              Update Course
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearCourse,
  adminUpdateCourse
};

const mapStateToProps = state => {
  return {
    levels: selectCourseLevelsForDropDown(state),
    types: selectCourseTypesForDropDown(state),
    course: selectCourse(state),
    user: selectCurrentUser(state),
    initialValues: selectCourse(state)
  };
};

AdminEditCourse = reduxForm({
  form: 'editForm',
  enableReinitialize: true
})(AdminEditCourse);

AdminEditCourse = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditCourse);

export default AdminEditCourse;
