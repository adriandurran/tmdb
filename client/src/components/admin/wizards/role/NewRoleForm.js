import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
  Header,
  Segment,
  Icon,
  Input,
  Dropdown,
  Grid,
  Label,
  Button,
  Message
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import NewRoleSteps from './NewRoleSteps';

import { selectCompetenciesForDropDown } from '../../../../reducers/selectors/compSelectors';
import { adminAddNewRole } from '../../../../actions/roles';
import styles from '../../../../styles/form.module.css';

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

const NewRoleForm = () => {
  const dispatch = useDispatch();
  const comps = useSelector(selectCompetenciesForDropDown);
  const [message, setMessage] = useState({
    hidden: true,
    negative: false,
    positive: false,
    text: ''
  });

  const onSubmit = async (values, form) => {
    const { roleComps, timeToSQEP, roleName } = values;
    let newRole = {
      roleName,
      competencies: roleComps,
      timeToSQEP
    };

    const result = await dispatch(adminAddNewRole(newRole));
    if (result) {
      setMessage({
        positive: true,
        hidden: false,
        negative: false,
        text: `${roleName} successfully added`
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
        New Role Wizard
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
                      Submit
                    </Button>
                  </div>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Fields names={['roleName', 'timeToSQEP', 'roleComps']}>
                    {(fieldsState) => <NewRoleSteps values={fieldsState} />}
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

export default NewRoleForm;
