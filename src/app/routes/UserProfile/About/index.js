import React from "react";
import Widget from "../Widget/index";
import moment from "moment";
import "moment/locale/fr";
import { connect } from "react-redux";
import IntlMessages from "../../../../util/IntlMessages";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { editProfile } from "../../../../actions/usersAction";
import { isEmail } from "../../../../constants/validationFunctions";
import TextField from "@material-ui/core/TextField";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import InputLabel from "@material-ui/core/InputLabel";
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userProfile,
      profileAdress: "",
      profileGenre: "",
      birthDayDateProfile: moment(),
      profileEmail: "",
      profilePhone: "",
      profilePhoto: "",
      messageAlerte: "",
      alerteFiltre: false,
      photoText: "",
      profileNewPhoto:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.isValidphoneNumber = this.isValidphoneNumber.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeBirthdayDate = this.handleChangeBirthdayDate.bind(this);
    this.handleSubmitEditProfile = this.handleSubmitEditProfile.bind(this);

    
  }
  handleChange = (name) => (event) => {
    console.log(event.target.value, "event");
    this.setState({ [name]: event.target.value });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile != this.props.userProfile) {
      this.setState({
        user: this.props.userProfile,
        profileGenre: this.props.userProfile.user.gender,
        profileAdress: this.props.userProfile.user.address,
        profilePhoto: this.props.userProfile.user.photo,
        birthDayDateProfile: this.props.userProfile.user.date_of_birth,
        profileEstablishment: this.props.userProfile.establishments[0]
          .establishment.name,
        profileRole: this.props.userProfile.roleName,
        // profilePassword:this.props.user.profilePassword,
        profileEmail: this.props.userProfile.user.email,
        profilePhone: '+' + this.props.userProfile.user.phone,
      });
    }
  }
  UNSAFE_componentWillMount() {
    if (this.props.userProfile.user != undefined) {
      this.setState({
        user: this.props.userProfile,
        profileGenre: this.props.userProfile.user.gender,
        profileAdress: this.props.userProfile.user.address,
        profilePhoto: this.props.userProfile.user.photo,
        birthDayDateProfile: this.props.userProfile.user.date_of_birth,
        profileEstablishment: this.props.userProfile.establishments[0]
          .establishment.name,
        profileRole: this.props.userProfile.roleName,
        // profilePassword:this.props.user.profilePassword,
        profileEmail: this.props.userProfile.user.email,
        profilePhone: '+' + this.props.userProfile.user.phone,
      });
    }
  }
  uploadPhoto = (e) => {
    console.log("event", e);
    if (e.target.files[0] !== undefined) {
      let file = e.target.files[0];
      this.setState({ profileNewPhoto: file });
    } else {
      this.setState({
        messageAlerte: "Vous n'avez pas choisir une photo",
        alerteFiltre: true,
      });
      setTimeout(() => {
        this.setState({ messageAlerte: "", alerteFiltre: false });
      }, 4000);
    }
  };
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }

    return res;
  };
  handleChangePhone = (value) => {
    this.setState({ profilePhone: value });
  };
  handleChangeBirthdayDate = (date) => {
    this.setState({ birthDayDateProfile: date }, () =>
      console.log("birthDayDateProfile", this.state.birthDayDateProfile)
    );
  };
  handleSubmitEditProfile(event) {

    event.preventDefault();
    let data = {
      id: this.state.user.id,
      dateOfBirth: this.state.birthDayDateProfile,
      address: this.state.profileAdress,
      phone: this.state.profilePhone,
       email: this.state.profileEmail,
    };
    console.log("data", data);
    this.props.editProfile(data, this.state.profileNewPhoto);
  }
  render() {
    console.log(this.state.user, "profile");
    return (
      <>
        {this.state.user.user == undefined ? (
          " "
        ) : (
          <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile d-flex justify-content-start flex-wrap col-md-12 col-lg-6 col-sm-12">
            {/* Section Informations personnelles */}
            <div
              className="card-header d-flex flex-column justify-content-center"
              style={{ marginBottom: "10%" }}
            >
              <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center">
                <h3>
                  <IntlMessages id="profile.personel.informations" />
                </h3>
                <h5>
                  <IntlMessages id="profile.personel.note" />
                </h5>
              </div>
              <hr
                style={{
                  width: "100%",
                  margin: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                  border: "1px dashed #979A9A",
                  paddingLeft: "-100%",
                }}
              ></hr>
              {/* Section Informations générales */}

              <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile col-md-12 col-lg-12 col-sm-12">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column p-2">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center ">
                    <div className="jr-profile-banner-avatar">
                      <Avatar
                        className="size-90"
                        alt="..."
                        src={this.state.profilePhoto}
                      />
                      <input
                        type="file"
                        className="d-none"
                        accept="image/png, image/jpeg,image/bmp"
                        id="add-photo"
                        onChange={(e) => this.uploadPhoto(e)}
                      />
                      <label
                        htmlFor="add-photo"
                        className="d-flex  bd-highlight"
                      >
                        <i
                          className={`zmdi zmdi-camera jr-fs-xlxl text-orange pl-4`}
                          style={{ paddingTop: "-3%" }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column p-2">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-start ">
                    <h4 className="card-title">
                      <IntlMessages id="profile.general.informations" />
                    </h4>
                    <h5>
                      <IntlMessages id="profile.general.note" />
                    </h5>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center p-2">
                  <div class="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i
                        className={`zmdi zmdi-account-circle jr-fs-xlxl text-orange`}
                      />
                    </div>

                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      id="profileName"
                      name="profileName"
                      value={
                        this.state.user.user.name +
                          " " +
                          this.state.user.user.surname || ""
                      }
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>

                  <div class="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i className={`zmdi zmdi-cake jr-fs-xlxl text-orange`} />
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        clearable
                        fullWidth
                        inputVariant="outlined"
                        size="small"
                        id="birthdayDate"
                        name="birthdayDate"
                        value={this.state.birthDayDateProfile || ""}
                        onChange={this.handleChangeBirthdayDate}
                        format="DD-MM-YYYY"
                        autoOk
                        maxDate={moment().year() - 6 + "-01-01"}
                      />
                    </MuiPickersUtilsProvider>
                  </div>

                  <div className="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i
                        className={`zmdi zmdi-male-female jr-fs-xlxl text-orange`}
                      />
                    </div>
                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      id="profileGenre"
                      name="profileGenre"
                      value={this.state.profileGenre || ""}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>
                  <div class="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i className={`zmdi zmdi-city jr-fs-xlxl text-orange`} />
                    </div>
                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      id="profileAdress"
                      name="profileAdress"
                      value={this.state.profileAdress || ""}
                      onChange={this.handleChange("profileAdress")}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>
                  <div className="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i
                        className={`zmdi zmdi-balance jr-fs-xlxl text-orange`}
                      />
                    </div>

                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      id="profileEstablishment"
                      name="profileEstablishment"
                      value={this.state.profileEstablishment || ""}
                      onChange={this.handleChange("profileEstablishment")}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>
                  <div className="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i
                        className={`zmdi zmdi-account-box jr-fs-xlxl text-orange`}
                      />
                    </div>

                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      id="profileRole"
                      name="profileRole"
                      value={this.state.profileRole || ""}
                      onChange={this.handleChange("profileRole")}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    />
                  </div>
                  <div className="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i
                        className={`zmdi zmdi-lock-open jr-fs-xlxl text-orange`}
                      />
                    </div>

                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      // error={isEmail(this.state.profileEmail) === false ? true : false}
                      id="profilePassword"
                      name="profilePassword"
                      value={this.state.profilePassword || ""}
                      onChange={this.handleChange("profilePassword")}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      // helperText={
                      //   isEmail(this.state.profileEmail) === false ? (
                      //     <IntlMessages id="error.user.message.mail" />
                      //   ) : (
                      //     ''
                      //   )
                      // }
                    />
                  </div>
                </div>
              </Widget>

              {/* Section Coordonnées */}

              <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile col-md-12 col-lg-12 col-sm-12 ">
                <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column p-2">
                  <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-start ">
                    <h4 className="card-title">Coordonnées</h4>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column align-items-center p-2">
                  <div className="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i className={`zmdi zmdi-email jr-fs-xlxl text-orange`} />
                    </div>
                    <TextField
                      required
                      className="form-control"
                      variant="outlined"
                      error={
                        isEmail(this.state.profileEmail) === false
                          ? true
                          : false
                      }
                      id="profileEmail"
                      name="profileEmail"
                      value={this.state.profileEmail || ""}
                      onChange={this.handleChange("profileEmail")}
                      // style={{ height:'20%'}}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      helperText={
                        isEmail(this.state.profileEmail) === false ? (
                          <IntlMessages id="error.user.message.mail" />
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>

                  <div className="col-md-12 col-lg-10 col-sm-6 d-flex flex-row  mb-2 mb-sm-0 mt-md-2 ">
                    <div className="mr-3">
                      <i className={`zmdi zmdi-phone jr-fs-xlxl text-orange`} />
                    </div>
                    <MuiPhoneNumber
                      variant="outlined"
                      size="small"
                      error={
                        this.isValidphoneNumber( this.state.profilePhone) ===
                          true || this.state.profilePhone.length === 0
                          ? false
                          : true
                      }
                      id="profilePhone"
                      name="profilePhone"
                      // country={this.state.countrie_locale === "ar" ? "tn" : "fr"}
                      value={this.state.profilePhone || ""}
                      onChange={this.handleChangePhone}
                      fullWidth={true}
                      placeholder="(+XXX) XXX XXX XXX"
                      helperText={
                        this.isValidphoneNumber(this.state.profilePhone) ===
                          true || this.state.profilePhone.length === 0 ? (
                          ""
                        ) : (
                          <IntlMessages id="error.user.message.phone" />
                        )
                      }
                    />
                  </div>
                </div>
              </Widget>
              <div className="col-lg-12 col-sm-12 col-md-12 d-flex flex-wrap flex-row justify-content-center">
                <div className="">
                  <Button
                    variant="contained"
                    className="bg-primary text-white pr-2 "
                    style={{
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      width: "100px",
                      height: "30px",
                      marginBottom: "40px",
                    }}
                    onClick={this.handleSubmitEditProfile}
                  >
                    {<IntlMessages id="profile.button.valide" />}
                  </Button>
                </div>
              </div>
            </div>
          </Widget>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    userProfile: state.auth.userProfile,
  };
}
export default connect(mapStateToProps,{editProfile})(About);
