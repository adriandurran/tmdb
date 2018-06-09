import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import { Grid, Header, Card, Form, Button } from 'semantic-ui-react';

// pull out course from the course state
import { selectCourse, selectCurrentUser } from '../../../reducers/selectors';
import { addUserCourse } from '../../../actions/user';

const renderInputField = ({ input, label, type, meta: { touched, error } }) => (
  <Form.Input
    required
    fluid
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
  />
);

class UserCoursesAdd extends Component {
  renderCourseCard() {
    const { selCourse } = this.props;
    if (_.isEmpty(selCourse)) {
      return (
        <Card centered>
          <Card.Content description="No Course loaded" />
        </Card>
      );
    }

    const courseDescription = `Course type is ${
      selCourse.type
    } and Course level is ${selCourse.level}`;

    return (
      <Card raised centered>
        <Card.Content header={selCourse.courseName} />
        <Card.Content
          meta={
            selCourse.validity > 0
              ? `Valid for ${selCourse.validity} months`
              : `Course does not expire`
          }
        />
        <Card.Content description={courseDescription} />
      </Card>
    );
  }

  newUserCourse(values) {
    const { selCourse, user, addUserCourse } = this.props;
    // add new user course
    const newCourse = { _course: selCourse._id, passDate: values.courseDate };
    addUserCourse(user._id, newCourse);
  }

  render() {
    const { handleSubmit, submitting, pristine, selCourse } = this.props;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Add Course
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>{this.renderCourseCard()}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit(values => this.newUserCourse(values))}
              >
                <Form.Group inline widths="equal">
                  <Field
                    fluid
                    component={renderInputField}
                    type="date"
                    name="courseDate"
                    label="Course Date"
                  />
                  <Button
                    fluid
                    disabled={pristine || submitting || _.isEmpty(selCourse)}
                    type="submit"
                    size="large"
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selCourse: selectCourse(state),
    user: selectCurrentUser(state)
  };
};

const mapDispatchToProps = {
  addUserCourse
};

UserCoursesAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCoursesAdd);

export default reduxForm({
  form: 'newUserCourse'
})(UserCoursesAdd);
