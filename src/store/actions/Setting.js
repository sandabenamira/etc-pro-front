import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  DRAWER_TYPE,
  HORIZONTAL_MENU_POSITION,
  SWITCH_LANGUAGE,
  THEME_COLOR,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH,
  FETCH_ALL_COUNTRY,
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  INIT_OPTIONS,
  SWITCH_APP_LANGUAGE,
} from "../../constants/ActionTypes"; /* eslint eqeqeq: "off" */

import baseUrl from "../../config/config";
import axios from "axios";
import languageData from "../../components/LanguageSwitcher/data";
import IntlMessages from "../../util/IntlMessages";
import React from "react";

export function toggleCollapsedNav(isNavCollapsed) {
  return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}

export function setDrawerType(drawerType) {
  return { type: DRAWER_TYPE, drawerType };
}

export function updateWindowWidth(width) {
  return { type: WINDOW_WIDTH, width };
}

export function getThemeColor(color) {
  return { type: THEME_COLOR, color };
}

export function setThemeColor(color) {
  return (dispatch, getState) => {
    const state = getState();
    let settingId = state.auth.userProfile.setting_id;
    let data = {
      theme_color: color,
      id: settingId,
    };
    axios
      .patch(
        `${baseUrl.baseUrl}/settings/` +
          settingId +
          `?access_token=${localStorage.token}`,
        data
      )
      .then((response) => {
        dispatch({ type: THEME_COLOR, payload: color });
      });
  };
}

export function setDarkTheme() {
  return { type: DARK_THEME };
}

export function changeDirection() {
  return { type: CHANGE_DIRECTION };
}

export function changeNavigationStyle(layoutType) {
  return {
    type: CHANGE_NAVIGATION_STYLE,
    payload: layoutType,
  };
}

export function setHorizontalMenuPosition(navigationPosition) {
  return {
    type: HORIZONTAL_MENU_POSITION,
    payload: navigationPosition,
  };
}
export function switchLanguage(language) {
  return (dispatch, getState) => {
    const state = getState();
    let settingId = state.auth.userProfile.setting_id;
    let data = {
      app_lang: language.languageId,
      id: settingId,
    };
    let newDataUserProfile = {
      ...state.auth.userProfile,
      setting: {
        ...state.auth.userProfile.setting,
        app_lang: language.languageId,
      },
    };

    dispatch({ type: SWITCH_APP_LANGUAGE, payload: newDataUserProfile });
    axios
      .patch(
        `${baseUrl.baseUrl}/settings/` +
          settingId +
          `?access_token=${localStorage.token}`,
        data
      )
      .then((response) => {
        dispatch({ type: SWITCH_LANGUAGE, payload: language });
      });
  };
}

export function getAppLanguage(app_lang) {
  if (app_lang) {
    let dataLanguage = languageData.filter(
      (element) => element.languageId === app_lang
    );
    let obj = dataLanguage[0];
    let data = {
      languageId: obj.languageId,
      locale: obj.locale,
      name: obj.languageId,
      icon: obj.icon,
    };
    return (dispatch) => {
      dispatch({ type: SWITCH_LANGUAGE, payload: data });
    };
  }
}

export function getNameLanguage(appLang) {
  switch (appLang) {
    case "french":
      return <IntlMessages id="languageData.french" />;
    case "english":
      return <IntlMessages id="languageData.english" />;
    case "tunisia":
      return <IntlMessages id="languageData.arabic" />;
    default:
      return <IntlMessages id="languageData.french" />;
  }
}

export function initOptions(data) {
  return (dispatch) => {
    dispatch({ type: INIT_OPTIONS, payload: data });
  };
}

export function alertSuccess() {
  return (dispatch) => {
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: <IntlMessages id="alert.success.init.data" />,
    });
    setTimeout(() => {
      dispatch({ type: HIDE_SUCCESS_MESSAGE });
    }, 4000);
  };
}

export function alertfailed() {
  return (dispatch) => {
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: <IntlMessages id="alert.failed.init.data" />,
    });
    setTimeout(() => {
      dispatch({ type: HIDE_ERROR_MESSAGE });
    }, 4000);
  };
}

export function getAllCountry() {
  return function (dispatch) {
    axios
      .get(`${baseUrl.baseUrl}/countries/?access_token=${localStorage.token}`)
      .then((res) => {
        dispatch({ type: FETCH_ALL_COUNTRY, payload: res.data.locale });
      });
  };
}

export function addOptions(data) {
  return (dispatch) => {
    axios
      .post(
        `${baseUrl.baseUrl}/settings/initLanguageAndTimeCalendar?access_token=${localStorage.token}`,
        data,
        { headers: { "content-type": "application/json" } }
      )
      .then((response) => {
        let dataRes = response.data.settingData;
        let dataOption = {
          startTime: dataRes.start_time_calendar,
          endTime: dataRes.end_time_calendar,
          appLang: dataRes.app_lang,
          conferenceTool: dataRes.conference_tool,
        };
        dispatch(getAppLanguage(data.app_lang));
        dispatch(initOptions(dataOption));

        dispatch({
          type: SHOW_SUCCESS_MESSAGE,
          payload: "La création est effectuée avec succès",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_SUCCESS_MESSAGE });
        }, 4000);
      })
      .catch((error) => {
        dispatch({
          type: SHOW_ERROR_MESSAGE,
          payload:
            "Une erreur est survenue lors de la création merci d'essayer à nouveau",
        });
        setTimeout(() => {
          dispatch({ type: HIDE_ERROR_MESSAGE });
        }, 4000);
      });
  };
}
