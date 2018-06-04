import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Grid, Header, Card } from 'semantic-ui-react';

// pull out course from the course state
import { selectCourse } from '../../reducers/selectors';

class UserCoursesAdd extends Component {
  renderCourseCard() {
    const { course } = this.props;
    if (_.isEmpty(course)) {
      return (
        <Card centered>
          <Card.Content description="No Course loaded" />
        </Card>
      );
    }

    const courseDescription = `Course type is ${
      course.type
    } and Course level is ${course.level}`;

    return (
      <Card raised centered>
        <Card.Content header={course.courseName} />
        <Card.Content
          meta={
            course.validity > 0
              ? `Valid for ${course.validity} months`
              : `Course does not expire`
          }
        />
        <Card.Content description={courseDescription} />
      </Card>
    );
  }

  render() {
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
            <Grid.Column>Input here</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: selectCourse(state)
  };
};

UserCoursesAdd = connect(mapStateToProps)(UserCoursesAdd);

export default UserCoursesAdd;
