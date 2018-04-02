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

import {
  selectRoleBuilderCompNames,
  selectCompetencies
} from '../../../reducers/selectors';
import {
  addCompForRoleBuilder,
  removeCompForRoleBuilder
} from '../../../actions/comps';

import { adminAddNewRole } from '../../../actions/roles';

const renderTextField = ({
  input,
  label,
  type,
  className,

  meta: { touched, error }
}) => (
  <TextField
    required
    placeholder={label}
    error={touched && error}
    {...input}
    type={type}
    helperText={touched && error}
    className={className}
  />
);

const renderSelectField = ({
  input,
  label,
  className,
  meta: { touched, error },
  children
}) => (
  <Select native {...input} className={className}>
    {children}
  </Select>
);

class RoleBuilder extends Component {
  handleSelectChange = event => {
    const { addCompForRoleBuilder } = this.props;
    addCompForRoleBuilder(parseInt(event.target.value, 10));
  };

  handleChipDelete = comp => () => {
    const { removeCompForRoleBuilder } = this.props;
    removeCompForRoleBuilder(comp.id);
  };

  submitNewRole(values, dispatch) {
    const { roleComps, adminAddNewRole } = this.props;
    let roleCompIds = roleComps.map(comp => comp.id);
    let newRole = {
      rolename: values.rolename,
      compIds: roleCompIds
    };
    adminAddNewRole(newRole);
  }

  render() {
    const { handleSubmit, submitting, classes, comps, roleComps } = this.props;
    return (
      <div>
        <Card raised className={classes.adminCard}>
          <CardContent>
            <Typography
              variant="display1"
              component="h5"
              gutterBottom
              align="center"
            >
              Role Builder
            </Typography>
            <form onSubmit={handleSubmit(values => this.submitNewRole(values))}>
              <div className={classes.formContainer}>
                <Field
                  required
                  component={renderTextField}
                  type="text"
                  name="rolename"
                  label="Role name"
                  className={classes.formFields}
                />
              </div>
              <div className={classes.formContainer}>
                <Field
                  component={renderSelectField}
                  native
                  name="courseSelector"
                  onChange={this.handleSelectChange}
                  className={classes.formFields}
                >
                  {comps.map(comp => {
                    return (
                      <option value={comp.id} key={comp.id}>
                        {comp.compname}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className={classes.formContainer}>
                <Paper name="courses" className={classes.formFields}>
                  {roleComps.map(comp => {
                    return (
                      <Chip
                        name="chippers"
                        className={classes.chip}
                        key={comp.id}
                        value={comp.id}
                        label={comp.compname}
                        onDelete={this.handleChipDelete(comp)}
                      />
                    );
                  })}
                </Paper>
              </div>
              <div className={classes.formContainer}>
                <div style={{ flex: 1, textAlign: 'center' }} />
                <Button variant="raised" disabled={submitting} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCompForRoleBuilder,
  removeCompForRoleBuilder,
  adminAddNewRole
};

const mapStateToProps = state => {
  return {
    roleComps: selectRoleBuilderCompNames(state),
    comps: selectCompetencies(state)
  };
};

RoleBuilder = connect(mapStateToProps, mapDispatchToProps)(RoleBuilder);
RoleBuilder = withRoot(withStyles(rootStyles)(RoleBuilder));

export default reduxForm({
  form: 'rolebuilder'
})(RoleBuilder);
