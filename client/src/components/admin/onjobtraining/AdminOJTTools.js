import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Header, Icon } from 'semantic-ui-react';

import { fetchOJTS } from '../../../actions/ojt';
import { selectOJTS } from '../../../reducers/selectors/ojtsSelectors';

class AdminOJTTools extends Component {
  componentDidMount() {
    this.props.fetchOJTS();
  }

  render() {
    const { ojts } = this.props;
    return (
      <Card.Group itemsPerRow={1} centered>
        <Card as={Link} to="/admin/ojt-manager" raised>
          <Card.Content>
            <Header as="h5">On the Job Training Manager</Header>
          </Card.Content>
          <Card.Content description="Build and Manage On the Job Training" />
          <Card.Content extra>
            {ojts.length > 0 ? (
              <span>
                <Icon name="game" />
                {ojts.length} On the Job Training Modules loaded
              </span>
            ) : (
              <span>No On the Job Training in the system</span>
            )}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ojts: selectOJTS(state)
  };
};

const mapDispatchToProps = {
  fetchOJTS
};

AdminOJTTools = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminOJTTools);

export default AdminOJTTools;
