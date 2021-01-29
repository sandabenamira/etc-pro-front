const addUserRbac = {
  Admin: "add-admin",
  Formateur: "add-prof",
  "Responsable formation": "add-parent",
  Participant: "add-student",
  // "Vie scolaire": "add-school-life",
  Director: "add-direction-membre",
};
const deleteUserRbac = {
  Admin: "delete-admin",
  Formateur: "delete-prof",
  "Responsable formation": "delete-parent",
  Participant: "delete-student",
  "Vie scolaire": "delete-school-life",
  Director: "delete-direction-membre",
};
const editUserRbac = {
  Admin: "edit-admin",
  Formateur: "edit-prof",
  "Responsable formation": "edit-parent",
  Participant: "edit-student",
  "Vie scolaire": "edit-school-life",
  Director: "edit-direction-membre",
};
const getUserRbac = {
  Admin: "get-admin",
  Formateur: "get-prof",
  "Responsable formation": "get-parent",
  Participant: "get-student",
  "Vie scolaire": "get-school-life",
  Director: "get-direction-membre",
};
module.exports = {
  isEmail(value) {
    if (value.length > 0)
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    else return true;
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
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac == addUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  deleteUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac == deleteUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  editUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac == editUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  getUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac == editUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
};
