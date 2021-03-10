import _ from 'lodash';

function getSectionName(sections, section_id) {
  let sectionName = sections.map((element) => {
    if (element.id === section_id) {
      return element.name;
    } else {
      return null;
    }
  });
  let result = sectionName.filter((element) => element);
  return _.first(result);
}

function getSectionFromLevel(sections, level_id) {
  let sectionList = [];
  if (level_id < 11) {
    sectionList = [];
  } else {
    sectionList = Array.from(sections).filter((element) => element.level_id === level_id);
  }
  return sectionList;
}

export { getSectionName, getSectionFromLevel };
