import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  Header,
  Segment,
  Input,
  Dropdown,
  Label,
  Button,
  Message
} from 'semantic-ui-react';

import { adminUpdateRole } from '../../../actions/roles';
import { selectRole } from '../../../reducers/selectors/roleSelectors';
import { selectCompetenciesForDropDown } from '../../../reducers/selectors/compSelectors';
import styles from '../../../styles/form.module.css';

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const DropdownAdapter = (props) => {
  const { input, options } = props;
  let { value, ...restProps } = props.input;
  return (
    <Dropdown
      {...restProps}
      value={value || []}
      selection
      multiple
      fluid
      options={options}
      onChange={(e, data) => {
        return data.value.length > 0
          ? input.onChange(data.value)
          : input.onChange('');
      }}
    />
  );
};

const InputAdapter = ({ input, ...rest }) => (
  <Input
    {...input}
    {...rest}
    onChange={(e, { value }) => input.onChange(value)}
  />
);

const required = (value) => (value ? undefined : 'Required');

const AdminEditRole = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const comps = useSelector(selectCompetenciesForDropDown);
  const [message, setMessage] = useState({
    hidden: true,
    negative: false,
    positive: false,
    text: ''
  });

  const onSubmit = async (values) => {
    const { roleComps, timeToSQEP, roleName } = values;
    const upRole = {
      roleName,
      competencies: roleComps,
      timeToSQEP
    };

    console.log(upRole);
    const result = await dispatch(adminUpdateRole(role._id, upRole));
    if (result) {
      setMessage({
        positive: true,
        hidden: false,
        negative: false,
        text: `${roleName} successfully updated`
      });
      setTimeout(() => {
        setMessage({
          positive: false,
          hidden: true,
          negative: false,
          text: ''
        });
      }, 1000);
    }
  };

  const { roleName, timeToSQEP, competencies } = role;

  return (
    <>
      <Header as="h3" textAlign="center">
        Edit Role
      </Header>
      <Segment attached>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            roleName: roleName,
            timeToSQEP,
            roleComps: competencies.map((comp) => comp._id)
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.formField}>
                <Field
                  name="roleName"
                  component={InputAdapter}
                  type="text"
                  placeholder="Role Name"
                  validate={required}
                  className={styles.field}
                />
                <Error name="roleName" />
              </div>

              <div className={styles.sformField}>
                <Field
                  name="timeToSQEP"
                  component={InputAdapter}
                  type="number"
                  placeholder="0"
                  validate={required}
                  className={styles.smallField}
                />
                <Label
                  htmlFor="timeToSQEP"
                  className={styles.selectLabel}
                  pointing="left"
                >
                  Time to SQEP
                </Label>
              </div>

              <div className={styles.formField}>
                <Field
                  name="roleComps"
                  selection
                  multiple
                  fluid
                  component={DropdownAdapter}
                  options={comps}
                  className={styles.field}
                />
                <Label
                  htmlFor="roleComps"
                  className={styles.selectLabel}
                  pointing="left"
                >
                  Competencies
                </Label>
              </div>
              <div className={styles.buttons}>
                <Button type="submit" disabled={submitting || pristine}>
                  Update
                </Button>
              </div>
            </form>
          )}
        />
      </Segment>
      <Message
        attached="bottom"
        hidden={message.hidden}
        negative={message.negative}
        positive={message.positive}
      >
        {message.text}
      </Message>
    </>
  );
};

export default AdminEditRole;
