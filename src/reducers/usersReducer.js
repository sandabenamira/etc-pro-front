import {
  FETCH_ALL_ROLE,
  ADD_USER,
  GET_ALL_USERS_FOR_ADMIN,
  GET_ALL_USERS_FOR_SUPER_ADMIN,
  EDIT_USER,
  DELETE_USER,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../constants/ActionTypes';
import { roleIdAdmin, roleIdProfessor, roleIdStudent, roleIdDirector, roleIdParent, roleIdSupervisor } from '../config/config';
const initialState = {
  roles: [],
  users: [],
  archivedUsers: [],
  allUsers: [],
  students: [],
  parents: [],
  professors: [],
  admins: [],
  directors: [],
  supervisors: [],
  userLoading: false,
};

export default function (state = initialState, action) {
  if (action.type === FETCH_ALL_ROLE) {
    return Object.assign({}, state, {
      roles: action.payload,
    });
  }
  if (action.type === GET_ALL_USERS_FOR_ADMIN) {
    let parents = action.payload.filter((element) => element.roleId === roleIdParent);
    let students = action.payload.filter((element) => element.roleId === roleIdStudent);
    let professors = action.payload.filter((element) => element.roleId === roleIdProfessor);
    let admins = action.payload.filter((element) => element.roleId === roleIdAdmin);
    let directors = action.payload.filter((element) => element.roleId === roleIdDirector);
    let supervisors = action.payload.filter((element) => element.roleId === roleIdSupervisor);

    return Object.assign({}, state, {
      users: action.payload,
      parents: parents,
      students: students,
      professors: professors,
      admins: admins,
      directors: directors,
      supervisors: supervisors,
    });
  }
  if (action.type === GET_ALL_USERS_FOR_SUPER_ADMIN) {
    return Object.assign({}, state, {
      allUsers: action.payload,
      userLoading: false,
    });
  }
  if (action.type === ADD_USER) {
    return Object.assign({}, state, {
      users: state.users.concat(action.payload),
      userLoading: false,
    });
  }

  if (action.type === EDIT_USER) {
    return Object.assign({}, state, {
      users: [...state.users.filter((element) => element.id !== action.payload.id), action.payload],
    });
  }

  if (action.type === DELETE_USER) {
    return Object.assign({}, state, {
      users: [...state.users.filter((element) => element.id !== action.payload.id)],
      archivedUsers: state.archivedUsers.concat(action.payload),
    });
  }
  if (action.type === SHOW_LOADER) {
    return Object.assign({}, state, {
      userLoading: true,
    });
  }
  if (action.type === HIDE_LOADER) {
    return Object.assign({}, state, {
      userLoading: false,
    });
  }

  return state;
}
