const rules = {
  admin: {
    static: [
      'module-nav-super-administration',
      'module-nav-inscription',
      'module-nav-administration',
      'module-nav-e-learning',
      'module-nav-catalog',
      'module-nav-reporting',
      'module-nav-agency-management',
      'module-nav-user-management',
      'module-nav-permissions-settings',
      'module-nav-online-training',
      'module-nav-training-materials',
      'module-nav-moocs',
      'module-nav-reporting-formation',
      'module-nav-reporting-financier',
      'module-nav-partner-management',
    ],

    dynamic: {
      'module-nav-access': ({mod, moduleList}) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.pathName === mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      // 'user-permission': ({ permission, permissionList }) => {
      //   if (!permissionList || permissionList.length === 0) {
      //     return false;
      //   } else {
      //     const found = permissionList.find((element) => element.permission.rbac === permission);
      //     if (typeof found != 'undefined') {
      //       return true;
      //     }
      //   }
      // },
    },
  },
};

export default rules;
