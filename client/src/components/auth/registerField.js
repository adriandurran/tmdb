import React from 'react';
import { Form } from 'semantic-ui-react';

const RegisterField = ({
  required,
  input,
  label,
  className,
  type,
  icon,
  iconPosition,
  meta: { touched, error }
}) => {
  return (
    <Form.Input
      required={required}
      placeholder={label}
      className={className}
      error={touched && error}
      type={type}
      icon={icon}
      iconPosition={iconPosition}
      {...input}
    />
  );
};

export default RegisterField;
