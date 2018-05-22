import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Icon } from 'semantic-ui-react';

import { fetchComps } from '../../../actions/comps';
import { selectCompetencies } from '../../../reducers/selectors';

class AdminCompTools extends Component {
  componentDidMount() {
    this.props.fetchComps();
  }

  render() {
    const { comps } = this.props;
    return (
      <Card.Group itemsPerRow={1} centered>
        <Card as={Link} to="/admin/comp-manager" raised>
          <Card.Content>
            <Header as="h5">Competency Manager</Header>
          </Card.Content>
          <Card.Content description="Build and Manage Competencies" />
          <Card.Content extra>
            {comps.length > 0 ? (
              <span>
                <Icon name="cubes" />
                {comps.length} Competencies loaded
              </span>
            ) : (
              <span>No Competencies in the system</span>
            )}
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    comps: selectCompetencies(state)
  };
};

const mapDispatchToProps = {
  fetchComps
};

AdminCompTools = connect(mapStateToProps, mapDispatchToProps)(AdminCompTools);

export default AdminCompTools;
