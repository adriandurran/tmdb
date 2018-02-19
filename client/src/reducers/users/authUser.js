import { FETCH_USER, ADD_PASS } from '../../actions/types';

const auth = (state = { user: {} }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: action.payload || false
      };
    case ADD_PASS:
      const copy = Object.assign({}, state);
      copy.user.courses = copy.courses.slice(0);
      copy.user.courses.push({courseId: action.courseId, passDate: action.passDate});
      return copy;
    default:
      return state;
  }
};

export const selectUserName = state => {
  return `${state.user.firstname} ${state.user.lastname}`;
};

export default auth;
