import React from 'react';
import UserComps from './comps/UserComps';
import UserReqComps from './comps/UserReqComps';

const CompsHome = () => {
  return (
    <div style={{ marginTop: '70px' }}>
      <UserReqComps />
      <UserComps />
    </div>
  );
};

export default CompsHome;
