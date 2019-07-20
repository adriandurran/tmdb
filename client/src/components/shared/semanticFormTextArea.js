import React from 'react';
import { Form, Input, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function semanticFormTextArea({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error, warning },
  as: As = Input,
  ...props
}) {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }
  return (
    <Form.Field>
      <As
        {...props}
        {...input}
        value={input.value}
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {touched &&
        ((error && (
          <Message negative>
            <Message.Header>{error}</Message.Header>
          </Message>
        )) ||
          (warning && (
            <Message warning>
              <Message.Header>{warning}</Message.Header>
            </Message>
          )))}
    </Form.Field>
  );
}

semanticFormTextArea.propTypes = {
  as: PropTypes.any,
  input: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object
};
