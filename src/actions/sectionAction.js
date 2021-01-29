
import { getName } from './countriesAction';
import _ from 'lodash';
import { classService } from '../_services/class.service';


function getSectionName(sections, section_id) {
  let sectionName = sections.map(element => {
    if (element.id === section_id) { return element.name } else { return null }
  })
  let result = sectionName.filter(element => element)
  return _.first(result)
}

function getSectionFromLevel(sections, level_id) {
  let sectionList = [];
  if (level_id < 11) {
    sectionList = [];
  } else {
    sectionList = Array.from(sections).filter(element => element.level_id === level_id)
  }
  return sectionList
}

function getSections() {
  return dispatch => {
    let apiEndpoint = `/section_by_levels?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then((response) => {
        let sectionsList = [];
        response.data.forEach(element => {
          sectionsList.push({ "id": element.id, "name": getName(element), "level_id": element.level_id })
        });
        dispatch({ type: "DATA_LOADED_SECTIONS", payload: sectionsList });
      });

  };
}

export function getSectionsByLevelId(levelId) {
  return dispatch => {
    let apiEndpoint = `/section_by_levels?access_token=${localStorage.token}&filter[where][level_id]=${levelId}`;
    classService.get(apiEndpoint)
      .then((response) => {
        let sectionsList = [];
        response.data.forEach(element => {
          sectionsList.push({ "id": element.id, "name": getName(element), "level_id": element.level_id })
        });
        dispatch({ type: "DATA_LOADED_SECTIONS", payload: sectionsList });
      });

  };
}




export { getSectionName, getSections, getSectionFromLevel }