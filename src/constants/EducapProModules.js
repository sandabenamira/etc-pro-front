 
 


export const educapProModules = [
  {
    name: 'Super Administration',
    pathName: 'super-administration',
    order: 1,
    type: 'subMenu',
    component: 'SuperAdministration',
    id: 5,
  },
  {
    name: 'Administration',
    pathName: 'administration',
    order: 1,
    type: 'subMenu',
    component: 'Administration',
    id: 1,
  },
  {
    name: 'E-learning',
    pathName: 'e-learning',
    order: 2,
    type: 'subMenu',
    component: 'Learning',
    id: 2,
  },
  {
    name: 'Catalogue',
    pathName: 'catalog',
    order: 3,
    type: 'subMenu',
    component: 'Catalog',
    id: 3,
  },
  {
    name: 'Reporting',
    pathName: 'reporting',
    order: 4,
    type: 'subMenu',
    component: 'Reporting',
    id: 4,
  },
  
];

export const sousModuleAdministration = [
  {
    name: 'agency-management',
    pathName: 'administration/agency-management',
    icon: 'laptop-chromebook',
    id: 1,
  },
  {
    name: 'user-management',
    pathName: 'administration/user-management',
    icon: 'cloud-outline-alt',
    id: 2,
  },
  {
    name: 'partner-management',
    pathName: 'administration/partner-management',
    icon: 'accounts-alt',
    id: 3,
  },
  {
    name: 'permissions-settings',
    pathName: 'administration/permissions-settings',
    icon: 'folder-outline',
    id: 4,
  },
];

export const sousModuleSuperAdministration = [
  {
    name: 'inscription',
    pathName: 'super-administration/inscription',
    icon: 'laptop-chromebook',
    id: 1,
  },
  {
    name: 'entreprise',
    pathName: 'super-administration/entreprise',
    icon: 'folder-outline',
    id: 2,
  },
  {
    name: 'partner-management',
  pathName: 'super-administration/partner-management',
  icon: 'accounts-alt',
  id: 3,
},
  
   
   
];

export const sousModuleELearning = [
  {
    name: 'online-training',
    pathName: 'e-learning/online-training',
    icon: 'laptop-chromebook',
    id: 1,
  },
  {
    name: 'training-materials',
    pathName: 'e-learning/training-materials',
    icon: 'cloud-outline-alt',
    id: 2,
  },
  {
    name: 'moocs',
    pathName: 'e-learning/moocs',
    icon: 'folder-outline',
    id: 3,
  },
];

export const sousModuleReporting = [
  {
    name: 'reporting-formation',
    pathName: 'reporting/reporting-formation',
    icon: 'laptop-chromebook',
    id: 1,
  },
  {
    name: 'reporting-financier',
    pathName: 'reporting/reporting-financier',
    icon: 'cloud-outline-alt',
    id: 2,
  },
];
