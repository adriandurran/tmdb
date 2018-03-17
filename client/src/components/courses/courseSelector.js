import React, { Component } from 'react';
import { connect } from 'react-redux';
import Downshift from 'downshift';

import { withStyles } from 'material-ui/styles';
import rootStyles from '../../styles/rootStyle';
import withRoot from '../../withRoot';

import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { selectCourses } from '../../reducers/selectors';
import debounce from '../../utils/debounce';

class CourseSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  fetchCourses = debounce(value => {
    const { courses } = this.props;

    const items = courses
      .filter(course =>
        course.coursename.toLowerCase().includes(value.toLowerCase())
      )
      .map(course => {
        return `${course.coursename} (Valid for ${course.validity} months)`;
      });

    // console.log(items);

    this.setState({ items });
  }, 300);

  render() {
    return (
      <div>
        <Downshift
          render={({
            selectedItem,
            getInputProps,
            getItemProps,
            highlightedIndex,
            isOpen
          }) => {
            return (
              <div>
                <Input
                  fullWidth
                  placeholder="Enter the Course name"
                  {...getInputProps({
                    onChange: event => {
                      const value = event.target.value;
                      if (!value) {
                        return;
                      }
                      // call the debounce function
                      this.fetchCourses(value);
                    }
                  })}
                />
                {isOpen && (
                  <Paper square>
                    {this.state.items.map((item, index) => (
                      <MenuItem
                        component="div"
                        key={index}
                        {...getItemProps({
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'gray' : 'white',
                            fontWeight:
                              selectedItem === item ? 'bold' : 'normal'
                          }
                        })}
                      >
                        <Typography variant="body1" gutterBottom>
                          {item}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Paper>
                )}
              </div>
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: selectCourses(state)
  };
};

CourseSelector = withStyles(rootStyles)(CourseSelector);

export default withRoot(connect(mapStateToProps)(CourseSelector));
