import _ from 'lodash';

export const compExist = (req, curs) => {
  // filter the users competencies to see if the required competency is there
  let isThere = curs.filter(comp => comp._id === req._id);
  if (isThere.length > 0) {
    return true;
  }
  return false;
};
