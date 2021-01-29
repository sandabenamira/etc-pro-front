import { getName } from './countriesAction';
import _ from 'lodash';
import { classService } from '../_services/class.service';
import {
  DATA_LOADED_LEVELS
  
} from '../constants/ActionTypes';
function getLevelName(levels, id) {
  let levelName = levels.map(element => {
    if (element.id === id) { return element.name } else { return null }
  })
  let result = levelName.filter(element => element)
  return _.first(result)
}

function getLevelListFromEstabType(levels, idType) {
  let levelList = [];
  if (idType === 0) {
    levelList = [];
  } else {
    levelList = levels.filter(element => element.estab_type_id === idType)
  }
  return levelList
}

function getLevels() {
  return dispatch => {
    let apiEndpoint = `/levels?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then((response) => {
        let levelsList = [];
        response.data.forEach(element => {
          levelsList.push({ "id": element.id, "name": getName(element), "estab_type_id": element.estab_type_id })
        });
        dispatch({ type: "DATA_LOADED_LEVELS", payload: levelsList });
      }).catch((err) => {
      })

  }
}

function getLevelsVirtualClass() {
  return dispatch => {
    let apiEndpoint = `/levels?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then((response) => {
        let levelsList = [];
        response.data.forEach(element => {
          levelsList.push({ "id": element.id, "name_AR": element.name_AR, "name_FR": element.name_FR, "name_EN": element.name_EN, "estab_type_id": element.estab_type_id })
        });
        dispatch({ type: "DATA_LOADED_LEVELS", payload: levelsList });
      }).catch((err) => {
      })

  }
}

export function getLevelByEstablishmentId(id) {
  let apiEndpoint = '';
  return dispatch => {
    apiEndpoint = `/establishments/${id}?access_token=${localStorage.token}`
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        const establishmentType = response.data.estab_type_id;
        // apiEndpoint = `/levels?access_token=${localStorage.token}&filter[where][estab_type_id]=${establishmentType}`;
        // classService.get(apiEndpoint).then((response) => {
        //   let levelsList = [];
        //   response.data.forEach(element => {
        //     levelsList.push({ "id": element.id, "name": getName(element), "estab_type_id": element.estab_type_id, "name_AR":element.name_AR, "name_FR": element.name_FR, "name_EN":element.name_EN })
        //   });
        //   dispatch({ type: "DATA_LOADED_LEVELS", payload: levelsList });
        // })
      }
    })

  }

}

export function getlevelsForProf(id) {
  return (dispatch, getState) => {
    const state = getState();
    const levels= state.ClassLevels.remoteLevels;
  let apiEndpoint = `/professors?access_token=${localStorage.token}&filter[where][profile_id]=${id}&filter[include][profSubjects][subject]`
  classService.get(apiEndpoint)
      .then(res => {
          if (res) {
            let levelsAffectedToProf = []
              let levelsId = _.uniqBy(_.map(_.head(res.data).profSubjects, 'level_id'))
              _.forEach(levelsId, function (value) {
                  levelsAffectedToProf.push({ 'id': value })
              });
              let levelsList = _.intersectionBy(levels, levelsAffectedToProf, 'id');
              dispatch({ type: "DATA_LOADED_LEVELS", payload: levelsList });              
             
          }
      });
  }
}

export function getLevelsAndSubjectsForProf(id) {
  return (dispatch, getState) => {
    const state = getState();
    const levels= state.ClassLevels.remoteLevels;
  let apiEndpoint = `/professors?access_token=${localStorage.token}&filter[where][profile_id]=${id}&filter[include][profSubjects][subject]`
  classService.get(apiEndpoint)
      .then(res => {
          if (res) {
            let levelsAffectedToProf = []
              let levelsId = _.uniqBy(_.map(_.head(res.data).profSubjects, 'level_id'))
              _.forEach(levelsId, function (value) {
                  levelsAffectedToProf.push({ 'id': value })
              });
              let levelsList = _.intersectionBy(levels, levelsAffectedToProf, 'id');
              dispatch({ type: DATA_LOADED_LEVELS, payload: levelsList });    
              let subjectsFiltred = _.map(_.head(res.data).profSubjects, 'subject');
              dispatch({type: 'DATA_LOADED_SUBJECT_PROFESSOR',payload: subjectsFiltred});          
             
          }
      });
  }
}

export { getLevelName, getLevels, getLevelListFromEstabType, getLevelsVirtualClass }