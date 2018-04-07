import React from 'react';
import TextField from 'material-ui/TextField';

const RegisterField = ({
  input,
  label,
  type,
  className,
  fullWidth,
  required,
  meta: { error, touched, warning }
}) => {
  return (
    <TextField
      {...input}
      placeholder={label}
      type={type}
      helperText={touched && error}
      className={className}
      fullWidth={fullWidth}
      required={required}
    />
  );
};

export default RegisterField;
