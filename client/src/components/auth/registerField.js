import React from 'react';

export default ({ input, label, type, meta: { error, touched, warning } }) => {
  return (
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        style={{ marginBottom: '5px' }}
      />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};
