import React from 'react';

export default ({ input, meta: { error, touched } }) => {
  return (
    <div>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
