import { createSelector } from 'reselect';

// all departments
export const selectDepts = state => state.depts;

export const selectDeptsForDropDown = createSelector(selectDepts, depts => {
  return depts.map(dept => {
    return { key: dept._id, value: dept._id, text: dept.departmentName };
  });
});

// one dept
export const selectDept = state => state.dept;
