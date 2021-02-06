import React, { useState, useEffect } from 'react';
import { getNameFromID } from '../../../../../actions/countriesAction';
import { getEstabTypeByID } from '../../../../../actions/estabTypeAction';
import IntlMessages from '../../../../../util/IntlMessages';
import _ from 'lodash';
import imageSchool from "../image/school.jpeg"
//TODO ajouter countries to edit Modal .
//TODO Ajouter type_établissement a l'affichage de liste ?

function EstablishmentItemCard(
  { data, editEstablishment,
    moduleList, countries, estabTypes }) {
  const { id, name, contract_start_date,
    phone, website, number_students, number_sms, mode_payment,
    name_director, surname_director, module_id, countries_id, estab_type_id } = data;
  ;
  const [uri, setUri] = useState("");
  useEffect(() => {
    // if (name) {
    //   let apiEndpoint = `/containers/checkFileExist/${name}?access_token=${localStorage.token}`;
    //   classService.get(apiEndpoint)
    //     .then((response) => {
    //       let itemList = _.isEmpty(response.data.checkFile) ? null :
    //         response.data.checkFile.find(item => item.name === data.logo);
    //       _.isEmpty(itemList) ? setUri(null) : setUri(`${baseUrl.baseUrl}/containers/` + name + '/download/' + data.logo + `?access_token=${localStorage.token}`);
    //     }).catch(error => { });
    // }
  }, []);



  return (
    <div className="media jr-featured-item">
      <div className="jr-featured-thumb">
        {
          data.logo ? (
            <img src={data.logo} alt="example" onError={(e) => {
              e.target.src = { imageSchool }
              e.target.style = 'padding: 8px; margin: 16px'
            }} />
          ) : (<img src={imageSchool} alt="" />
            )
        }

        <span className="jr-tag">{getEstabTypeByID(estabTypes, estab_type_id)}</span>
      </div>
      <div className="media-body jr-featured-content">
        <div className="jr-featured-content-left">
          {moduleList.map(element => {
            let moduleArray = Array.from(module_id)
            return moduleArray.includes(element.id) ? <span key={element.id} className="jr-tag text-uppercase bg-info d-inline-block" color="#06BB8A">{element.name}</span>
              : "";
          })}
          <h3 className="mb-1">{name}</h3>

          <p className="text-grey mb-1">{getNameFromID(countries, countries_id)}</p>
          <div className="d-flex flex-row">
            <p className="text-grey mb-1">
              <i className={`zmdi zmdi-account jr-fs-lg mr-2 d-inline-block align-middle`} />{"Directeur: " + name_director + " " + surname_director}
            </p>
          </div>
        </div>
        <div className="jr-featured-content-right">
          <div>
            <h2><a className="mb-0 jr-font-weight-medium" href={`http://${website}`}>{website}</a></h2>
            <p className="text-grey jr-fs-sm">Tél :{phone}</p>
          </div>
          <p onClick={() => (editEstablishment(id))} className="text-primary mt-auto mb-0 pointer"><span >{<IntlMessages id="dashboard.viewPlus" />}</span>
            <i
              className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle`} /></p>
        </div>

      </div>
    </div>
  );
}

export default EstablishmentItemCard;
