import { createSelector } from 'reselect';

// all departments
export const selectDepts = (state) => state.depts;

export const selectDeptsForDropDown = createSelector(
  selectDepts,
  (depts) => {
    const allDepts = depts.map((dept) => {
      return { key: dept._id, value: dept._id, text: dept.departmentName };
    });
    return allDepts.sort((a, b) => a.text.localeCompare(b.text));
  }
);

// one dept
export const selectDept = (state) => state.dept;
