import _ from 'lodash';

const rules = {
  visitor: {
    static: ['home-page:visit'],
    'module-nav-access': ({ mod, moduleList }) => {
      if (!moduleList || moduleList.length === 0) {
        return false;
      } else {
        const found = moduleList.find((element) => element.module.path == mod);
        if (typeof found != 'undefined') {
          return true;
        }
      }
    },
  },
  professor: {
    static: [
      'emploi-filter-class:visit',
      'emploi-supplies:add',
      'module-nav-call_register',
      'module-nav-mail',
      'module-nav-dashboard',
      'module-nav-devoir',
      'module-nav-calendar',
      'module-nav-emploi',
      'module-nav-menuGrade',
      'module-nav-grades',
      'module-nav-exams',
      'module-nav-report',
      'module-nav-complaints',
      'module-nav-e-learning',
      'module-nav-lesson',
      'module-nav-virtual_classes',
      'module-nav-e-libraries',
      'lesson-filter:visit',
      'virtual-class-prof-filter:visit',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'todo-filter:visit',
      'todo-filter-class:visit',
      'todo-filter-subject:visit',
      'lesson-class-add',
      'lesson-filter-date:visit',
      'lesson-filter-class:visit',
      'todo-menu-action:visit',
      'todo-menu-action-modif:visit',
      'todo-menu-action-delete:visit',
      'homework-filter:visit',
      'lesson-option-menu-select:visit',
      'homework-button-add',
      'homework-details:visit',
      'homework-assign-classes:visit',
      'homework-filter-student:visit',
      'homework-comment:visit',
      'todo-menu-active-homework:visit',
      'class-virtual-delete:visit',
      'class-virtual-show:visit',
      'clas-virtual-menu:visit',
      'class-virtual-edit:visit',
      'add-service',
      'module-nav-moocs',
      'module-nav-course-material',
      'module-nav-assiduity',
      'module-nav-timetable',
      'Professor.Dashborad:visit',
      'module-nav-homeworks',
      'module-nav-book_management',
      'module-nav-text_copybook',
      'homework-filter-class',
      'module-nav-internal_mail',
      'module-nav-note',
      'module-nav-satisfaction-question',
      'module-nav-reporting-kpi',
    ],
    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  student: {
    static: [
      // "home-filter:visit",
      'payment-filter:visit',
      'module-nav-mail',
      'module-nav-dashboard',
      'module-nav-devoir',
      'module-nav-calendar',
      'module-nav-emploi',
      'module-nav-menuGrade',
      'module-nav-grades',
      'module-nav-report',
      'module-nav-complaints',
      'module-nav-cafeteria',
      'module-nav-health-monitoring',
      'module-nav-e-learning',
      'module-nav-lesson',
      'module-nav-virtual_classes',
      'module-nav-e-libraries',
      'Student.Dashborad:visit',
      'virtual-subject-student-filter:visit',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'lesson-filter:visit',
      'lesson-filter-date:visit',
      'lesson-filter-student-subject:visit',
      'todo-menu-action:visit',
      'lesson-filter-search:visit',
      'todo-filter-subject:visit',
      'todo-filter:visit',
      'homework-details:visit',
      'homework-display-details:visit',
      'homework-comment:visit',
      'cafeteria-menu-student:visit',
      'clas-virtual-menu:visit',
      'module-nav-moocs',
      'module-nav-course-material',
      'KPI-subject-material-course',
      'module-nav-assiduity',
      'module-nav-timetable',
      'get-subject-folders',
      'module-nav-homeworks',
      'module-nav-book_management',
      'module-nav-internal_mail',
      'module-nav-note',
      'module-nav-satisfaction-question',
      'module-nav-reporting-kpi',

      
      
    ],
    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  parent: {
    static: [
      'home-filter:visit',
      'payment-filter:visit',
      'module-nav-mail',
      'module-nav-dashboard',
      'module-nav-devoir',
      'module-nav-calendar',
      'module-nav-emploi',
      'module-nav-menuGrade',
      'module-nav-grades',
      'module-nav-report',
      'module-nav-complaints',
      'module-nav-cafeteria',
      'module-nav-health-monitoring',
      'module-nav-e-learning',
      'module-nav-financial_management',
      'emploi-display-supplie',
      'module-nav-lesson',
      'module-nav-virtual_classes',
      'module-nav-e-libraries',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'todo-menu-action:visit',
      'todo-filter-subject:visit',
      'todo-filter:visit',
      'homework-details:visit',
      'homework-display-details:visit',
      'cafeteria-menu-student:visit',
      'clas-virtual-menu:visit',
      'module-nav-moocs',
      'module-nav-course-material',
      'KPI-subject-material-course',
      'module-nav-assiduity',
      'module-nav-timetable',
      'get-subject-folders',
      'module-nav-homeworks',
      'module-nav-book_management',
      'module-nav-internal_mail',
      'module-nav-note',
      'module-nav-satisfaction-question',
      'module-nav-reporting-kpi',
      'module-nav-call_register',


    ],
    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  supervisor: {
    static: [
      'home-filter:visit',
      'module-nav-administration',
      'module-nav-e-learning',
      'module-nav-usersManagement',
      'module-nav-homeworks',
      'module-nav-internal_mail',
      'module-nav-note',
      'module-nav-satisfaction-question',
      'module-nav-reporting-kpi',

      
    ],
    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'posts:edit': ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  director: {
    static: [
      'module-calendar:visit',
      'home-filter-establishment-services:visit',
      'calendar-filter:visit',
      'emploi-filter:visit',
      'service-filter:visit',
      'home-filter:visit',
      'payment-filter:visit',
      'payment-filter-class:visit',
      'payment-filter-group:visit',
      'payment-filter-picker:visit',
      'itemPayment-filter-action-payment:visit',
      'module-nav-administration',
      'module-nav-stuppUser',
      'module-nav-services',
      'module-nav-classes',
      'module-nav-rooms',
      'module-nav-call_register',
      'module-nav-billetPass',
      'module-nav-mail',
      'module-nav-devoir',
      'module-nav-complaints',
      'module-nav-cafeteria',
      'module-nav-dashboard',
      'module-nav-health-monitoring',
      'module-nav-e-learning',
      'module-nav-financial_management',
      'module-nav-calendar',
      'module-nav-emploi',
      'module-nav-planning',
      'module-nav-menuGrade',
      'module-nav-grades',
      'module-nav-exams',
      'module-nav-report',
      'module-nav-lesson',
      'module-nav-virtual_classes',
      'module-nav-e-libraries',
      'lesson-filter:visit',
      'lesson-filter-level:visit',
      'lesson-filter-section:visit',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'lesson-filter-class:visit',
      'todo-menu-action:visit',
      'todo-menu-action-modif:visit',
      'todo-menu-action-delete:visit',
      'homework-filter:visit',
      'homework-filter-professor:visit',
      'admin-health-filter:visit',
      'homework-details:visit',
      'homework-filter-prof-name:visit',
      'homework-assign-classes:visit',
      'module-nav-service-allocation',
      'module-nav-payment',
      'module-nav-billing',
      'clas-virtual-menu:visit',
      'module-nav-options',
      'module-nav-moocs',
      'module-nav-homeworks',
      'module-nav-internal_mail',
      'module-nav-note',
      'module-nav-satisfaction-question',
      'module-nav-reporting-kpi',

    ],

    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  admin: {
    static: [
      'module-calendar:visit',
      'home-filter-establishment-services:visit',
      'calendar-filter:visit',
      'emploi-filter:visit',
      'service-filter:visit',
      'home-filter:visit',
      'payment-filter:visit',
      'payment-filter-class:visit',
      'payment-filter-group:visit',
      'payment-filter-picker:visit',
      'itemPayment-filter-action-payment:visit',
      'module-nav-administration',
      'module-nav-community',
      'module-nav-dashboard',
      'module-nav-usersManagement',
      'module-nav-subjects',
      'module-nav-services',
      'module-nav-classes',
      'module-nav-rooms',
      'module-nav-call_register',
      'module-nav-billetPass',
      'module-nav-mail',
      'module-nav-devoir',
      'module-nav-complaints',
      'module-nav-cafeteria',
      'module-nav-health-monitoring',
      'module-nav-e-learning',
      'module-nav-financial_management',
      'module-nav-calendar',
      'module-nav-emploi',
      'module-nav-planning',
      'module-nav-menuGrade',
      'module-nav-grades',
      'module-nav-exams',
      'module-nav-report',
      'module-nav-lesson',
      'module-nav-virtual_classes',
      'module-nav-e-libraries',
      'user-filter:visit',
      'module-nav-options',
      'lesson-filter:visit',
      'lesson-filter-level:visit',
      'lesson-filter-section:visit',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'lesson-class-add',
      'lesson-filter-class:visit',
      'todo-menu-action:visit',
      'todo-menu-action-modif:visit',
      'todo-menu-action-delete:visit',
      'homework-filter:visit',
      'homework-filter-professor:visit',
      'formulaire-add-cour',
      'lesson-option-menu-select:visit',
      'admin-health-filter:visit',
      'homework-button-add',
      'todo-filter:visit',
      'todo-filter-class:visit',
      'todo-filter-subject:visit',
      'homework-details:visit',
      'homework-filter-prof-name:visit',
      'homework-assign-classes:visit',
      'user-import-excel:visit',
      'payment-export-csv:visit',
      'module-nav-service-allocation',
      'module-nav-payment',
      'module-nav-billing',
      'virtual-class-admin-filter:visit',
      'module-nav-service',
      'add-service',
      'formulaire-add-service',
      'todo-menu-active-homework:visit',
      'cafeteria-menu-admin:visit',
      'module-nav-schoolSettings',
      'module-nav-levels',
      'module-nav-sections',
      'module-nav-subjectModule',
      'module-nav-subjectsSettings',
      'module-nav-classes',
      'module-nav-classesSettings',
      'module-nav-schoolSession',
      'module-nav-typeOfEducation',
      'module-nav-virtual_classes',
      'module-nav-moocs',
      'module-nav-course-material',
      'module-nav-homeworks',
      'module-nav-assiduity',
      'module-nav-educational_calendar',
      'module-nav-timetable',
      'module-nav-planning',
      'module-nav-call_register',
      'module-nav-billet_pass',
      'module-nav-courseAssignment',
      'class-virtual-delete:visit',
      'class-virtual-show:visit',
      'clas-virtual-menu:visit',
      'class-virtual-edit:visit',
      'virtuel-class-input-professor:visit',
      'module-nav-examTypes',
      'module-nav-course-support',
      'module-nav-virtual-classes-details',
      'call-register-filter:visit',
      'module-nav-callRegisterSetting',
      'module-nav-permissionSetting',
      'module-nav-book_management',
      'module-nav-text_copybook',
      'homework-filter-class',
      // 'module-nav-groupes',
      'module-nav-internal_mail',
      'module-nav-evaluation',
      'module-nav-note',
      'module-nav-satisfaction-question',
      'module-nav-reporting-kpi',
      'module-nav-agenceSetting',
      

      
    ],

    dynamic: {
      'module-nav-access': ({ mod, moduleList }) => {
        if (!moduleList || moduleList.length === 0) {
          return false;
        } else {
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
  superadmin: {
    static: [
      'module-calendar:visit',
      'calendar-filter:visit',
      'billetPass-filter-establishment:visit',
      'calendar-filter-establishment:visit',
      'emploi-filter-establishment:visit',
      'emploi-filter:visit',
      'role-filter-establishment:visit',
      'emploi-filter:visit',
      'service-filter:visit',
      'service-filter-establishment:visit',
      'home-filter:visit',
      'home-filter-establishment:visit',
      'payment-filter:visit',
      'payment-filter-establishment:visit',
      'payment-filter-class:visit',
      'payment-filter-group:visit',
      'payment-filter-picker:visit',
      'itemPayment-filter-action-payment:visit',
      'module-nav-administration',
      'module-nav-super_administration',
      // "module-nav-settings_management",
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
      'user-filter:visit',
      'user-filter-establishment:visit',
      'lesson-filter:visit',
      'lesson-filter-level:visit',
      'lesson-filter-section:visit',
      'module-nav-qcm',
      'module-nav-quiz',
      'module-nav-tests',
      'module-nav-forum',
      'lesson-filter-class:visit',
      'admin-health-filter:visit',
      'user-import-excel:visit',
      'user-import-excel-filter-establishment:visit',
      'module-nav-service-allocation',
      'module-nav-payment',
      'module-nav-billing',
      'module-nav-service',
      'add-service',
      'formulaire-add-service',
      'cafeteria-menu-admin:visit',
      'module-nav-schoolLicence',
      'module-nav-reclamations',
      'module-nav-schoolSettings',
      'module-nav-levels',
      'module-nav-sections',
      'module-nav-subjectModule',
      'module-nav-subjectsSettings',
      'module-nav-classes',
      'module-nav-classesSettings',
      'module-nav-schoolSession',
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
      'module-nav-callRegisterSetting',
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
          const found = moduleList.find((element) => element.module.path == mod);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
      'user-permission': ({ permission, permissionList }) => {
        if (!permissionList || permissionList.length === 0) {
          return false;
        } else {
          const found = permissionList.find((element) => element.permission.rbac == permission);
          if (typeof found != 'undefined') {
            return true;
          }
        }
      },
    },
  },
};

export default rules;
