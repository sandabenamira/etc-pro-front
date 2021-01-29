import {
  GET_PERMISSION_SETTING,
  GET_USER_PERMISSION,
  EDIT_PERMISSION_SETTING,
} from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
  permissionSetting: [],
  userPermission: [],
};

export default function(state = initialState, action) {
  // switch (action.type) {
  //   case EDIT_PERMISSION_SETTING:
  //     let newPermissions = state.permissionSetting.filter(
  //       (element) =>
  //         // _.includes(action.payload, element)
  //         element.id == 1
  //     );
  //     // console.log('newPermissions reducer');

  //     return Object.assign({}, state, {
  //       permissionSetting: action.payload,
  //     });
  //   case GET_PERMISSION_SETTING:
  //     console.log('gettttttttttttttt reducer');

  //     return Object.assign({}, state, {
  //       permissionSetting: action.payload,
  //     });
  //   case GET_USER_PERMISSION:
  //     return Object.assign({}, state, {
  //       userPermission: action.payload,
  //     });

  //   default:
  //     return state;
  // }
  if (action.type === EDIT_PERMISSION_SETTING) {
    // let newPermissions = state.permissionSetting.filter((element) =>
    //   _.includes(action.payload, element)
    // );
    let oldPermissions = _.differenceBy(state.permissionSetting, action.payload, 'id');
    let newPermissions = oldPermissions.concat(action.payload);
     

    return Object.assign({}, state, {
      permissionSetting: newPermissions,
    });
  }
  if (action.type === GET_PERMISSION_SETTING) {
    return Object.assign({}, state, {
      permissionSetting: action.payload,
    });
  }
  if (action.type === GET_USER_PERMISSION) {
    return Object.assign({}, state, {
      userPermission: action.payload,
    });
  }
  return state;
}
