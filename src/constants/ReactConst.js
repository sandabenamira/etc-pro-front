import _ from "lodash";
import moment from "moment";


// Mettre premier lettre en majscule
export function toUpperCaseFirst(string) {
  if (!_.isEmpty(string)) {
    string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.substring(1);
  }
}

// Mettre premier lettre en minuscule
export function toLowerCaseFirst(string) {
  if (!_.isEmpty(string)) return string.toLowerCase();
}
// identique  entre deux champs
export function equalName(alimentA, alimentB) {
  return alimentA === alimentB;
}

//function aliments libelle
export function matchAfterUrl(string) {
  const regex = /aliments\/(.*)/;
  return string.match(regex)[1];
}

// Convertir temps en froamt : HH[h]MM 
export function convTime(time) {
  return moment(time).format("HH[h]MM");
}

// Differance entre deux temps
export function deltaTime(time1, time2) {
  let Delta = moment(time1).diff(moment(time2));
  return convTime(Delta);
}
