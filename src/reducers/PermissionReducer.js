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
  
  if (action.type === EDIT_PERMISSION_SETTING) {
 
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
