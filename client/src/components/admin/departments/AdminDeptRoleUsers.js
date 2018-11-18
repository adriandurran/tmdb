import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

import { roleUsers, getRole } from '../../../utils/roleHelpers';
import { checkCompExpireDate0 } from '../../../utils/datehelpers';

import { selectUsersInDept } from '../../../reducers/selectors/adminSelectors';
import { selectRoles } from '../../../reducers/selectors/roleSelectors';
import { compsHolderCheck } from '../../../utils/compHelpers';

class AdminDeptRoleUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expire: false,
      hasComp: true
    };
  }

  // bit rough and ready
  checkComps(courses, comps) {
    for (let x in comps.competencies) {
      if (!compsHolderCheck(courses, comps.competencies[x])) {
        this.setState({ hasComp: false });
      }
    }
  }

  // this looks at the course comps and if they expire in 0 months or less....
  checkCompExpire(courses, comps) {
    for (let x in comps.competencies) {
      if (checkCompExpireDate0(comps.competencies[x], courses)) {
        this.setState({ expire: true });
      }
    }
  }

  render() {
    const { deptUsers, roleId, roles } = this.props;
    const { hasComp, expire } = this.state;
    const rUsers = roleUsers(deptUsers, roleId);
    const roleComps = getRole(roles, roleId);
    return rUsers.map((user, index) => {
      this.checkComps(user.courses, roleComps[0]);
      this.checkCompExpire(user.courses, roleComps[0]);
      return (
        <Card
          key={index}
          fluid
          {...(!hasComp && expire ? { color: 'red' } : { color: 'green' })}
        >
          <Card.Content>
            <Image floated="right" size="mini" src={user.imageUrl} />
            <Card.Header>
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Meta>{user.username}</Card.Meta>
            <Card.Description>
              {hasComp && !expire
                ? 'Has required competencies and is in date'
                : 'Either does not have the required competencies or courses have expired'}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    deptUsers: selectUsersInDept(state),
    roles: selectRoles(state)
  };
};

export default connect(mapStateToProps)(AdminDeptRoleUsers);

// get an array of user courses that have not expired.
// get comps for a role and check if yes if no warn
// check courses in comp have not expired or within 3 months
