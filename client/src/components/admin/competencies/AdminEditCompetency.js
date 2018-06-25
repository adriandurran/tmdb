import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearCompetency } from '../../../actions/comps';
import { selectCompetency } from '../../../reducers/selectors/compSelectors';

class AdminEditCompetency extends Component {
  componentWillUnmount() {
    this.props.clearCompetency();
  }

  render() {
    return <div>Edit Competency</div>;
  }
}

const mapDispatchToProps = {
  clearCompetency
};

const mapStateToProps = state => {
  return {
    comp: selectCompetency(state)
  };
};

AdminEditCompetency = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditCompetency);

export default AdminEditCompetency;
