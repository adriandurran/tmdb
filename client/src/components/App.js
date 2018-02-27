import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoles, fetchCourses, fetchComps } from '../actions';

// import { withStyles, withTheme } from 'material-ui/styles';
// import rootStyles from '../styles/rootStyle';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Routes from '../Routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8eacbb',
      main: '#607d8b',
      dark: '#34515e',
      contrastText: '#000000'
    },
    secondary: {
      light: '#8f9bff',
      main: '#536dfe',
      dark: '#0043ca',
      contrastText: '#FFF'
    }
  }
});

class App extends Component {
  componentDidMount() {
    const { fetchRoles, fetchCourses, fetchComps } = this.props;
    fetchRoles(); //this needs to change when we add authentication
    fetchCourses(); //this needs to change when we add authentication
    fetchComps(); //this needs to change when we add authentication
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  fetchRoles,
  fetchCourses,
  fetchComps
};
// App = withTheme()(App);
// App = withStyles(rootStyles)(App);

export default connect(null, mapDispatchToProps)(App);
