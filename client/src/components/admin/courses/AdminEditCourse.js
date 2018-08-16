import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Header,
  Form,
  Dropdown,
  Button,
  Message,
  Segment
} from 'semantic-ui-react';

import { clearCourse, adminUpdateCourse } from '../../../actions/courses';

import {
  selectCourseTypesForDropDown,
  selectCourseLevelsForDropDown,
  selectCourse
} from '../../../reducers/selectors/courseSelectors';
import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';

class AdminEditCourse extends Component {
  constructor(props) {
    super();
    this.state = {
      level: '',
      type: '',
      noExpire: false,
      courseName: '',
      validity: '',
      message: {
        visible: true
      },
      notes: ''
    };
  }

  componentDidMount() {
    const { course } = this.props;
    if (!_.isEmpty(course)) {
      let message = { ...this.state.message };
      message.header = `Edit ${course.courseName}`;
      if (
        course.validity === undefined ||
        course.validity === '' ||
        course.validity === null
      ) {
        this.setState({
          noExpire: true
        });
      } else {
        this.setState({
          noExpire: false,
          validity: course.validity
        });
      }
      this.setState({
        level: course.level,
        type: course.type,
        courseName: course.courseName,
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

  handleValidChange = (e, item) => {
    // console.log(item.value);
    if (item.value) {
      this.setState({
        validity: item.value,
        noExpire: false
      });
    }
  };

  handleCourseNameChange = (e, item) => {
    this.setState({
      courseName: item.value
    });
  };

  noExpire = (e, item) => {
    this.setState({
      noExpire: item.checked
    });
    if (item.checked) {
      this.setState({
        validity: ''
      });
    }
  };

  updateCourse = (e) => {
    e.preventDefault();
    const { course, adminUpdateCourse, user } = this.props;
    const { level, type, notes, noExpire, validity, courseName } = this.state;

    let allNotes = course.notes;

    if (notes !== '') {
      const newNote = {
        noteDate: Date.now(),
        noteText: notes,
        noteBy: user._id
      };
      allNotes = [...allNotes, newNote];
    }

    let courseValid = '';

    if (!noExpire) {
      courseValid = validity;
    }

    let upCourse = {
      courseName: courseName,
      validity: courseValid,
      level,
      type,
      notes: allNotes
    };

    // console.log(upCourse);

    adminUpdateCourse(course._id, upCourse).then((res) => {
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
        message,
        notes: ''
      });
      this.resetMessageState();
    });
  };

  render() {
    const { levels, types } = this.props;
    const { message, notes } = this.state;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Edit Course
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
          <Form>
            <Form.Input
              fluid
              // component={semanticFormField}
              // as={Form.Input}
              type="text"
              name="courseName"
              placeholder="Course name"
              value={this.state.courseName}
            />
            <Form.Group inline widths="equal">
              <Form.Input
                fluid
                name="validity"
                type="number"
                placeholder="Course Validity in months"
                value={this.state.validity}
                onChange={this.handleValidChange}
              />
              <Form.Checkbox
                label="No expiry date"
                onChange={this.noExpire}
                checked={this.state.noExpire}
              />
            </Form.Group>
            <Dropdown
              selection
              name="type"
              options={types}
              placeholder="Select a Course Type"
              onChange={this.handleTypeChange}
              style={{ marginRight: '1em', marginBottom: '1em' }}
              value={this.state.type}
            />
            <Dropdown
              selection
              name="level"
              options={levels}
              placeholder="Select a Course Level"
              onChange={this.handleLevelChange}
              value={this.state.level}
              style={{ marginRight: '1em', marginBottom: '1em' }}
            />
            <Form.TextArea
              autoHeight
              onChange={this.handleNotesChange}
              value={notes}
              placeholder="Enter notes here...."
              rows={3}
            />
            <Form.Group>
              <Button
                fluid
                type="submit"
                size="medium"
                onClick={this.updateCourse}
              >
                Update Course
              </Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapDispatchToProps = {
  clearCourse,
  adminUpdateCourse
};

const mapStateToProps = (state) => {
  return {
    levels: selectCourseLevelsForDropDown(state),
    types: selectCourseTypesForDropDown(state),
    course: selectCourse(state),
    user: selectCurrentUser(state)
  };
};

AdminEditCourse = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditCourse);

export default AdminEditCourse;
