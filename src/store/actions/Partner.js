import {
  ADD_PARTNER,
  SET_PARTNER,
  HIDE_ERROR_ALERTE_PARTNER,
  SHOW_ALERTE_PARTNER,EDIT_PARTNER_E,
  EDIT_PARTNER,
 } from "../../constants/ActionTypes";

export function addPARTNER(data) {
  return (dispatch) => {
    dispatch({ type: ADD_PARTNER, payload: data });

    dispatch({
      type: SHOW_ALERTE_PARTNER,
      payload: "L'ajout est effectuée avec succès",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_ALERTE_PARTNER });
    }, 2000);
  };
}

export const editPARTNER = (data) => {
  console.log(data, "----------editPARTNER");
  return (dispatch) => {
    dispatch({
      type: EDIT_PARTNER,
      payload: data,
    });
    console.log(data)
    dispatch({
      type: SHOW_ALERTE_PARTNER,
      payload: "La modification  est effectuée avec succès",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_ALERTE_PARTNER });
    }, 3000);
  };
};

export const editPARTNER2 = (data) => {
  console.log(data)
   return (dispatch) => {
    dispatch({
      type: EDIT_PARTNER_E,
      payload: data,
    });
    console.log(data)
    dispatch({
      type: SHOW_ALERTE_PARTNER,
      payload: "La modification  est effectuée avec succès",
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_ALERTE_PARTNER });
    }, 3000);
  };
};
export const setCurrentPARTNER = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_PARTNER, payload: data });
  };
};
