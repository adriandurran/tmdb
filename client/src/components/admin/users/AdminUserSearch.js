import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Search } from 'semantic-ui-react';

import { selectAllUsersForSearch } from '../../../reducers/selectors';
import {
  fetchAllUsers,
  fetchUser,
  clearSearchResult
} from '../../../actions/user';

class AdminUserSearch extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
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
    console.log(result.key);
    // fetch and add to temp while managing the user
    this.props.fetchUser(result.key);
  };

  handleSearchChange = (e, { value }) => {
    const { users } = this.props;
    this.setState({ isLoading: true, value });
    // clear out the temp user
    this.props.clearSearchResult();

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(users, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <Search
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
    users: selectAllUsersForSearch(state)
  };
};

AdminUserSearch = connect(mapStateToProps, mapDispatchToProps)(AdminUserSearch);

export default AdminUserSearch;
