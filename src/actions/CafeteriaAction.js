import { classService } from '../_services/class.service';
import {
  FETECHED_ALL_MENUS,
  ADD_MENU,
  EDIT_MENU,
  DELETE_MENU,
   SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from '../constants/ActionTypes';
import baseUrl from "../config/config";
import axios from "axios";
export const addMenu= (itemMENU) => {
  //1
  return (dispatch) => {
    let apiEndpoint = `/cafeteria?access_token=${localStorage.token}`;
    classService.post(apiEndpoint, itemMENU).then((response) => {
     
      if (response) {
        dispatch({ type: ADD_MENU, payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La création est effectuée avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
};

export const getMenus = () => {
  return (dispatch) => {
    let apiEndpoint = `/cafeteria?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const menuList = list.filter((element) => element.status);
        dispatch({ type: FETECHED_ALL_MENUS, payload: menuList });
      })
      .catch((err) => {});
  };
};

export const getMenusByEstablishmentId = (establishmentId) => {
  return (dispatch) => {
    let apiEndpoint =
      `/cafeteria?access_token=${localStorage.token}&filter[where][establishment_id]=` +
      establishmentId;
      classService
      .get(apiEndpoint)
      .then((response) => {
        const list = response.data;
        const menuList = list.filter((element) => element.status);

        dispatch({ type: FETECHED_ALL_MENUS, payload: menuList });
      })
      .catch((err) => {});
  };
};

export function deleteMenus(itemId) {
  return (dispatch) => {
    axios.patch(`${baseUrl.baseUrl}/cafeteria/` + itemId + `?access_token=${localStorage.token}`, {
      status: false,
    })
      .then(response => {
       
        dispatch({ type: DELETE_MENU, payload: response.data });
      })
      .catch(function (error) {
       });
  };
}

export function editMenu(data) {
  return (dispatch) => {
    let Data = {
      menu_date : data.menu_date,
      prix :data.prix,
      suite : data.suite,
      dessert : data.dessert,
      entree : data.entree,
      establishment_id:data.establishment_id,
      status:true,
      id:data.id,
    };
    let apiEndpoint =
      `/cafeteria/` + data.id + `?access_token=${localStorage.token}`;
      classService.put(apiEndpoint, Data).then((response) => {
      if (response) {
        dispatch({ type: EDIT_MENU, payload: response.data });
        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: 'La modification est effectuée avec succès',
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      } else {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la modification merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      }
    });
  };
}

export const MENUAction = {
    addMenu,
    getMenus,
  editMenu,
  deleteMenus,
  getMenusByEstablishmentId,
};
