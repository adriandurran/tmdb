import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../withRoot';
import rootStyles from '../../../styles/rootStyle';

class RoleBuilder extends Component {
  render() {
    return <div>Role Builder</div>;
  }
}

export default RoleBuilder;
