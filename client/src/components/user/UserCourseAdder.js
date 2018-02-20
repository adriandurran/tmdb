import React, { Component } from 'react';
import { connect } from 'react-redux';

<<<<<<< HEAD
import { addPass } from '../../actions';
=======
import { addPass, saveUser } from '../../actions';
>>>>>>> 3943a83925a41504c0858697f9188823adf38ad9

class UserCourseAdder extends Component {

  constructor(props) {
    super(props);
    this.state = {course: '', passDate: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
<<<<<<< HEAD
    addPass(this.state);
    console.log(this.props.authUser.id, this.state.course, this.state.passDate);
    event.preventDefault();
  }

=======
    this.props.dispatch(addPass(this.state.course, this.state.passDate));
    event.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser !== this.props.authUser) {
      this.props.dispatch(saveUser(nextProps.authUser));
    }
  }


>>>>>>> 3943a83925a41504c0858697f9188823adf38ad9
  selectCourse(course) {
    return (
      <option key={course.courseId} value={course.courseId}>{course.coursename}</option>
    );
  }

  renderCourses(courses) {
    return courses.map(course => {
      return (
        <option key={course.courseId} value={course.courseId}>
          {course.coursename}
        </option>
      );
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <select name="course" value={this.state.course} onChange={this.handleChange}>
<<<<<<< HEAD
            {/* <option value="" disabled>Add course</option> */}
=======
            <option value="" disabled>Add course</option>
>>>>>>> 3943a83925a41504c0858697f9188823adf38ad9
            {/* {this.renderCourses(this.props.courses)} */}
            {this.props.courses.map(this.selectCourse)}
          </select>
          <label>
            Passed date:
            <input name="passDate" type="text" value={this.state.passDate} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add" />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.user,
    courses: state.courses ? state.courses : []
  };  
};

export default connect(mapStateToProps)(UserCourseAdder);

