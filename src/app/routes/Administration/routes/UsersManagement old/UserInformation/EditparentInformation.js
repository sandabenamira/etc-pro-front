import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../../../util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import moment from "moment";
import MuiPhoneNumber from "material-ui-phone-number";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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
export default class EditparentInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newParent: false,
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
      addNewParentFormulaire,
      handleChangeSelectParent,
      handleChangeDateParent,
      handleChangeParentPhone,
    } = this.props;
    return (
      <div>
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-md-6 col-sm-6">
            <FormControl className="w-100" variant="outlined">
              <InputLabel htmlFor="name-multiple">
                {<IntlMessages id="stuppUser.steps.existparentInfoOfStudent" />}
              </InputLabel>
              <Select
                variant="outlined"
                multiple
                name="affectedParents"
                value={values.affectedParents}
                onChange={handleChangeSelectParent("affectedParents")}
                input={<Input id="name-multiple" />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                      width: 200,
                    },
                  },
                }}
              >
                {values.allParentList.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name + " " + option.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3 col-sm-6  d-flex justify-content-center align-items-center ">
            <Button
              className="jr-btn bg-indigo text-white"
              color="secondary"
              onClick={addNewParentFormulaire}
            >
              {<IntlMessages id="add.parent" />}
            </Button>
          </div>
        </div>
        {values.newParentsList.length !== 0 ? (
          <div className="row">
            {values.newParentsList.map((data) => {
              return (
                <Chip
                  icon={<FaceIcon />}
                  label={data.nameParent + " " + data.surnameParent}
                  variant="outlined"
                />
              );
            })}
          </div>
        ) : (
          <div className="row">
            {" "}
            <br /> <br /> <br />
          </div>
        )}

        {values.newParent === true ? (
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="genderParent"
                  name="genderParent"
                  //  error={values.genderParent.length === 0 ? true : false}

                  label={<IntlMessages id="stuppUser.formadd.gender" />}
                  value={values.genderParent}
                  onChange={handleChange("genderParent")}
                  margin="normal"
                  select
                  fullWidth
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="nameParent"
                  name="nameParent"
                  //  error={values.nameParent.length === 0 ? true : false}

                  label={<IntlMessages id="stuppUser.formadd.name" />}
                  value={values.nameParent}
                  onChange={handleChange("nameParent")}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="surnameParent"
                  name="surnameParent"
                  // error={values.surnameParent.length === 0 ? true : false}

                  label={<IntlMessages id="stuppUser.formadd.surname" />}
                  value={values.surnameParent}
                  onChange={handleChange("surnameParent")}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label={
                      <IntlMessages id="stuppUser.formadd.date_of_birth" />
                    }
                    fullWidth
                    id="date_of_birthParent"
                    name="date_of_birthParent"
                    value={values.date_of_birthParent}
                    onChange={handleChangeDateParent}
                    format="DD-MM-YYYY"
                    autoOk
                    maxDate={moment().year() - 18 + "-01-01"}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="emailParent"
                  name="emailParent"
                  error={
                    this.isEmail(values.emailParent) === false ? true : false
                  }
                  label={<IntlMessages id="stuppUser.formadd.address_mail" />}
                  value={values.emailParent}
                  onChange={handleChange("emailParent")}
                  type="email"
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-md-6  d-flex align-items-center">
              <MuiPhoneNumber
                error={
                  this.isValidphoneNumber(values.phoneParent) === true ||
                  values.phoneParent.length === 0
                    ? false
                    : true
                }
                variant="outlined"
                country={this.state.countrie_locale === "ar" ? "tn" : "fr"}
                value={values.phoneParent}
                onChange={handleChangeParentPhone}
                fullWidth={true}
                label={<IntlMessages id="stuppUser.formadd.phone" />}
                placeholder="(+XXX) XXX XXX XXX"
              />
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="cinParent"
                  name="cinParent"
                  error={this.isCIN(values.cinParent) === false ? true : false}
                  label={<IntlMessages id="stuppUser.formadd.cin" />}
                  value={values.cinParent}
                  onChange={handleChange("cinParent")}
                  type="number"
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="addressParent"
                  name="addressParent"
                  //  error={values.addressParent.length === 0 ? true : false}
                  label={<IntlMessages id="stuppUser.formadd.adress" />}
                  value={values.addressParent}
                  onChange={handleChange("addressParent")}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <TextField
                  variant="outlined"
                  id="zip_codeParent"
                  name="zip_codeParent"
                  error={
                    this.isZipCode(values.zip_codeParent) === false
                      ? true
                      : false
                  }
                  label={<IntlMessages id="stuppUser.formadd.zip_code" />}
                  value={values.zip_codeParent}
                  onChange={handleChange("zip_codeParent")}
                  type="number"
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>

            <div className="col-md-6">
              <br />
              <div className="form-group">
                <InputLabel htmlFor="name-multiple">
                  {<IntlMessages id="stuppUser.formadd.avatar" />}
                </InputLabel>{" "}
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
                  {values.inputTextParent}
                </label>
                <input
                  id="files"
                  type="file"
                  style={{ visibility: "hidden" }}
                  onChange={(e) => this.props.onDropUserParent(e)}
                />
              </div>
            </div>

            <div className="col-md-12 text-right  d-flex align-items-center justify-content-center pb-3">
              <br />
              <br />
              <Button
                className="jr-btn bg-indigo text-white"
                color="secondary"
                onClick={this.props.addNewParent}
              >
                {<IntlMessages id="stuppUser.button.addParent" />}
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
