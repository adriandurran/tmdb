import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Search } from 'semantic-ui-react';

import { selectAllUsersForSearch } from '../../../reducers/selectors';

class AdminUserSearch extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title, key: result.key });

  handleSearchChange = (e, { value }) => {
    const { users } = this.props;
    this.setState({ isLoading: true, value });

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
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: selectAllUsersForSearch(state)
  };
};

AdminUserSearch = connect(mapStateToProps)(AdminUserSearch);

export default AdminUserSearch;
