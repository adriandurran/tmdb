import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Search } from 'semantic-ui-react';

import { selectCurrentUser } from '../../../reducers/selectors/userSelectors';

import {
  selectAllUsersForSearch,
  selectAllUsersForSearchNoAdmins
} from '../../../reducers/selectors/adminSelectors';

import {
  fetchAllUsers,
  fetchUser,
  clearSearchResult
} from '../../../actions/user';

class AdminUserSearch extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }
  componentWillUnmount() {
    this.resetComponent();
  }
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' });
    this.props.clearSearchResult();
  };

  handleResultSelect = (e, { result }) => {
    this.setState({
      value: result.title,
      key: result.key
    });
    // fetch and add to temp while managing the user
    this.props.fetchUser(result.key);
  };

  handleSearchChange = (e, { value }) => {
    const { users, userNoAdmin, user } = this.props;

    // if the user is an admin/manager he cannot pull up his own account
    // or other admin/manager accounts
    // only a super admin can manage the other admins/managers

    let userData = [];
    if (user.isAdmin && !user.isSuperAdmin) {
      userData = userNoAdmin;
    } else {
      userData = users;
    }

    this.setState({ isLoading: true, value });
    // clear out the temp user
    this.props.clearSearchResult();

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(userData, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <Search
          fluid
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          //   {...this.props}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchAllUsers,
  fetchUser,
  clearSearchResult
};

const mapStateToProps = state => {
  return {
    users: selectAllUsersForSearch(state),
    userNoAdmin: selectAllUsersForSearchNoAdmins(state),
    user: selectCurrentUser(state)
  };
};

AdminUserSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserSearch);

export default AdminUserSearch;
