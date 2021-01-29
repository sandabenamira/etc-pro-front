
import { classService } from "../_services/class.service";
import _ from 'lodash';
import { roleIdProfessor, roleIdSuperAdmin, roleIdStudent, roleIdParent, roleIdAdmin, roleIdSupervisor, roleIdDirector } from '../config/config';

let appLang = 'fr';
function getLanguage(language) {
    (_.isEmpty(language)) ? appLang = 'fr' : appLang = language;
    return appLang;
}

function getName(element) {
    switch (appLang) {
        case 'fr':
            return element.name_FR
        case 'en':
            return element.name_EN
        case 'ar':
            return element.name_AR
        default:
            return element.name_FR;
    }
}

function getNameFromID(countries, id) {
    let countryName = countries.map(element => {
        if (element.id === id) { return element.name }
        else { return null }
    })
    return countryName
}

function getCountries() {

    return dispatch => {
        let apiEndpoint = `/countries?access_token=${localStorage.token}`;
        classService
            .get(apiEndpoint)
            .then(response => {
                let countriesList = [];
                response.data.forEach(element => {
                    countriesList.push({ "id": element.id, "name": getName(element) })
                });
                dispatch({ type: "DATA_LOADED_COUNTRIES", payload: countriesList });
            }).catch(error => {
            });
    }
}

export function getCountriesByEstablishmentId(id) {
    return dispatch => {
        let apiEndpoint = `/establishments?access_token=${localStorage.token}&filter[include]=country&filter[where][id]=${id}`;
        classService
            .get(apiEndpoint)
            .then(response => {
                if (response) {
                    dispatch({ type: "DATA_LOADED_COUNTRIES", payload: _.map(response.data,'country') });
                }
            })
    }
}

function traductionValue(element) {
    if (element === 'Espèce') {
        switch (appLang) {
            case 'fr':
                return 'Espèce'
            case 'en':
                return 'Cash'
            case 'ar':
                return 'نقدا'
            default:
                return 'Espèce';
        }
    } else if (element === 'Non défini') {
        switch (appLang) {
            case 'fr':
                return 'Non défini'
            case 'en':
                return 'Not defined'
            case 'ar':
                return 'غير محدد'
            default:
                return 'Non défini';
        }

    } else if (element === 'Chèque') {
        switch (appLang) {
            case 'fr':
                return 'Chèque'
            case 'en':
                return 'Cheque'
            case 'ar':
                return 'شيك'
            default:
                return 'Chèque';
        }

    } else {
        switch (appLang) {
            case 'fr':
                return 'Carte bancaire'
            case 'en':
                return 'Credit card'
            case 'ar':
                return ' بطاقة الائتمان'
            default:
                return 'Carte bancaire';
        }
    }


}

function getNameRole(idRole, appLang) {

    if (appLang === 'tunisia') {
        switch (idRole) {
            case roleIdSuperAdmin:
                return 'مدير عام'
            case roleIdAdmin:
                return 'المسؤول'
            case roleIdProfessor:
                return 'أستاذ'
            case roleIdParent:
                return 'الولي'
            case roleIdStudent:
                return 'طالب'
            case roleIdSupervisor:
                return '  مشرف '
            default:
                return 'مدير';
        }
    } else if (appLang === 'english') {

        switch (idRole) {
            case roleIdSuperAdmin:
                return 'Super Admin'
            case roleIdAdmin:
                return 'Administrator'
            case roleIdProfessor:
                return 'Professor '
            case roleIdParent:
                return 'Parent'
            case roleIdStudent:
                return 'Student '
            case roleIdSupervisor:
                return 'Supervisor'
            default:
                return 'Director';
        }
    } else {
        switch (idRole) {
            case roleIdSuperAdmin:
                return 'Super Admin'
            case roleIdAdmin:
                return 'Administrateur'
            case roleIdProfessor:
                return 'Professeur'
            case roleIdParent:
                return 'Parent'
            case roleIdStudent:
                return 'Élève'
            case roleIdSupervisor:
                return 'Superviseur '
            default:
                return 'Directeur';
        }
    }

}


export { getLanguage, appLang, getNameFromID, getName, getCountries, traductionValue, getNameRole }