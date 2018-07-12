import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Header, Grid } from 'semantic-ui-react';

import AppVersionList from './AppVersionList';

import { selectCurrentUser } from '../../reducers/selectors/userSelectors';

class AppVersion extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Application Versions
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <AppVersionList />
            </Grid.Column>
          </Grid.Row>
          {!isEmpty(user) &&
            user.isAdmin && (
              <Grid.Row>
                <Grid.Column>App version entry</Grid.Column>
              </Grid.Row>
            )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

AppVersion = connect(mapStateToProps)(AppVersion);

export default AppVersion;
