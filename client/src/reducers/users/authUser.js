import { FETCH_USER, ADD_PASS } from '../../actions/types';

const auth = (state = { user: {} }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: action.payload || false
      };
    case ADD_PASS:
<<<<<<< HEAD
      const copy = Object.assign({}, state);
      copy.user.courses = copy.courses.slice(0);
      copy.user.courses.push({courseId: action.courseId, passDate: action.passDate});
=======
      const copy = {user: Object.assign({}, state.user)};
      copy.user.courses = state.user.courses.slice(0);
      copy.user.courses.push({courseId: parseInt(action.courseId, 10), passDate: action.passDate});
>>>>>>> 3943a83925a41504c0858697f9188823adf38ad9
      return copy;
    default:
      return state;
  }
};

export const selectUserName = state => {
  return `${state.user.firstname} ${state.user.lastname}`;
};

export default auth;
