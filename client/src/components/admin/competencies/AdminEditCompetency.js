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
  Message,
  Select
} from 'semantic-ui-react';
import styles from '../../../styles/form.module.css';

import { selectCoursesForDropDown } from '../../../reducers/selectors/courseSelectors';
import {
  selectCompetency,
  selectCompetencyTypesForDropDown
} from '../../../reducers/selectors/compSelectors';

import { adminUpdateComp, adminDeleteCompetency } from '../../../actions/comps';

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

const AdminEditCompetency = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    hidden: true,
    negative: false,
    positive: false,
    text: ''
  });
  const comp = useSelector(selectCompetency);
  const compTypes = useSelector(selectCompetencyTypesForDropDown);
  const courses = useSelector(selectCoursesForDropDown);

  const onSubmit = async (values) => {
    const { compCourses, compName, compTypes, shortName } = values;
    const upComp = {
      compName,
      shortName: shortName.toUpperCase(),
      compType: compTypes,
      courses: compCourses
    };

    const result = await dispatch(adminUpdateComp(comp._id, upComp));

    if (result) {
      setMessage({
        positive: true,
        hidden: false,
        negative: false,
        text: `${compName} successfully updated`
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

  const { shortName, compName, compType } = comp;

  return (
    <>
      <Header as="h3" textAlign="center">
        Edit Competency
      </Header>
      <Segment attached>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            shortName,
            compName,
            compTypes: compType._id,
            compCourses: comp.courses.map((course) => course._id)
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.formField}>
                <Field
                  name="shortName"
                  component={InputAdapter}
                  type="text"
                  placeholder="short name"
                  validate={required}
                  className={styles.field1}
                />
                <Error name="Short Name" />
                <Field
                  name="compName"
                  component={InputAdapter}
                  type="text"
                  placeholder="Competency name"
                  validate={required}
                  className={styles.field2}
                />
                <Error name="Competency Name" />
              </div>

              <div className={styles.formField}>
                <Field
                  name="compTypes"
                  component={SelectAdapter}
                  options={compTypes}
                  className={styles.field}
                />
                <Label
                  htmlFor="compTypes"
                  className={styles.selectLabel}
                  pointing="left"
                >
                  Competency Types
                </Label>
              </div>

              <div className={styles.formField}>
                <Field
                  name="compCourses"
                  selection
                  multiple
                  fluid
                  component={DropdownAdapter}
                  options={courses}
                  className={styles.field}
                />
                <Label
                  htmlFor="roleComps"
                  className={styles.selectLabel}
                  pointing="left"
                >
                  Courses
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

export default AdminEditCompetency;
