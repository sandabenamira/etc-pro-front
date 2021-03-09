import React, { Component } from "react";
import { AddCallRegisterSetting } from "./AddCallRegisterSetting";
import { getEducationType } from "../../../../../actions/estabTypeAction";
import { connect } from "react-redux";
import {
  addCallRegisterSetting,
  getObservationList,
  getEncouragementList,
  getSanctionList,
  getCallRegisterSetting,
  editCallRegisterSetting
} from "../../../../../actions/RegistreAction";
import { UncontrolledAlert } from "reactstrap";
import _ from "lodash";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "../../../../../util/IntlMessages";
/* eslint eqeqeq: "off" */
export class CallRegisterSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationTypes: [],
      educationTypesId: null,
      optionEducationType: [],
      isPresenceChecked: true,
      isRetardChecked: true,
      isEncouragementsChecked: false,
      isSanctionsChecked: true,
      isObservationsChecked: false,
      show: false,
      isOpen: false,
      educationTypesError: false,
      isTheFirstInit: true,
      idSetting:null
    };
    this.handleChangeEducationType = this.handleChangeEducationType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  onConfirm = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleCancel() {
    this.setState({
      educationTypesId: null,
      isPresenceChecked: true,
      isRetardChecked: true,
      isEncouragementsChecked: false,
      isSanctionsChecked: true,
      isObservationsChecked: false,
      optionEducationType: [],
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  handleChangeEducationType = (selectedOption) => {
    this.props.dispatch(getCallRegisterSetting(selectedOption.value));

    this.setState({
      optionEducationType: selectedOption,
      educationTypesId: selectedOption.value,
      educationTypesError: false,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.educationTypesId !== null) {
      let callRegisterSetting = {
        status: true,
        presence: this.state.isPresenceChecked,
        delay: this.state.isRetardChecked,
        encouragement: this.state.isEncouragementsChecked,
        sanction: this.state.isSanctionsChecked,
        observation: this.state.isObservationsChecked,
        fk_id_education_type: this.state.educationTypesId,
      };
      if (this.state.isTheFirstInit) {
        this.props.dispatch(addCallRegisterSetting(callRegisterSetting));
      } else {
        callRegisterSetting.id = this.state.idSetting;
        this.props.dispatch(editCallRegisterSetting(callRegisterSetting));
      }
    } else {
      this.setState({ educationTypesError: true });
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch(getEducationType(this.props.userProfile.establishment_id,
      this.props.userProfile.school_year_id,));
    this.props.dispatch(getObservationList());
    this.props.dispatch(getEncouragementList());
    this.props.dispatch(getSanctionList());
  }
  componentDidUpdate(prevProps) {
    if (prevProps.educationTypes !== this.props.educationTypes) {
      if (!_.isEmpty(this.props.educationTypes)) {
        if (this.props.educationTypes.length > 1) {
          let options = [];
          this.props.educationTypes.forEach((element, index) => {
            let option = {
              label: element.name,
              value: element.id,
              key: index,
            };
            options.push(option);
          });
          this.setState({ educationTypes: options, show: true });
        } else {
          this.setState({ educationTypesId: this.props.educationTypes[0].id });
          this.props.dispatch(
            getCallRegisterSetting(this.props.educationTypes[0].id)
          );
        }
      } else {
        this.setState({ isOpen: true });
      }
    }
    if (prevProps.settingCallRegister !== this.props.settingCallRegister) {
      if (!_.isEmpty(this.props.settingCallRegister)) {
        let settingData = this.props.settingCallRegister[0];
        this.setState({
          isPresenceChecked: settingData.presence,
          isRetardChecked: settingData.delay,
          isEncouragementsChecked: settingData.encouragement,
          isSanctionsChecked: settingData.sanction,
          isObservationsChecked: settingData.observation,
          isTheFirstInit: false,
          idSetting:settingData.id
        });
      } else {
        this.setState({
          isPresenceChecked: true,
          isRetardChecked: true,
          isEncouragementsChecked: false,
          isSanctionsChecked: true,
          isObservationsChecked: false,
        });
      }
    }
  }

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div>
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
        {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        <AddCallRegisterSetting
          values={this.state}
          handleChangeEducationType={this.handleChangeEducationType}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          observations={this.props.observations}
          encouragements={this.props.encouragements}
          sanctions={this.props.sanctions}
          settings={this.props.settings}
        />
        <SweetAlert
          show={this.state.isOpen}
          title={<IntlMessages id="alert.types.education" />}
          onConfirm={this.onConfirm}
        ></SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    educationTypes: state.EstabTypes.educationTypes,
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    observations: state.callRegister.observations,
    encouragements: state.callRegister.encouragements,
    sanctions: state.callRegister.sanctions,
    settings: state.settings.locale,
    settingCallRegister: state.callRegister.settingCallRegister,
  };
};

export default connect(mapStateToProps)(CallRegisterSetting);
