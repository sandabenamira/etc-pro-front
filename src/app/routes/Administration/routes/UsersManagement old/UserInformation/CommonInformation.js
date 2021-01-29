import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../../../util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import moment from "moment";
import axios from "axios";
import baseUrl from "../../../../../../config/config";
import { connect } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
import PhoneInput from "react-phone-input-2";
import MuiPhoneNumber from "material-ui-phone-number";
import startsWith from "lodash.startswith";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const gender = [
  {
    value: "Masculin",
    label: <IntlMessages id="gender.male" />,
  },
  {
    value: "Féminin",
    label: <IntlMessages id="gender.female" />,
  },
];

class CommonInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countrie_locale: "",
      phone: "",
    };
  }
  isEmail(value) {
    if (value.length > 0)
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    else return true;
  }

  isPhonenumber(str) {
    if (str.length > 1) return /^[2-9]\d{7}$/.test(str);
    else return true;
  }

  isZipCode(zipCode) {
    if (zipCode.length > 1) return /^[1-9]\d{3}$/.test(zipCode);
    else return true;
  }

  isCIN(cin) {
    if (cin.length > 1) return /^[0-9]\d{7}$/.test(cin);
    else return true;
  }

  componentWillMount() {
    axios
      .get(
        `${baseUrl.baseUrl}/establishments/` +
          this.props.userProfile.establishment_id +
          `?access_token=${localStorage.token}`
      )
      .then((res) => {
        this.setState({
          estabType: res.data.estab_type_id,
        });
        axios
          .get(
            `${baseUrl.baseUrl}/countries/` +
              res.data.countries_id +
              `?access_token=${localStorage.token}`
          )
          .then((res) => {
            this.setState({ countrie_locale: res.data.locale });
          });
      });
  }

  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }
    return res;
  };

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleChangeDate,
      handleChangePhone,
    } = this.props;
    return (
      <div>
        {values.communsuccessAlert ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="notification.successMessage" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}
        {values.communFailedAlert ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {<IntlMessages id="edit.user.error" />}
            </span>
          </UncontrolledAlert>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-md-6">
            <TextField
              // required
              variant="outlined"
              //error={values.surname.length === 0 ? true : false}
              type="text"
              id="surname"
              name="surname"
              label={<IntlMessages id="stuppUser.formadd.surname" />}
              value={values.surname}
              onChange={handleChange("surname")}
              onBlur={handleBlur}
              // className={touched.surname && errors.surname ? "has erros" : null}
              margin="normal"
              fullWidth
            />
            {/* <Error touched={touched.surname} message={errors.surname} /> */}
          </div>
          {this.state.countrie_locale === "ar" ? (
            <div className="col-md-6">
              <TextField
                required
                variant="outlined"
                //   error={values.Arabsurname.length === 0 ? true : false}
                type="text"
                id="Arabsurname"
                name="Arabsurname"
                label="الاسم باللغة العربية"
                value={values.Arabsurname || ""}
                onChange={handleChange("Arabsurname")}
                onBlur={handleBlur}
                // className={touched.surname && errors.surname ? "has erros" : null}
                margin="normal"
                fullWidth
              />
              {/* <Error touched={touched.surname} message={errors.surname} /> */}
            </div>
          ) : (
            ""
          )}

          <div className="col-md-6">
            <TextField
              required
              variant="outlined"
              //  error={values.name.length === 0 ? true : false}
              type="text"
              id="name"
              name="name"
              label={<IntlMessages id="stuppUser.formadd.name" />}
              value={values.name || ""}
              onChange={handleChange("name")}
              onBlur={handleBlur}
              // className={touched.name && errors.name ? "has erros" : null}
              margin="normal"
              fullWidth
            />
            {/* <Error touched={touched.name} message={errors.name} /> */}
          </div>

          {this.state.countrie_locale === "ar" ? (
            <div className="col-md-6">
              <TextField
                required
                variant="outlined"
                type="text"
                id="Arabname"
                name="Arabname"
                label="اللقب"
                value={values.Arabname || ""}
                //   error={values.Arabname.length === 0 ? true : false}
                onChange={handleChange("Arabname")}
                onBlur={handleBlur}
                // className={touched.name && errors.name ? "has erros" : null}
                margin="normal"
                fullWidth
              />
              {/* <Error touched={touched.name} message={errors.name} /> */}
            </div>
          ) : (
            ""
          )}

          <div className="col-md-6">
            <TextField
              variant="outlined"
              id="gender"
              name="gender"
              label={<IntlMessages id="stuppUser.formadd.gender" />}
              value={values.gender || ""}
              onChange={handleChange("gender")}
              onBlur={handleBlur}
              //className={touched.gender && errors.gender ? "has erros" : null}
              select
              margin="normal"
              fullWidth
            >
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            {/* <Error touched={touched.gender} message={errors.gender} /> */}
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label={<IntlMessages id="stuppUser.formadd.date_of_birth" />}
                  fullWidth
                  id="date_of_birth"
                  name="date_of_birth"
                  value={values.date_of_birth}
                  onChange={handleChangeDate}
                  format="DD-MM-YYYY"
                  autoOk
                  maxDate={moment().year() - 6 + "-01-01"}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className="col-md-6">
            <TextField
              required
              variant="outlined"
              id="email"
              name="email"
              label={<IntlMessages id="stuppUser.formadd.address_mail" />}
              value={values.email || ""}
              onChange={handleChange("email")}
              error={this.isEmail(values.email) === false ? true : false}
              // helperText={<IntlMessages id="valid.email.format" />}

              onBlur={handleBlur}
              //  className={touched.email && errors.email ? "has erros" : null}
              margin="normal"
              fullWidth
            />
            {/* <Error touched={touched.email} message={errors.email} /> */}
          </div>
          <div className="col-md-6  d-flex align-items-center">
            <MuiPhoneNumber
              error={
                this.isValidphoneNumber(values.phone) === true ||
                values.phone.length === 0
                  ? false
                  : true
              }
              variant="outlined"
              country={this.state.countrie_locale === "ar" ? "tn" : "fr"}
              value={values.phone}
              onChange={handleChangePhone}
              fullWidth={true}
              label={<IntlMessages id="stuppUser.formadd.phone" />}
              placeholder="(+XXX) XXX XXX XXX"
            />
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <TextField
                variant="outlined"
                type="number"
                id="cin"
                name="cin"
                label={<IntlMessages id="stuppUser.formadd.cin" />}
                value={values.cin}
                onChange={handleChange("cin")}
                error={this.isCIN(values.cin) === false ? true : false}
                onBlur={handleBlur}
                // className={touched.cin && errors.cin ? "has erros" : null}
                margin="normal"
                fullWidth
              />
              {/* <Error touched={touched.cin} message={errors.cin} /> */}
            </div>
          </div>
          <div className="col-md-6">
            <TextField
              variant="outlined"
              type="text"
              id="address"
              name="address"
              label={"address"}
              value={values.address}
              onChange={handleChange("address")}
              //  error={values.address.length === 0 ? true : false}

              onBlur={handleBlur}
              //  className={touched.address && errors.address ? "has erros" : null}
              margin="normal"
              fullWidth
            />
            {/* <Error touched={touched.address} message={errors.address} /> */}
          </div>
          <div className="col-md-6">
            <TextField
              variant="outlined"
              type="number"
              id="zip_code"
              name="zip_code"
              label={<IntlMessages id="stuppUser.formadd.zip_code" />}
              value={values.zip_code}
              error={this.isZipCode(values.zip_code) === false ? true : false}
              onChange={handleChange("zip_code")}
              onBlur={handleBlur}
              //  className={touched.zip_code && errors.zip_code ? "has erros" : null}
              margin="normal"
              fullWidth
            />
            {/* <Error touched={touched.zip_code} message={errors.zip_code} /> */}
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputLabel htmlFor="name-multiple">
                {<IntlMessages id="stuppUser.formadd.avatar" />}
              </InputLabel>{" "}
              <br /> <br />
              <label
                htmlFor="files"
                className="btn"
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#4C19A9",
                  borderRadius: "4rem",
                }}
              >
                <strong>
                  {
                    <IntlMessages id="components.establishments.formadd.selectImage" />
                  }
                </strong>
              </label>{" "}
              <label htmlFor="files" className="btn">
                {values.inputText}
              </label>
              <input
                id="files"
                type="file"
                style={{ visibility: "hidden" }}
                onChange={(e) => this.props.onDrop(e)}
                accept=".jpg, .jpeg, .png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    successStatus: state.alert.successSteper,
    errorStatus: state.alert.errorSteper,
    message: state.alert.messageSteper,
    settings: state.settings.locale,
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(CommonInformation);
