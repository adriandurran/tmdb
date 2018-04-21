import React from 'react';
import { Field } from 'redux-form';
import Downshift from 'downshift';
import { connect } from 'react-redux';
import _ from 'lodash';

import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';

import { selectCourses } from '../../reducers/selectors';

function CourseAutoComplete({ loading, courses, input, ...other }) {
  return (
    <Downshift
      itemToString={item =>
        `${item.coursename} (Valid for ${item.validity} months)` || ''
      }
      onChange={selectedItem => input.onChange(selectedItem.id)}
      onStateChange={({ inputValue }) => {
        return input.onChange(inputValue);
      }}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex
      }) => {
        const results = courses.filter(
          course =>
            !inputValue ||
            course.coursename.toLowerCase().includes(inputValue.toLowerCase())
        );

        return (
          <div>
            <Input
              {...other}
              {...getInputProps({ placeholder: 'Choose Course' })}
            />
            {isOpen && !_.isEmpty(results) ? (
              <Paper>
                {loading ? (
                  <div>
                    <CircularProgress size={50} /> Loading search results
                  </div>
                ) : (
                  results.map((course, index) => (
                    <MenuItem
                      {...getItemProps({ item: course })}
                      key={course.id}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? '#f7f7f7' : '#fdfdfd'
                      }}
                    >
                      {`${course.coursename} (Valid for ${
                        course.validity
                      } months)`}
                    </MenuItem>
                  ))
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state)
  };
};

const CourseAutocompleteField = props => (
  <Field component={CourseAutoComplete} {...props} />
);

export default connect(mapStateToProps)(CourseAutocompleteField);
