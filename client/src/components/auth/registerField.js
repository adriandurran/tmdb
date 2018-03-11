import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, label, type, meta: { error, touched, warning } }) => {
  return (
    <TextField
      {...input}
      placeholder={label}
      type={type} // error={touched && error}
      helperText={error || warning}
      fullWidth
    />
  );
};
