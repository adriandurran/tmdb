import { createSelector } from 'reselect';
import _ from 'lodash';

import { selectRoles } from './roleSelectors';

// competencies
export const selectCompetencies = state => state.comps;

// competency
export const selectCompetency = state => state.comp;

export const selectCompetenciesForDropDown = createSelector(
  selectCompetencies,
  comps => {
    return comps.map(comp => {
      // this is temp until a comp has a comptype
      let compy = '';
      if (!_.isEmpty(comp.compType)) {
        compy = comp.compType.compType.toUpperCase();
      }
      return {
        key: comp._id,
        value: comp._id,
        text: `${comp.compName} -- ${compy}`
      };
    });
  }
);
// get competency types
export const selectCompetencyTypes = state => state.compTypes;

export const selectCompetencyTypesForDropDown = createSelector(
  selectCompetencyTypes,
  compTypes => {
    return compTypes.map(type => {
      return {
        key: type._id,
        value: type._id,
        text: type.compType
      };
    });
  }
);

// get competencies for roles
export const selectRoleComps = createSelector(
  selectRoles,
  selectCompetencies,
  (roles, comps) => {
    const flatty = _.flatten(_.map(roles, 'compIds'));
    return comps.filter(x => flatty.includes(x._id));
  }
);
