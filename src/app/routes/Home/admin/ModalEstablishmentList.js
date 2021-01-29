import React, { Component } from "react";
import IntlMessages from "../../../../util/IntlMessages";
import Auxiliary from "../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UncontrolledAlert } from "reactstrap";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import { object } from "prop-types";
import {
  getThemeColor,
  getAppLanguage,
  initCalendar,
} from "../../../../actions/Setting";
import {
  hideModalSelectEstablishment,
} from "../../../../actions/Auth";
import _ from "lodash";
import { getSubjectModules } from "../../../../actions/SubjectModuleAction";
import { getClassSettings } from "../../../../actions/ClassSettingsAction";
import { getSection } from "../../../../actions/SectionsAction";
import { getLevel } from "../../../../actions/LevelAction";
import { getSubjectSetting } from "../../../../actions/subjectAction";
import { getAssignementCourse } from "../../../../actions/AssignementAction";
import {userSignOut,showLicenceMessage, showAuthMessage} from '../../../../actions/Auth';
import { roleIdAdmin } from "../../../../config/config";



class ModalEstablishmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establishment: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit() {
    if(_.isEmpty(this.state.establishment.establishment.licence)){
      this.props.dispatch(userSignOut())
      if (this.props.userProfile.role_id === roleIdAdmin) {
         this.props.dispatch(showLicenceMessage('Votre licence a expiré, Merci de contacter le super admin Educap'))

      } else {
        this.props.dispatch(showLicenceMessage('Vous avez un problème de paiement, merci de contacter l\'administrateur de votre école'))
      }
    }else{
      localStorage.setItem("establishment_id",this.state.establishment.establishment_id);
  
      this.props.dispatch({
        type: "GET_ESTABLISHMENT_MODULE",
        payload: this.state.establishment.establishment.establishmentModule,
      });
      // if (!_.isEmpty(this.state.establishment.establishment.licence)) {
        localStorage.setItem("school_year_id",this.state.establishment.establishment.licence[0].schoolYear.id);
        localStorage.setItem( "school_year_name",this.state.establishment.establishment.licence[0].schoolYear.name);
        const userProfile = Object.assign({}, this.props.profile, {
          establishment_id: this.state.establishment.establishment_id,
          school_year_id: this.state.establishment.establishment.licence[0]
            .schoolYear.id,
          school_year_name: this.state.establishment.establishment.licence[0]
            .schoolYear.name,
        });
  
        this.props.dispatch({ type: "GET_USER_PROFILE", payload: userProfile });
  
        this.props.dispatch(
          getSubjectModules(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
        this.props.dispatch(
          getAssignementCourse(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
        this.props.dispatch(
          getClassSettings(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
        this.props.dispatch(
          getSubjectModules(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
        this.props.dispatch(
          getSection(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
        this.props.dispatch(
          getLevel(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
        this.props.dispatch(
          getSubjectSetting(
            this.state.establishment.establishment_id,
            this.state.establishment.establishment.licence[0].schoolYear.id
          )
        );
      // } else {
      //   localStorage.setItem("school_year_id", null);
      //   localStorage.setItem("school_year_name", "");
      //   const userProfile = Object.assign({}, this.props.profile, {
      //     establishment_id: this.state.establishment.establishment_id,
      //     school_year_id: null,
      //     school_year_name: "",
      //   });
      //   this.props.dispatch({ type: "GET_USER_PROFILE", payload: userProfile });
      // }
  
      this.props.dispatch(hideModalSelectEstablishment());
    }
   
  }

  render() {
    return (
      <Auxiliary>
        <Modal isOpen={this.props.multiple}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="select.establishment.admin" />}
          </ModalHeader>
          <br />
          <ModalBody>
            <form autoComplete="off">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <TextField
                      required
                      name="establishment"
                      id="establishment"
                      select
                      label={
                        <IntlMessages id="components.student.formadd.establishment" />
                      }
                      value={this.state.establishment}
                      onChange={this.handleChange("establishment")}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {this.props.profile.establishments.map(
                        (establishment) => (
                          <MenuItem
                            key={establishment.id}
                            value={establishment}
                          >
                            {establishment.establishment.name}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-left ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  disabled={this.state.establishment === ""}
                  onClick={this.handleSubmit}
                >
                  {<IntlMessages id="button.save.registreAppel" />}
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    multiple: state.auth.multiple,
    profile: state.auth.profile,
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(ModalEstablishmentList);
