

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
