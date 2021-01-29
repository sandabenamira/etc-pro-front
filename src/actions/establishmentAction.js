import _ from "lodash";
import { classService } from "../_services/class.service";
import axios from "axios";
import baseUrl from "../config/config";
import {
  SHOW_ERROR_MESSAGE,
  HIDE_ERROR_MESSAGE,
  HIDE_SUCCESS_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/ActionTypes";

export function getEstablishment() {
  return (dispatch) => {
    let apiEndpoint = `/establishments?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const ListEstablishments = response.data;
        const establishmentList = ListEstablishments.filter(
          (element) => element.status
        );
        dispatch({ type: "GET_ALL_ESTABLISHMENT", payload: establishmentList });
        //dispatch(addEstablishmentContainers(establishmentList));
      })
      .catch((error) => {});
  };
}
export function addEstablishmentContainers(listEstablishment) {
  return (dispatch) => {
    let apiEndpoint = `/containers?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        listEstablishment.map((establishment) => {
          if (_.some(response.data, ["name", establishment.name])) {
          } else {
            let container = { name: establishment.name };
            let formadata = new FormData();
            formadata.append("image", container);
            let apiEndpoint2 = `/containers?access_token=${localStorage.token}`;
            classService.post(apiEndpoint2, container);
          }
        });
      })
      .catch((error) => {});
  };
}

export function uploadFile2(payload, file) {
  return (dispatch) => {
    let formadata = new FormData();
    formadata.append("image", file);
    const apiEndpoint = `${baseUrl.baseUrl}/containers/classebook.data.storage/upload?access_token=${localStorage.token}`;

    axios({
      url: apiEndpoint,
      method: "POST",
      data: formadata,
    })
      .then((response) => {
        if (response) {
          axios
            .patch(
              `${baseUrl.baseUrl}/establishments/` +
                payload.id +
                `?access_token=${localStorage.token}`,
              {
                logo:
                  response.data.result.files.image[0].providerResponse.location,
              }
            )
            .then((response) => {
              dispatch({ type: "ADD_ESTABLISHMENT", payload: response.data });
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  };
}

export function saveEstablishment(payload, file) {
  return (dispatch) => {
    let establishmentData = {
      name: payload.name,
      ar_name: payload.ar_name,
      address: payload.address,
      code: payload.code,
      city: payload.city,
      countries_id: payload.countries_id,
      phone: payload.phone,
      email_establishment: payload.email_establishment,
      website: payload.website,
      surname_director: payload.surname_director,
      name_director: payload.name_director,
      email_director: payload.email_director,
      phone_director: payload.phone_director,
      estab_type_id: payload.estab_type_id,
      fk_id_school_year_current: payload.currentYearId,
      status: true,
      module_id: payload.module_id,
      logo: "",
      matricule: payload.matricule,
      tva: payload.tva,
      capital: payload.capital,
      siren: payload.siren,
      siret: payload.siret,
      rib: payload.rib,
      iban: payload.iban,
    };

    let apiEndpoint = `/establishments?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, establishmentData)
      .then((response) => {
        if (file !== null) {
          const fileExtension = file.name.replace(/^.*\./, "");
          const fileName =
            response.data.id + response.data.name + "." + fileExtension;
          let dataWithFile = {
            name: payload.name,
            ar_name: payload.ar_name,
            address: payload.address,
            code: payload.code,
            city: payload.city,
            countries_id: payload.countries_id,
            phone: payload.phone,
            email_establishment: payload.email_establishment,
            website: payload.website,
            surname_director: payload.surname_director,
            name_director: payload.name_director,
            email_director: payload.email_director,
            phone_director: payload.phone_director,
            estab_type_id: payload.estab_type_id,
            fk_id_school_year_current: payload.currentYearId,
            status: true,
            module_id: payload.module_id,
            // logo: fileName,
            matricule: payload.matricule,
            tva: payload.tva,
            capital: payload.capital,
            siren: payload.siren,
            siret: payload.siret,
            rib: payload.rib,
            iban: payload.iban,
          };
          const myNewFile = new File([file], fileName, { type: file.type });
          dispatch(uploadFile2(response.data, myNewFile));
          // let apiEndpoint2 =
          //   `/establishments/` +
          //   response.data.id +
          //   `?access_token=${localStorage.token}`;
          // classService
          //   .put(apiEndpoint2, dataWithFile)
          //   .then((response) => {
          //     const myNewFile = new File([file], fileName, { type: file.type });
          //     dispatch(uploadFile2(response.data, myNewFile));
          //   })
          //   .catch((error) => {});
        } else {
          let dataWithoutFile = {
            name: payload.name,
            ar_name: payload.ar_name,
            address: payload.address,
            code: payload.code,
            city: payload.city,
            countries_id: payload.countries_id,
            phone: payload.phone,
            email_establishment: payload.email_establishment,
            website: payload.website,
            surname_director: payload.surname_director,
            name_director: payload.name_director,
            email_director: payload.email_director,
            phone_director: payload.phone_director,
            estab_type_id: payload.estab_type_id,
            fk_id_school_year_current: payload.currentYearId,
            status: true,
            module_id: payload.module_id,
            logo: null,
            matricule: payload.matricule,
            tva: payload.tva,
            capital: payload.capital,
            siren: payload.siren,
            siret: payload.siret,
            rib:payload.rib,
          iban:payload.iban,
          };
          let apiEndpoint3 =
            `/establishments/` +
            response.data.id +
            `?access_token=${localStorage.token}`;
          classService.put(apiEndpoint3, dataWithoutFile).then((response) => {
            if (response) {
              dispatch({ type: "ADD_ESTABLISHMENT", payload: response.data });
              dispatch({
                type: SHOW_SUCCESS_MESSAGE,
                payload: "La création est effectuée avec succès",
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
        }
      })
      .catch((error) => {});
  };
}

export function saveEstablishments(establishment, file) {
  let container = { name: establishment.name };
  let formadata = new FormData();
  formadata.append("image", container);
  return (dispatch) => {
    dispatch(saveEstablishment(establishment, file));
    // let apiEndpoint = `/containers?access_token=${localStorage.token}`;
    // classService
    //   .post(apiEndpoint, container)
    //   .then(response => {
    //     dispatch(saveEstablishment(establishment, file));
    //   })
    //   .catch(error => {
    //   });
  };
}
export function deleteData(idItem) {
  return (dispatch) => {
    let apiEndpoint =
      `/establishments/` + idItem + `?access_token=${localStorage.token}`;
    classService
      .get(apiEndpoint)
      .then((response) => {
        const dataEstablishment = response.data;
        let establishmentData = {
          name: dataEstablishment.name,
          ar_name: dataEstablishment.ar_name,
          address: dataEstablishment.address,
          code: dataEstablishment.code,
          city: dataEstablishment.city,
          countries_id: dataEstablishment.countries_id,
          phone: dataEstablishment.phone,
          email_establishment: dataEstablishment.email_establishment,
          website: dataEstablishment.website,
          surname_director: dataEstablishment.surname_director,
          name_director: dataEstablishment.name_director,
          email_director: dataEstablishment.email_director,
          phone_director: dataEstablishment.phone_director,
          estab_type_id: dataEstablishment.estab_type_id,
          number_students: dataEstablishment.number_students,
          contract_start_date: dataEstablishment.contract_start_date,
          contract_end_date: dataEstablishment.contract_end_date,
          number_sms: dataEstablishment.number_sms,
          mode_payment: dataEstablishment.mode_payment,
          status: false,
          module_id: dataEstablishment.module_id,
          id: dataEstablishment.id,
          matricule: dataEstablishment.matricule,
          tva: dataEstablishment.tva,
          capital: dataEstablishment.capital,
          siren: dataEstablishment.siren,
          siret: dataEstablishment.siret,
          rib: dataEstablishment.rib,
          iban: dataEstablishment.iban,
        };
         let apiEndpoint2 =
          `/establishments/` +
          dataEstablishment.id +
          `?access_token=${localStorage.token}`;
        classService
          .put(apiEndpoint2, establishmentData)

          .then((response) => {
            dispatch({ type: "DELETE_ESTABLISHMENT", payload: response.data });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };
}

export function updateEstablishment(payload, file) {
  if (file !== null) {
    if (payload.logo !== null) {
      return (dispatch) => {
        let formadata = new FormData();
        formadata.append("image", file);
        let apiEndpoint =
          `/containers/` +
          payload.name +
          "/files/" +
          payload.logo +
          `?access_token=${localStorage.token}`;
        classService
          .delete(apiEndpoint, formadata)
          .then((response) => {
            dispatch(updateEstablishData(payload, file));
          })
          .catch((error) => {});
      };
    } else {
      return function(dispatch) {
        dispatch(updateEstablishData(payload, file));
      };
    }
  } else {
    return (dispatch) => {
      let data = {
        name: payload.name,
        ar_name: payload.ar_name,
        address: payload.address,
        code: payload.code,
        city: payload.city,
        countries_id: payload.countries_id,
        phone: payload.phone,
        email_establishment: payload.email_establishment,
        website: payload.website,
        surname_director: payload.surname_director,
        name_director: payload.name_director,
        email_director: payload.email_director,
        phone_director: payload.phone_director,
        estab_type_id: payload.estab_type_id,
        fk_id_school_year_current: payload.currentYearId,
        status: payload.status,
        module_id: payload.module_id,
        id: payload.id,
        logo: payload.logo,
        matricule: payload.matricule,
        tva: payload.tva,
        capital: payload.capital,
        siren: payload.siren,
        siret: payload.siret,
        rib: payload.rib,
        iban: payload.iban,
      };
      let apiEndpoint =
        `/establishments/` + payload.id + `?access_token=${localStorage.token}`;
      classService
        .put(apiEndpoint, data)
        .then((response) => {
          dispatch({ type: "EDIT_ESTABLISHMENT", payload: response.data });
          dispatch(deleteEstablishmentModules(payload.id));
        })
        .catch((error) => {});
    };
  }
}

export function updateEstablishData(payload, file) {
  return (dispatch) => {
    const fileExtension = file.name.replace(/^.*\./, "");
    const fileName = payload.id + payload.name + "." + fileExtension;
    const myNewFile = new File([file], fileName, { type: file.type });
    let newData = {
      name: payload.name,
      ar_name: payload.ar_name,
      address: payload.address,
      code: payload.code,
      city: payload.city,
      countries_id: payload.countries_id,
      phone: payload.phone,
      email_establishment: payload.email_establishment,
      website: payload.website,
      surname_director: payload.surname_director,
      name_director: payload.name_director,
      email_director: payload.email_director,
      phone_director: payload.phone_director,
      estab_type_id: payload.estab_type_id,
      fk_id_school_year_current: payload.currentYearId,
      status: payload.status,
      module_id: payload.module_id,
      id: payload.id,
      logo: fileName,
      matricule: payload.matricule,
      tva: payload.tva,
      capital: payload.capital,
      siren: payload.siren,
      siret: payload.siret,
      rib: payload.rib,
      iban: payload.iban,
    };
    let apiEndpoint =
      `/establishments/` + payload.id + `?access_token=${localStorage.token}`;
    classService
      .put(apiEndpoint, newData)
      .then((response) => {
        dispatch(uploadEditFile(response.data, myNewFile));
      })
      .catch((error) => {});
  };
}

export function uploadEditFile(payload, file) {
  return (dispatch) => {
    let formadata = new FormData();
    formadata.append("image", file);
    let apiEndpoint =
      `/containers/` +
      payload.name +
      `/upload?access_token=${localStorage.token}`;
    classService
      .post(apiEndpoint, formadata)
      .then((response) => {
        dispatch({ type: "EDIT_ESTABLISHMENT", payload: payload });
        alert("L'ajout est effectué avec succès");
      })
      .catch((error) => {});
  };
}

export function deleteEstablishmentModules(id) {
  return (dispatch) => {
    axios
      .get(
        `${baseUrl.baseUrl}/establishments/getModuleEstab/` +
          id +
          `?access_token=${localStorage.token}`
      )
      .then((response) => {})
      .catch((error) => {});
  };
}
