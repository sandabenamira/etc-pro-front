const rules = {

  admin: {
    static: [
     
    ],

    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path === mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac === permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  superadmin: {
    static: [

      'module-nav-administration',
      'module-nav-super_administration',
      'module-nav-establishment_management',
      'module-nav-reporting',
      'module-nav-financial_management_superadmin',
      'module-nav-establishment',
      'module-nav-usersManagement',
      'module-nav-services',
      'module-nav-classes',
      'module-nav-subjects',
      'module-nav-rooms',
      'module-nav-schoolYear',
      'module-nav-devoir',
      'module-nav-calendar',
      'module-nav-emploi',
      'module-nav-planning',
      'module-nav-menuGrade',
      'module-nav-grades',
      'module-nav-exams',
      'module-nav-report',
      'module-nav-complaints',
      'module-nav-cafeteria',
      'module-nav-health-monitoring',
      'module-nav-e-learning',
      'module-nav-financial_management',
      'module-nav-lesson',
      'module-nav-virtual_classes',
      'module-nav-e-libraries',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'module-nav-service-allocation',
      'module-nav-payment',
      'module-nav-billing',
      'module-nav-service',
      'module-nav-schoolLicence',
      'module-nav-reclamations',
      'module-nav-schoolSettings',
      'module-nav-levels',
      'module-nav-sections',
      'module-nav-subjectModule',
      'module-nav-subjectsSettings',
      'module-nav-classes',
      'module-nav-examTypes',
      'module-nav-courseAssignment',
      'module-nav-options',
      'module-nav-assiduity',
      'module-nav-educational_calendar',
      'module-nav-timetable',
      'module-nav-planning',
      'module-nav-call_register',
      'module-nav-billet_pass',
      'module-nav-courseAssignment',
      'module-nav-moocs',
      'module-nav-course-material',
      'module-nav-homeworks',
      'module-nav-moocs',
      'module-nav-permissionSetting',
      'module-nav-book_management',
      'module-nav-text_copybook',
      'module-nav-internal_mail',
      'module-nav-note',
      'module-nav-satisfaction-question',
    ],

    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path === mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac === permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
};

export default rules;
