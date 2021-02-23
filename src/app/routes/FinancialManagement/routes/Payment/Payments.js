import React from "react";
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from "react-redux";
import { getEstablishment } from "../../../../../actions/establishmentAction";
 import { getPaymentsForParent, getPaymentsForStudent } from "../../../../../actions/PaymentAction";
import PaymentFilter from './PaymentFilter';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import { roleIdSuperAdmin, roleIdAdmin, roleIdParent, roleIdStudent, roleIdDirector } from '../../../../../config/config';
import Fab from '@material-ui/core/Fab';
import Input from '@material-ui/icons/Input';
import axios from 'axios';
import baseUrl from '../../../../../config/config';
import moment from 'moment';
import Can from '../../../../../can';
import { RoleContext } from '../../../../../Context';


class PropertiesPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      csvData: []

    };
    this.exportCsv = this.exportCsv.bind(this);

  }

  componentWillMount() {

    axios
      .get(
        `${baseUrl.baseUrl}/lines_payments/fetchCsvData/${localStorage.establishment_id}?access_token=${localStorage.token}`
      ).then((response) => {
        this.setState({ csvData: response.data.csvData })
      })

    switch (parseInt(localStorage.roles_id)) {
      case roleIdSuperAdmin:
        this.props.dispatch(getEstablishment());
         break;

      case roleIdAdmin:
      case roleIdDirector:

         break;

      case roleIdParent:
        this.props.dispatch(getPaymentsForParent(localStorage.profileId))
        break;

      case roleIdStudent:
        this.props.dispatch(getPaymentsForStudent(localStorage.profileId))
        break;

      default:
        break;
    }
  }
  objectToCsv(data) {

    const csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '//"');
        return `"${escaped}"`
      })

      csvRows.push(values.join(','))
    }
    return csvRows.join('\n');

  }
  downLoad(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);



  }
  exportCsv() {
    const csvList = this.state.csvData;
    const csvListFormated = csvList.map(row => ({
      name: row.name,
      surname: row.surname,
      classeName: row.classeName,
      seviceName: row.seviceName,
      prixHT: row.prixHT,
      prixTTC: row.prixTTC,
      TVA: row.TVA,
      expected_day: moment(row.expected_day).format('L'),
      payment_status: row.payment_status

    }))
    const csvData = this.objectToCsv(csvListFormated);
    this.downLoad(csvData);
  }

  render() {
    return (

      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="payment.title" />} />

        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="payment-export-csv:visit"
              yes={() => (
                <div className="col-md-12 text-right ">
                  <Fab
                    size="small"
                    color="primary"
                    onClick={this.exportCsv}
                  >
                    <Input />
                  </Fab>
                </div>

              )}
            />
          )
          }
        </RoleContext.Consumer>

        &nbsp;&nbsp;&nbsp;
        <PaymentFilter establishments={this.props.establishments} classes={this.props.classes} />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    establishments: state.establishment.remoteEstablishments,
    classes: state.classes,

  }
}

export default connect(mapStateToProps)(PropertiesPayment);
