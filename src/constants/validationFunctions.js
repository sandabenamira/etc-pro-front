// const addUserRbac = {
//   Admin: 'add-admin',
//   Professor: 'add-prof',
//   Parent: 'add-parent',
//   Student: 'add-student',
//   'Vie scolaire': 'add-school-life',
//   Director: 'add-direction-membre',
// };
const addUserRbac = {
  Admin: 'add-admin',
  Formateur: 'add-prof',
  'Responsable formation': 'add-parent',
  Participant: 'add-student',
  'Vie scolaire': 'add-school-life',
  Director: 'add-direction-membre',
};
const deleteUserRbac = {
  Admin: 'delete-admin',
  Professor: 'delete-prof',
  Parent: 'delete-parent',
  Student: 'delete-student',
  'Vie scolaire': 'delete-school-life',
  Director: 'delete-direction-membre',
};
const editUserRbac = {
  Admin: 'edit-admin',
  Professor: 'edit-prof',
  Parent: 'edit-parent',
  Student: 'edit-student',
  'Vie scolaire': 'edit-school-life',
  Director: 'edit-direction-membre',
};
const getUserRbac = {
  Admin: 'get-admin',
  Professor: 'get-prof',
  Parent: 'get-parent',
  Student: 'get-student',
  'Vie scolaire': 'get-school-life',
  Director: 'get-direction-membre',
};
module.exports = {
  isEmail(value) {
    if (value != null) {
      if (value.length > 0)
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      else return true;
    } else {
      return false;
    }
  },

  isPhonenumber(str) {
    if (str.length > 1) return /^[2-9]\d{7}$/.test(str);
    else return true;
  },
  isZipCode(zipCode) {
    if (zipCode.length > 0) return /^[1-9]\d{3}$/.test(zipCode);
    else return true;
  },

  isCIN(cin) {
    if (cin.length > 0) return /^[0-9]\d{7}$/.test(cin);
    else return true;
  },
  isNotEmpty(value) {
    if (value.length > 0) return true;
    else return false;
  },
  addUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission = userPermission.findIndex((element) => element.permission.rbac===addUserRbac[roleLabel]) > -1;
    }

    return permission;
  },
  deleteUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission = userPermission.findIndex((element) => element.permission.rbac===deleteUserRbac[roleLabel]) > -1;
    }

    return permission;
  },
  editUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission = userPermission.findIndex((element) => element.permission.rbac===editUserRbac[roleLabel]) > -1;
    }

    return permission;
  },
  getUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission = userPermission.findIndex((element) => element.permission.rbac===editUserRbac[roleLabel]) > -1;
    }

    return permission;
  },
  havePermission({ permission, permissionList }) {
    if (!permissionList || permissionList.length === 0) {
      return false;
    } else {
      const found = permissionList.find((element) => element.permission.rbac===permission);
      if (typeof found != 'undefined') {
        return true;
      } else {
        return false;
      }
    }
  },
};
