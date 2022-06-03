/* eslint eqeqeq: "off" */
const addUserRbac = {
  Admin: "add-admin",
  Formateur: "add-prof",
  "Responsable formation": "add-parent",
  Participant: "add-student",
  "Vie scolaire": "add-school-life",
  Director: "add-direction-membre",
};

const deleteUserRbac = {
  Admin: "delete-admin",
  Professor: "delete-prof",
  Parent: "delete-parent",
  Student: "delete-student",
  "Vie scolaire": "delete-school-life",
  Director: "delete-direction-membre",
};
const editUserRbac = {
  Admin: "edit-admin",
  Professor: "edit-prof",
  Parent: "edit-parent",
  Student: "edit-student",
  "Vie scolaire": "edit-school-life",
  Director: "edit-direction-membre",
};

module.exports = {
  isEmail(inputText) {
    if (
      inputText != null &&
       inputText.length > 0
    ) {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          inputText
        )
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  isUndefinedString(str) {
    if (typeof str == "undefined") return "";
  },

  isPhonenumber(str) {
    if (!isNaN(str) && str.length > 0 && /^-?\d+$/.test(str)) {
      // if (str.length > 0 && /^-?\d+$/.test(str)) {
      //   return /^[0-9]\d{7}$/.test(str);
      console.log("helloooooooooooooo2", str);

      var phoneno = /^\d{8}$/;
      if (str.length > 0 && str.value.match(phoneno)) {
        console.log("helloooooooo3", str);

        return false;
      }
    } else return true;
  },

  phonenumber(str) {
    let phoneno = /^\+?([0-9]{})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (str.value.match(phoneno)) return false;
    else return true;
  },
  isZipCode(zipCode) {
    const s = zipCode.trim();
    console.log("hello", s);
    if (s.length > 0) return /^[0-9]\d{3}$/.test(s);
    else return true;
  },

  isCIN(cin) {
    if (cin.length > 0) return /^[0-9]\d{7}$/.test(cin);
    else return true;
  },
  isNotEmpty(value) {
    const s = value.trim();
    if (s.length > 0) return true;
    else return false;
  },
  addUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac === addUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  deleteUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac === deleteUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  editUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac === editUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  getUserPermitted(roleLabel, userPermission) {
    let permission = false;

    if (userPermission != undefined) {
      permission =
        userPermission.findIndex(
          (element) => element.permission.rbac === editUserRbac[roleLabel]
        ) > -1;
    }

    return permission;
  },
  havePermission({ permission, permissionList }) {
    if (!permissionList || permissionList.length === 0) {
      return false;
    } else {
      const found = permissionList.find(
        (element) => element.permission.rbac === permission
      );
      if (typeof found != "undefined") {
        return true;
      } else {
        return false;
      }
    }
  },
};
