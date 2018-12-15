import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { fetchOJTTypes } from '../../../actions/ojt';
import { selectOJTTypesForDropDown } from '../../../reducers/selectors/ojtsSelectors';

class AdminOJTBuilder extends Component {
  componentDidMount() {
    this.props.fetchOJTTypes();
  }

  render() {
    return <div>OJT Builder</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ojtTypes: selectOJTTypesForDropDown(state)
  };
};

const mapDispatchToProps = {
  fetchOJTTypes
};

AdminOJTBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminOJTBuilder);

export default AdminOJTBuilder;
