export const stuppModules = [
  {
    name: 'Administration',
    pathName: 'administration',
    order: 1,
    type: 'subMenu',
    component: 'Administration',
    id: 1,
  },
  {
    name: 'Super Administration',
    pathName: 'super_administration',
    order: 2,
    type: 'subMenu',
    component: 'Superadmin',
    id: 2,
  },
  {
    name: 'E-learning',
    pathName: 'e-learning',
    order: 3,
    type: 'subMenu',
    component: 'Learning',
    id: 3,
  },
  {
    name: 'Assiduité',
    pathName: 'assiduity',
    order: 4,
    type: 'subMenu',
    component: 'Assiduity',
    id: 4,
  },
  {
    name: 'Communauté',
    pathName: 'community',
    order: 5,
    type: 'subMenu',
    component: 'Community',
    id: 5,
  },
  {
    name: 'Gestion des notes',
    pathName: 'menuGrade',
    order: 6,
    type: 'subMenu',
    component: 'GradesMenu',
    id: 6,
  },
  {
    name: 'Cantine',
    pathName: 'cafeteria',
    order: 7,
    type: 'subMenu',
    component: 'Cafeteria',
    id: 7,
  },
  {
    name: 'Suivi médical',
    pathName: 'health-monitoring',
    order: 8,
    type: 'subMenu',
    component: '',
    id: 8,
  },
  {
    name: 'Gestion financière',
    pathName: 'financial_management',
    order: 9,
    type: 'subMenu',
    component: 'FinancialManagement',
    id: 9,
  },
  {
    name: 'E-bibliothèque',
    pathName: 'e-libraries',
    order: 10,
    type: 'subMenu',
    component: 'Libraries',
    id: 10,
  },
  {
    name: 'Tableau de bord',
    pathName: 'dashboard',
    order: 11,
    type: 'subMenu',
    component: 'Dashboard',
    id: 11,
  },
  {
    name: 'Smart reporting',
    pathName: 'smart_reporting',
    order: 12,
    type: 'subMenu',
    component: 'SmartReporting',
    id: 12,
  },
  {
    name: 'Evaluation',
    pathName: 'evaluation',
    order: 13,
    type: 'subMenu',
    component: 'Evaluation',
    id: 13,
  },
];

export const sousModuleEtab = [
  {
    name: 'usersManagement',
    pathName: 'administration/usersManagement',
    id: 1,
  },
  {
    name: 'rooms',
    pathName: 'administration/rooms',
    id: 2,
  },
  {
    name: 'options',
    pathName: 'administration/options',
    id: 3,
  },
  {
    name: 'schoolYears',
    pathName: 'administration/schoolYears',
    id: 4,
  },
  {
    name: 'schoolSettings',
    pathName: 'administration/schoolSettings',
    id: 5,
  },
  {
    name: 'typeOfEducation',
    pathName: 'administration/typeOfEducation',
    id: 6,
  },
  {
    name: 'levels',
    pathName: 'administration/levels',
    id: 7,
  },
  // {
  //   name: 'sections',
  //   pathName: 'administration/sections',
  //   id: 8,
  // },
  {
    name: 'subjectModule',
    pathName: 'administration/subjectModule',
    id: 9,
  },
  {
    name: 'subjectsSettings',
    pathName: 'administration/subjectsSettings',
    id: 10,
  },
  {
    name: 'classesSettings',
    pathName: 'administration/classesSettings',
    id: 11,
  },
  {
    name: 'groupes',
    pathName: 'administration/groupes',
    id: 12,
  },

  {
    name: 'schoolSession',
    pathName: 'administration/schoolSession',
    id: 13,
  },
  {
    name: 'examTypes',
    pathName: 'administration/examTypes',
    id: 14,
  },
  {
    name: 'courseAssignment',
    pathName: 'administration/courseAssignment',
    id: 14,
  },
];
export const sousModuleSuperadmin = [
  {
    name: 'establishment_management',
    pathName: 'super_administration/establishment_management',
    icon: 'assignment-check',
    id: 1,
  },
  {
    name: 'schoolLicence',
    pathName: 'super_administration/schoolLicence',
    icon: 'notifications-active',
    id: 2,
  },
  {
    name: 'financial_management_superadmin',
    pathName: 'super_administration/financial_management_superadmin',
    icon: 'accounts-list',
    id: 3,
  },
  {
    name: 'reclamations',
    pathName: 'super_administration/reclamations',
    icon: 'mood-bad',
    id: 4,
  },
];
export const sousModuleCalendar = [
  {
    name: 'emploi',
    pathName: 'calendar/emploi',
    id: 1,
  },
  {
    name: 'planning',
    pathName: 'calendar/planning',
    id: 2,
  },
];

export const sousModuleGrades = [
  {
    name: 'grades',
    pathName: 'gradesmenu/grades',
    id: 1,
  },
  {
    name: 'exams',
    pathName: 'gradesmenu/exams',
    id: 2,
  },
  {
    name: 'report',
    pathName: 'gradesmenu/report',
    id: 2,
  },
];

export const sousModuleLibraries = [
  {
    name: 'text_copybook',
    pathName: 'e-learning/text_copybook',
    icon: 'format-color-text',
    id: 1,
  },
  {
    name: 'qcm',
    pathName: 'e-libraries/qcm',
    icon: 'time-interval',
    id: 2,
  },
  {
    name: 'quiz',
    pathName: 'e-libraries/quiz',
    icon: 'star',
    id: 3,
  },
  {
    name: 'tests',
    pathName: 'e-libraries/tests',
    icon: 'alarm',
    id: 4,
  },
  {
    name: 'forum',
    pathName: 'e-libraries/forum',
    icon: 'widgets',
    id: 5,
  },
];

export const sousModuleFinancialManagement = [
  {
    name: 'service',
    pathName: 'financial_management/service',
    icon: 'star',
    id: 1,
  },
  {
    name: 'service-allocation',
    pathName: 'financial_management/service-allocation',
    icon: 'ungroup',
    id: 2,
  },
  {
    name: 'billing',
    pathName: 'financial_management/billing',
    icon: 'card-membership',
    id: 3,
  },
  {
    name: 'payment',
    pathName: 'financial_management/payment',
    icon: 'accounts-alt',
    id: 4,
  },
];
export const sousModuleELearning = [
  {
    name: 'virtual_classes',
    pathName: 'e-learning/virtual_classes',
    icon: 'laptop-chromebook',
    id: 1,
  },
  {
    name: 'moocs',
    pathName: 'e-learning/moocs',
    icon: 'cloud-outline-alt',
    id: 2,
  },
  {
    name: 'course-material',
    pathName: 'e-learning/course-material',
    icon: 'folder-outline',
    id: 3,
  },
  {
    name: 'homeworks',
    pathName: 'e-learning/homeworks',
    icon: 'file-text',
    id: 4,
  },
  // {
  //   name: "book_management",
  //   pathName: "e-learning/book_management",
  //   icon: "collection-bookmark",
  //   id: 5,
  // },
];
export const sousModuleCommunity = [
  {
    name: 'complaints',
    pathName: 'community/complaints',
    icon: 'calendar-check',
    id: 1,
  },
  {
    name: 'internal_mail',
    pathName: 'community/internal_mail',
    icon: 'calendar-note',
    id: 2,
  },
];

export const sousModuleAssiduity = [
  {
    name: 'planning',
    pathName: 'assiduity/planning',
    icon: 'calendar-check',
    id: 1,
  },
  {
    name: 'timetable',
    pathName: 'assiduity/timetable',
    icon: 'calendar-note',
    id: 2,
  },
  // {
  //   name: "educational_calendar",
  //   pathName: "assiduity/educational_calendar",
  //   icon: "calendar",
  //   id: 3,
  // },
  {
    name: 'call_register',
    pathName: 'assiduity/call_register',
    icon: 'collection-item-1',
    id: 4,
  },
  // {
  //   name: "billet_pass",
  //   pathName: "assiduity/billet_pass",
  //   icon: "walk",
  //   id: 5,
  // },
];

export const sousModuleEtab2 = [
  {
    name: 'agenceSetting',
    pathName: 'administration/agenceSetting',
    icon: 'settings-square',
    id: 1,
  },
  {
    name: 'usersManagement',
    pathName: 'administration/usersManagement',
    icon: 'accounts-alt',
    id: 2,
  },
  {
    name: 'schoolSettings',
    pathName: 'administration',
    icon: 'settings',
    id: 3,
    sousSousModules: [
      {
        name: 'typeOfEducation',
        pathName: 'typeOfEducation',
        icon: 'card-giftcard',
        id: 1,
      },
      {
        name: 'levels',
        pathName: 'levels',
        icon: 'trending-up',
        id: 2,
      },
      // {
      //   name: 'sections',
      //   pathName: 'sections',
      //   icon: 'view-week',
      //   id: 3,
      // },
      {
        name: 'classesSettings',
        pathName: 'classesSettings',
        icon: 'group-work',
        id: 4,
      },
      {
        name: 'groupes',
        pathName: 'groupes',
        icon: 'collection-text',
        id: 5,
      },
      {
        name: 'subjectModule',
        pathName: 'subjectModule',
        icon: 'settings',
        id: 6,
      },
      {
        name: 'subjectsSettings',
        pathName: 'subjectsSettings',
        icon: 'collection-folder-image',
        id: 7,
      },
      {
        name: 'courseAssignment',
        pathName: 'courseAssignment',
        icon: 'assignment',
        id: 8,
      },

      {
        name: 'schoolSession',
        pathName: 'schoolSession',
        icon: 'ungroup',
        id: 9,
      },
      {
        name: 'typesOfExams',
        pathName: 'examTypes',
        icon: 'collection-text',
        id: 10,
      },
    ],
  },
  {
    name: 'permissionSetting',
    pathName: 'administration/permissionSetting',
    icon: 'block-alt',
    id: 4,
  },
  {
    name: 'callRegisterSetting',
    pathName: 'administration/callRegisterSetting',
    icon: 'settings-square',
    type: 'item',
    id: 5,
  },
  {
    name: 'rooms',
    pathName: 'administration/rooms',
    icon: 'home',
    id: 6,
  },
  {
    name: 'options',
    pathName: 'administration/options',
    icon: 'star',
    id: 7,
  },
];
export const sousModuleAdministration = [
  
  {
    name: 'administration',
    icon: 'device-hub',
    pathName: 'administration',
    type: 'collapse',
    children: [
      {
        name: 'agenceSetting',
        pathName: 'administration/agenceSetting',
        icon: 'settings-square',
        type: 'item',
        id: 1,
      },
      {
        name: 'usersManagement',
        pathName: 'administration/usersManagement',
        icon: 'accounts-alt',
        type: 'item',
        id: 2,
      },
      {
        name: 'schoolSettings',
        pathName: 'administration',
        type: 'collapse',
        // icon: 'pages',
        children: [
          {
            name: 'typeOfEducation',
            pathName: 'administration/typeOfEducation',
            type: 'item',
            icon: 'card-giftcard',
            id: 1,
          },
          {
            name: 'levels',
            pathName: 'administration/levels',
            type: 'item',
            icon: 'trending-up',
            id: 2,
          },
          // {
          //   name: 'sections',
          //   pathName: 'administration/sections',
          //   type: 'item',
          //   icon: 'view-week',
          //   id: 3,
          // },
          {
            name: 'classesSettings',
            pathName: 'administration/classesSettings',
            type: 'item',
            icon: 'group-work',
            id: 4,
          },
          {
            name: 'groupes',
            pathName: 'administration/groupes',
            type: 'item',
            icon: 'collection-text',
            id: 5,
          },
          {
            name: 'subjectModule',
            pathName: 'administration/subjectModule',
            type: 'item',
            icon: 'settings',
            id: 6,
          },
          {
            name: 'subjectsSettings',
            pathName: 'administration/subjectsSettings',
            type: 'item',
            icon: 'collection-folder-image',
            id: 7,
          },
          {
            name: 'courseAssignment',
            pathName: 'administration/courseAssignment',
            type: 'item',
            icon: 'assignment',
            id: 8,
          },

          {
            name: 'schoolSession',
            pathName: 'administration/schoolSession',
            type: 'item',
            icon: 'ungroup',
            id: 9,
          },
          {
            name: 'typesOfExams',
            pathName: 'administration/examTypes',
            type: 'item',
            icon: 'collection-text',
            id: 10,
          },
        ],
      },
      
      {
        name: 'permissionSetting',
        pathName: 'administration/permissionSetting',
        icon: 'settings-square',
        type: 'item',
        id: 4,
      },
      {
        name: 'callRegisterSetting',
        pathName: 'administration/callRegisterSetting',
        icon: 'settings-square',
        type: 'item',
        id: 5,
      },
      {
        name: 'rooms',
        pathName: 'administration/rooms',
        icon: 'home',
        type: 'item',
        id: 6,
      },
      {
        name: 'options',
        pathName: 'administration/options',
        icon: 'star',
        type: 'item',
        id: 7,
      },
    ],
  },
];
export const sousModuleEvaluation = [
  // {
  //   name: "note",
  //   pathName: "evaluation/note",
  //   icon: "star",
  //   id: 1,
  // },
  {
    name: 'satisfaction-question',
    pathName: 'evaluation/satisfaction-question',
    icon: 'card-membership',
    id: 3,
  },
  {
    name: 'reporting-kpi',
    pathName: 'evaluation/reporting-kpi',
    icon: 'accounts-alt',
    id: 4,
  },
];
