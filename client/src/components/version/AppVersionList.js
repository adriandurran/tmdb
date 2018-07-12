import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Header, Item } from 'semantic-ui-react';

import { selectVersionsDateDesc } from '../../reducers/selectors/extraSelectors';
import { fetchVersions } from '../../actions/extra';

class AppVersionList extends Component {
  componentDidMount() {
    this.props.fetchVersions();
  }

  renderVersions() {
    const { versions } = this.props;
    return versions.map(version => {
      return (
        <Item>
          <Item.Content>
            <Item.Header>Version {version.versionNumber}</Item.Header>
            <Item.Meta>
              <Moment fromNow>{version.versionDate}</Moment>
            </Item.Meta>
            <Item.Desciption>{version.versionNotes}</Item.Desciption>
          </Item.Content>
        </Item>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          Version History
        </Header>
        <Item.Group>{this.renderVersions()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    versions: selectVersionsDateDesc(state)
  };
};

const mapDispatchToProps = {
  fetchVersions
};

AppVersionList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppVersionList);

export default AppVersionList;
