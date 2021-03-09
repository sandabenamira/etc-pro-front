import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../util/IntlMessages';
import EditSchoolLicence from './EditSchoolLicence';
import SchoolLicenceListItem from './SchoolLicenceListItem';
import { connect } from 'react-redux';
import { editSchoolLicence } from '../../../../actions/SchoolLicenceAction';
import { deleteSchoolLicence } from '../../../../actions/SchoolLicenceAction';

class SchoolLicenceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      situationLicence: '',
      start_date: '',
      end_date: '',
      id: null,
      fk_id_school_year: '',
      fk_id_establishment: '',
      licenceGroup: [
        {
          value: 'Actif',
          label: 'Active',
        },
        {
          value: 'Expired',
          label: 'Expiré',
        },
        {
          value: 'Pending',
          label: 'En cours',
        },
        {
          value: 'Blocked',
          label: 'Bloqué',
        },
      ],
      paymentModeList: [
        {
          value: 'Semestre',
          label: <IntlMessages id="mode_payment.establishment.semester" />,
        },
        {
          value: 'Trimestre',
          label: <IntlMessages id="mode_payment.establishment.trimester" />,
        },
        {
          value: 'Mensuel',
          label: <IntlMessages id="mode_payment.establishment.monthly" />,
        },
        {
          value: 'Annuel',
          label: <IntlMessages id="mode_payment.establishment.annual" />,
        },
      ],
      paymentMode: '',
      licenceType: '',
      establishment: {},
      studentsNumber: 0,
      smsNumber: 0,
      modules: [],
      fk_licence_id: 0,
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteSchoolLicence = this.handleDeleteSchoolLicence.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeModule = this.handleChangeModule.bind(this);
  }

  handleChangeModule = (event) => {
    this.setState({ modules: event.target.value });
  };

  handleChangeStartDate = (date) => {
    this.setState({ start_date: date });
  };
  handleChangeEndDate = (date) => {
    this.setState({ end_date: date });
  };

  handleDeleteSchoolLicence = (event) => {
    event.preventDefault();
    this.props.deleteSchoolLicence(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };

  handleCancel() {
    this.setState({ isOpen: false, deleteIsopen: false });
  }
  handleEdit = (item, event) => {
    event.preventDefault();
    var establishmentModules = item.licenceModule.map((element) => {
      return element.fk_id_module;
    });
    this.setState({
      isOpen: true,
      item: item,
      licenceType: item.situation,
      id: item.id,
      start_date: item.start_date,
      end_date: item.end_date,
      fk_id_school_year: item.fk_id_school_year,
      fk_id_establishment: item.fk_id_establishment,
      establishment: item.establishment,
      studentsNumber: item.number_students,
      smsNumber: item.number_sms,
      paymentMode: item.mode_payment,
      modules: establishmentModules,
      fk_licence_id: item.licenceModule[0].fk_id_licence,
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  handleAnnule() {
    this.handleCancel();
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleToggle() {
    this.handleCancel();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let checkDoubleLicence = this.props.schoolLicences.filter(
      (element) =>
        element.fk_id_establishment===this.state.fk_id_establishment &&
        element.fk_id_school_year===this.state.fk_id_school_year &&
        element.id != this.state.id
    );

    if (checkDoubleLicence.length > 0) {
      this.props.handleChangeAlerte();
    } else {
      const data = {
        situation: this.state.licenceType,
        id: this.state.id,
        fk_id_establishment: this.state.fk_id_establishment,
        fk_id_school_year: this.state.fk_id_school_year,
        number_students: this.state.studentsNumber,
        mode_payment: this.state.paymentMode,
        number_sms: this.state.smsNumber,
        modules: this.state.modules,
      };
      const establishment = this.state.establishment;
      this.props.editSchoolLicence(data);
    }

    this.handleCancel();
  };

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.school.licence" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {' '}
                <IntlMessages id="list.schools" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.class.formadd.module" />
              </TableCell>
              <TableCell>
                <IntlMessages id="sidebar.components.schoolYears" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.class.formadd.situation" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.establishments.formadd.mode_payment" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.establishments.formadd.number_sms" />
              </TableCell>
              <TableCell>
                <IntlMessages id="components.establishments.formadd.number_students" />
              </TableCell>
              <TableCell>
                <IntlMessages id="action.type.of.education" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.schoolLicences.map((schoolLicence) => {
              return (
                <SchoolLicenceListItem
                  listEstablishments={this.props.listEstablishments}
                  schoolLicence={schoolLicence}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}
                  schoolYearList={this.props.schoolYearList}
                />
              );
            })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditSchoolLicence
            schoolLicence={this.state.item}
            closeModal={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            handleChangeModule={this.handleChangeModule}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  editSchoolLicence,
  deleteSchoolLicence,
})(SchoolLicenceList);
