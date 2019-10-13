import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
  Header,
  Segment,
  Icon,
  Input,
  Select,
  Grid,
  Label,
  Button,
  Message
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import NewUserSteps from './NewUserSteps';

import { selectRolesForDropDown } from '../../../../reducers/selectors/roleSelectors';
import { selectDeptsForDropDown } from '../../../../reducers/selectors/deptSelectors';

import styles from '../../../../styles/form.module.css';
import { adminAddNewUser } from '../../../../actions/user';

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const SelectAdapter = ({ input, ...rest }) => (
  <Select
    {...input}
    {...rest}
    onChange={(e, { value }) => input.onChange(value)}
  />
);

const InputAdapter = ({ input, ...rest }) => (
  <Input
    {...input}
    {...rest}
    onChange={(e, { value }) => input.onChange(value)}
  />
);

const Fields = ({
  names,
  subscription,
  fieldsState = {},
  children,
  originalRender
}) => {
  if (!names.length) {
    return (originalRender || children)(fieldsState);
  }
  const [name, ...rest] = names;
  return (
    <Field name={name} subscription={subscription}>
      {(fieldState) => (
        <Fields
          names={rest}
          subscription={subscription}
          originalRender={originalRender || children}
          fieldsState={{ ...fieldsState, [name]: fieldState }}
        />
      )}
    </Field>
  );
};

const required = (value) => (value ? undefined : 'Required');

const NewUserForm = () => {
  const roles = useSelector(selectRolesForDropDown);
  const depts = useSelector(selectDeptsForDropDown);
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    hidden: true,
    negative: false,
    positive: false,
    text: ''
  });

  const onSubmit = async (values, form) => {
    const result = await dispatch(adminAddNewUser(values));
    const { firstName, lastName } = values;
    if (result.verified) {
      // add a message the user has been added
      setMessage({
        positive: true,
        hidden: false,
        negative: false,
        text: `${firstName} ${lastName} successfully added`
      });

      setTimeout(() => {
        setMessage({
          positive: false,
          hidden: true,
          negative: false,
          text: ''
        });
        form.reset();
      }, 1000);
    }
  };

  return (
    <>
      <Header as="h1" textAlign="center">
        <Icon name="wizard" />
        New User Wizard
      </Header>
      <Segment raised style={{ marginTop: '2rem' }}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Column width={10}>
                  <div className={styles.formField}>
                    <Field
                      name="firstName"
                      component={InputAdapter}
                      type="text"
                      placeholder="First Name"
                      validate={required}
                      className={styles.field}
                    />
                    <Error name="firstName" />

                    <Field
                      name="lastName"
                      component={InputAdapter}
                      type="text"
                      placeholder="Last Name"
                      validate={required}
                      className={styles.field}
                    />
                    <Error name="lastName" />
                  </div>
                  <div className={styles.formField}>
                    <Field
                      name="username"
                      component={InputAdapter}
                      type="email"
                      placeholder="Email address"
                      validate={required}
                      className={styles.field}
                    />
                  </div>
                  <div className={styles.sformField}>
                    <Field
                      name="userId"
                      component={InputAdapter}
                      type="text"
                      placeholder="Employee Number/Id"
                      validate={required}
                      className={styles.smallField}
                    />
                  </div>
                  <div className={styles.sformField}>
                    <Field
                      name="password"
                      component={InputAdapter}
                      type="password"
                      placeholder="Password"
                      validate={required}
                      className={styles.smallField}
                    />
                  </div>
                  <div className={styles.formField}>
                    <Field
                      name="dept"
                      component={SelectAdapter}
                      options={depts}
                      className={styles.field}
                    />
                    <Label
                      htmlFor="dept"
                      className={styles.selectLabel}
                      pointing="left"
                    >
                      Department
                    </Label>
                  </div>
                  <div className={styles.formField}>
                    <Field
                      name="role"
                      component={SelectAdapter}
                      options={roles}
                      className={styles.field}
                    />
                    <Label
                      htmlFor="role"
                      className={styles.selectLabel}
                      pointing="left"
                    >
                      Role
                    </Label>
                  </div>
                  <div className={styles.buttons}>
                    <Button type="submit" disabled={submitting || pristine}>
                      Submit
                    </Button>
                  </div>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Fields
                    names={[
                      'firstName',
                      'lastName',
                      'username',
                      'userId',
                      'password',
                      'dept',
                      'role'
                    ]}
                  >
                    {(fieldsState) => <NewUserSteps values={fieldsState} />}
                  </Fields>
                </Grid.Column>
              </Grid>
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

export default NewUserForm;
