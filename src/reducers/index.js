import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import establishmentReducer from './establishmentReducer';
import StudentReducer from './StudentReducer';
import professorReducer from './professorReducer';
import classeReducer from './classeReducer';
import ModuleReducer from './ModuleReducer';
import planningReducer from './planningReducer';
import ClassLevel from './ClassLevel';
import ClassSettingsReducer from './ClassSettingsReducer';
import Mail from './Mail';
import Complaint from './Complaint';
import ToDo from './ToDo';
import noteReducer from './noteReducer';
import callRegisterReducer from './callRegisterReducer';
import subjectReducer from './subjectReducer';
import examReducer from './examReducer';
import presenceReducer from './presenceReducer';
import parentReducer from './parentReducer';
import ServiceReducer from './ServiceReducer';
import PaymentReducer from './PaymentReducer';
import countriesReducer from './countriesReducer';
import TypeOfEducationReducer from './TypeOfEducationReducer';
import sectionReducer from './sectionReducer';
import roomReducer from './roomReducer';
import stuppUserReducer from './stuppUserReducer';
import profileReducer from './profileReducer';
import Alerts from './Alert';
import LessonReducer from './LessonReducer';
import classVirtualReducer from './classVirtualReducer';
import HealthReducer from './HealthReducer';
import CafeteriaReducer from './CafeteriaReducer';
import SchoolYearEtabReducer from './SchoolYearEtabReducer';
import SuperadministrationReducer from './SuperadministrationReducer';
import AllocationServiceReducer from './AllocationServiceReducer';
import BillReducer from './BillReducer';
import SubjectModuleReducer from './SubjectModuleReducer';
import SectionsReducer from './SectionsReducer';
import levelsReducer from './levelReducer';
import SchoolSessionReducer from './SchoolSessionReducer';
import ExamTypesReducer from './ExamTypesReducer';
import SupportCoursReducer from './SupportCoursReducer';
import AssignementReducer from './AssignementReducer';
import SchoolLicenceReducer from './SchoolLicenceReducer';
import MoocsReducer from './MoocsReducer';
import MaterialCourseReducer from './MaterialCourseReducer';
import PermissionReducer from './PermissionReducer';
import usersReducer from "./usersReducer"
import HomeworkReducer from './HomeworkReducer'
import GroupsReducer from './GroupsReducer'


export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    establishment: establishmentReducer,
    student: StudentReducer,
    professor: professorReducer,
    mail: Mail,
    complaint: Complaint,
    toDo: ToDo,
    classes: classeReducer,
    subject: subjectReducer,
    grade: noteReducer,
    callRegister: callRegisterReducer,
    module: ModuleReducer,
    planning: planningReducer,
    exam: examReducer,
    ClassLevels: ClassLevel,
    presence: presenceReducer,
    parent: parentReducer,
    service: ServiceReducer,
    payment: PaymentReducer,
    countries: countriesReducer,
    EstabTypes: TypeOfEducationReducer,
    classSections: sectionReducer,
    profiles: profileReducer,
    stuppUsers: stuppUserReducer,
    rooms: roomReducer,
    alert: Alerts,
    lessons: LessonReducer,
    classVirtualReducer: classVirtualReducer,
    HealthReducer: HealthReducer,
    CafeteriaReducer: CafeteriaReducer,
    schoolYearEtab: SchoolYearEtabReducer,
    SuperadministrationReducer: SuperadministrationReducer,
    allocationService: AllocationServiceReducer,
    billReducer: BillReducer,
    subjectModuleReducer: SubjectModuleReducer,
    ClassSettingsReducer: ClassSettingsReducer,
    SectionsReducer: SectionsReducer,
    levelsReducer: levelsReducer,
    schoolSessionReducer: SchoolSessionReducer,
    ExamTypesReducer: ExamTypesReducer,
    SupportCoursReducer: SupportCoursReducer,
    AssignementReducer: AssignementReducer,
    SchoolLicenceReducer: SchoolLicenceReducer,
    MoocsReducer: MoocsReducer,
     usersReducer:usersReducer,
    MaterialCourseReducer: MaterialCourseReducer,
    PermissionReducer: PermissionReducer,
    HomeworkReducer: HomeworkReducer,
    GroupsReducer:GroupsReducer
  });
