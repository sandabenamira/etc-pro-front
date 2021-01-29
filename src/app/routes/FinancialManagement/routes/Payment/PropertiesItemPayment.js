import React, { useState, useEffect } from "react";
import moment from 'moment';
import IntlMessages from '../../../../../util/IntlMessages';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import { Badge } from 'reactstrap';
import baseUrl from '../../../../../config/config';
import { classService } from "../../../../../_services/class.service";
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';
import { traductionValue } from '../../../../../actions/countriesAction';

function jsUpperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function PropertiesItemPayment({ data, editPayment, establishment }) {
  const { student_service, service, linesPayments } = data;

  const [uri, setUri] = useState("");
  useEffect(() => {

    if (establishment) {
      let apiEndpoint = `/containers/checkFileExist/${establishment}?access_token=${localStorage.token}`
      classService.get(apiEndpoint)
        .then((response) => {
          let itemList = _.isEmpty(response.data.checkFile) ? null :
            response.data.checkFile.find(item => item.name === student_service.student.profile.user.photo);
          _.isEmpty(itemList) ? setUri(null) : setUri(`${baseUrl.baseUrl}/containers/` + establishment + '/download/' + student_service.student.profile.user.photo + `?access_token=${localStorage.token}`);
        }).catch(error => {  });
    }
  }, []);

  return (
    <RoleContext.Consumer>
      {({ role }) => (
        <div className="media jr-featured-item" >
          {uri ? (<Avatar className="user-avatar avatar-shadow" src={uri} alt="example" onError={(e) => { e.target.src = 'https://image.freepik.com/free-vector/happy-student-jumping-with-flat-design_23-2147913289.jpg' }} />) :
            (<Avatar className="user-avatar avatar-shadow" src={require('../../../../../assets/images/eleve.png')} alt="..." />)}
          <div className="media-body jr-featured-content" >
            <div className="jr-featured-content-left">
              <h3 className="mb-1"> {data.name.toUpperCase()} {jsUpperCaseFirst(data.surname)}</h3>
              <div className="d-flex flex-wrap mb-2">

                <p className="mr-3 mb-1"><span className="text-grey">{<IntlMessages id="service.name" />}:  </span><Badge color="success" pill> {service.name}</Badge></p>
                <p className="mr-3 mb-1"><span className="text-grey">{<IntlMessages id="service.price" />}:</span> {linesPayments[0].price} {service.currency}</p>

                {linesPayments[0].payment_id !== null ?
                  <p className="mr-3 mb-1"><span className="text-grey">{<IntlMessages id="methode.of.payment" />}:</span> {traductionValue(linesPayments[0].payment.payment_methode)}
                    &nbsp;&nbsp; <span className="text-grey">{<IntlMessages id="payment.user" />}:</span> {linesPayments[0].payment.profile.user.name} {linesPayments[0].payment.profile.user.surname}</p> : ''}

              </div>

            </div>
            <div className="jr-featured-content-right">
              <div>
                <h2 className="mb-0 jr-font-weight-medium text-primary" >{linesPayments[0].payment_status}</h2>
                <p className="text-grey jr-fs-sm"><i className={`zmdi zmdi-calendar-alt jr-fs-lg mr-2 d-inline-block align-middle`} />{<IntlMessages id="expected.dateOfPayment" />}: <Badge color="danger" pill>{moment(linesPayments[0].expected_day).format(" Do MMM YY")}</Badge></p>
              </div>

              <Can
                role={role}
                perform="itemPayment-filter-action-payment:visit"
                yes={() => (
                  <div>
                    {linesPayments[0].payment_status === "Non payé" ? <p onClick={() => editPayment(data)} className="text-info mt-auto mb-0 pointer" >
                      <i className="zmdi zmdi-mail-reply zmdi-hc-fw zmdi-hc-flip-horizontal" />
                      <span >{<IntlMessages id="button.proceedToThePayment" />}</span>
                    </p> : ''}
                  </div>
                )}
              />

            </div>
          </div>

        </div >

      )}
    </RoleContext.Consumer>
  )
}


export default PropertiesItemPayment;
