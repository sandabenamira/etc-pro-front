import React from "react";
import CardBox from "../../../../components/CardBox/index";
import { connect } from "react-redux";
import AddSchoolLicence from "./AddSchoolLicence";
import SchoolLicenceList from "./SchoolLicenceList";
import { UncontrolledAlert } from "reactstrap";
import {
  addSchoolLicence,
  getSchoolLicence,
} from "../../../../actions/SchoolLicenceAction";
import { getModules } from "../../../../actions/ModuleAction";
import IntlMessages from "../../../../util/IntlMessages";
import _ from "lodash";

class SchoolLicence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      start_date: new Date(),
      end_date: new Date(),
      establishementId: "",
      schoolYearId: "",
      situationLicence: "",
      licenceGroup: [
        {
          value: "Actif",
          label: "Active",
        },
        {
          value: "Expired",
          label: "Expiré",
        },
        {
          value: "Pending",
          label: "En cours",
        },
        {
          value: "Blocked",
          label: "Bloqué",
        },
      ],
      paymentMode: [
        {
          value: "Semestre",
          label: <IntlMessages id="mode_payment.establishment.semester" />,
        },
        {
          value: "Trimestre",
          label: <IntlMessages id="mode_payment.establishment.trimester" />,
        },
        {
          value: "Mensuel",
          label: <IntlMessages id="mode_payment.establishment.monthly" />,
        },
        {
          value: "Annuel",
          label: <IntlMessages id="mode_payment.establishment.annual" />,
        },
      ],
      licenceType: "",
      establishment: "",
      modules: [],
      studentsNumber: "",
      paymentMode: "",
      smsNumber: "",
      emptyFields: false,
      licenceExist: false,
      messageAlerte:""

    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleChangeAlerte = this.handleChangeAlerte.bind(this);
  }
  handleCancel() {
    this.setState({ isOpen: false });
  }
  openAddModal() {
    this.setState({ isOpen: true });
  }
  openAddModal() {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    if (
      _.isEmpty(this.state.establishementId) &&
      _.isEmpty(this.state.schoolYearId) &&
      _.isEmpty(this.state.licenceType) &&
      _.isEmpty(this.state.paymentMode)
    ) {
      this.setState({
        emptyFields: true,
        messageAlerte: "Veuillez remplir tous les champs obligatoires",
      });
      setTimeout(() => {
        this.setState({ emptyFields: false, messageAlerte: "" });
      }, 4000);
    } else {
      let checkDoubleLicence = this.props.schoolLicences.filter(
        (element) =>
          element.fk_id_establishment == this.state.establishementId &&
          element.fk_id_school_year == this.state.schoolYearId
      );
       if (checkDoubleLicence.length > 0) {
         this.setState({
          licenceExist: true,
          messageAlerte: "Il existe déja une licence pour cet etablissement",
        });
        setTimeout(() => {
          this.setState({ licenceExist: false, messageAlerte: "" });
        }, 4000);
      } else {
        let data = {
          fk_id_school_year: this.state.schoolYearId,
          fk_id_establishment: this.state.establishementId,
          situation: this.state.licenceType,
          number_students: this.state.studentsNumber,
          mode_payment: this.state.paymentMode,
          number_sms: this.state.smsNumber,
          modules: this.state.modules,
        };
          this.props.dispatch(
            addSchoolLicence(data, this.state.establishment, this.state.modules)
          );
         this.props.dispatch(getModules());

        this.openAddModal();
        this.setState({
          licenceType: "",
          schoolYearId: "",
          establishementId: "",
          studentsNumber: "",
          paymentMode: "",
          smsNumber: "",
          establishment: "",
          modules: [],
        });
      }
    }
  }
  handleChangeEstablishment = (name) => (event) => {
    let ListEstablishment = this.props.listEstablishments;
    this.setState({ [name]: event.target.value, ListEstablishment });
  };
  handleChangeSchoolYears = (name) => (event) => {
    let ListSchoolYear = this.props.schoolYearList;
    this.setState({ [name]: event.target.value, ListSchoolYear });
  };
  handleArchive(event) {
    event.preventDefault();
    this.openAddModal();
    this.setState({});
  }

  handleChange = (name) => (event) => {
    const item = event.target.value;
    if (name === "establishementId") {
      this.setState({ establishementId: item.id, establishment: item });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  handleChangeAlerte = (name)  => {
    this.setState({
      licenceExist: true,
      messageAlerte: "Il existe déja une licence pour cet etablissement",
    });
    setTimeout(() => {
      this.setState({ licenceExist: false, messageAlerte: "" });
    }, 4000);
  };

  UNSAFE_componentWillMount() {
    this.props.dispatch(
      getSchoolLicence(this.props.userProfile.school_year_id)
    );
    this.props.dispatch(getModules());
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.props.dispatch(
        getSchoolLicence(this.props.userProfile.school_year_id)
      );
      this.props.dispatch(getModules());
    }
  }

  handleChangeModule = (event) => {
    this.setState({ modules: event.target.value });
  };
  render() {
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: "5%",
          marginRight: "10%",
        }}
      >
        <div className="  d-flex flex-column mb-3">
          {this.props.successStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          {this.state.licenceExist || this.state.emptyFields == true ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {" "}
                {this.state.messageAlerte}{" "}
              </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <AddSchoolLicence
                values={this.state}
                openAddModal={this.openAddModal}
                handleCancel={this.handleCancel}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleArchive={this.handleArchive}
                handleChangeEstablishment={this.handleChangeEstablishment}
                handleChangeSchoolYears={this.handleChangeSchoolYears}
                handleChangeModule={this.handleChangeModule}
                moduleList={this.props.modules}
              />
            </CardBox>
          </div>
          <div className=" bd-highlight" style={{ width: "90%" }}>
            <CardBox styleName="col-lg-12">
              <SchoolLicenceList
                handleChangeEstablishment={this.handleChangeEstablishment}
                handleChangeSchoolYears={this.handleChangeSchoolYears}
                schoolLicences={this.props.schoolLicences}
                listEstablishments={this.props.establishmentsList}
                schoolYearList={this.props.schoolYearList}
                handleAnnule={this.handleAnnule}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleToggle={this.handleToggle}
                handleChangeAlerte={this.handleChangeAlerte}
              />
            </CardBox>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    schoolLicences: state.SchoolLicenceReducer.schoolLicences,
    establishmentsList: state.establishment.remoteEstablishments,

    schoolYearList: state.schoolYearEtab.remoteSchoolYearEtab,
    modules: state.module.remoteModules,
  };
};

export default connect(mapStateToProps)(SchoolLicence);
