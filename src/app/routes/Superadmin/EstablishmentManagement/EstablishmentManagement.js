import React from "react";
import { connect } from "react-redux";
import ContainerHeader from "../../../../components/ContainerHeader/index";
import IntlMessages from "../../../../util/IntlMessages";
import EstablishmentsCard from "./newDisplay/EstablishmentsCard";
import AddEstablishment from "./AddEstablishment";
import ModalDeleteEstablishment from "./ModalDeleteEstablishment";
import { getEstablishment } from "../../../../actions/establishmentAction";
import { getCountries } from "../../../../actions/countriesAction";
import { getEstabTypes } from "../../../../actions/estabTypeAction";
import { getModules } from "../../../../actions/ModuleAction";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/icons/Input";
import EditEstablishment from "./EditEstablishment";
import { UncontrolledAlert } from "reactstrap";

function mapStateToProps(state) {
    return {
        establishments: state.establishment.remoteEstablishments,
        modules: state.module.remoteModules,
        countries: state.countries.remoteCountries,
        estabTypes: state.EstabTypes.remoteEstabTypes,
        successStatus: state.alert.success,
        errorStatus: state.alert.error,
        schoolYearList: state.schoolYearEtab.remoteSchoolYearEtab,
    };
}
const divAjoutStyle = { marginBottom: 20 };

class EstablishmentManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      modalDelete: false,
      itemId: 0,
      establishmentItem: [],
      addEstablishmentModal: false,
      filterListByType: [],
    };
    this.EditItemEstablishment = this.EditItemEstablishment.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.handleCancelModalDelete = this.handleCancelModalDelete.bind(this);
    this.RequestDeleteEstablishment = this.RequestDeleteEstablishment.bind(
      this
    );
    this.addEstablishment = this.addEstablishment.bind(this);
  }

  componentDidMount() {
    this.props.getEstablishment();
    this.props.getModules();
    this.props.getCountries();
    this.props.getEstabTypes();
  }

  handleCancelModal() {
    this.setState({ edit: false, addEstablishmentModal: false });
  }

  handleCancelModalDelete() {
    this.setState({ modalDelete: false, itemId: 0 });
  }

  EditItemEstablishment(id) {
    const establishmentItem = this.props.establishments.find(
      (element) => element.id === id
    );
    this.setState({ establishmentItem, edit: true }, function() {});
  }

  RequestDeleteEstablishment(id) {
    this.setState({ modalDelete: true, itemId: id });
  }
  addEstablishment() {
    this.setState({ addEstablishmentModal: true });
  }

  render() {
      console.log(this.props.modules)
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title={<IntlMessages id="pages.establishementPage" />}
        />
        <div className="col-md-12 text-right " style={divAjoutStyle}>
          <Fab
            size="small"
            color="primary"
            aria-label="Add"
            onClick={this.addEstablishment}
          >
            <AddIcon />
          </Fab>
          &nbsp;&nbsp;&nbsp;
          <Fab size="small" color="primary">
            <Input />
          </Fab>
        </div>
        {this.props.successStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {" "}
              {<IntlMessages id="notification.successMessage" />}{" "}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {" "}
              {<IntlMessages id="notification.error" />}{" "}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}

        {this.state.addEstablishmentModal ? (
          <AddEstablishment
            estabTypes={this.props.estabTypes}
            countries={this.props.countries}
            moduleList={this.props.modules}
            cancelModal={this.handleCancelModal}
            schoolYearList={this.props.schoolYearList}

          />
        ) : (
          ""
        )}

        <EstablishmentsCard
          estabTypes={this.props.estabTypes}
          countries={this.props.countries}
          listEstablishment={this.props.establishments}
          editEstablishment={this.EditItemEstablishment}
          moduleList={this.props.modules}
        />

        {this.state.edit ? (
          <EditEstablishment
            estabTypes={this.props.estabTypes}
            countries={this.props.countries}
            modal={this.state.edit}
            establishment={this.state.establishmentItem}
            cancelModal={this.handleCancelModal}
            RequestDeleteEstablishment={this.RequestDeleteEstablishment}
            moduleList={this.props.modules}
            schoolYearList={this.props.schoolYearList}

          />
        ) : (
          ""
        )}

        {this.state.modalDelete ? (
          <ModalDeleteEstablishment
            itemId={this.state.itemId}
            cancelModalDelete={this.handleCancelModalDelete}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getEstablishment, getModules, getCountries, getEstabTypes }
)(EstablishmentManagement);
