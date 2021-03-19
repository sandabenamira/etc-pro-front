import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import IntlMessages from "../../../../../util/IntlMessages";
import WcIcon from "@material-ui/icons/Wc";
import { Radio } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/moment";




export default class AddSurvey extends Component {
  render() {
    return (
      <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
        <div class="p-2 bd-highlight col-lg-5  col-md-9 ">
          <div class="d-flex flex-column bd-highlight mb-3">
            <div
              class="p-2 bd-highlight"
              style={{ fontSize: "20px", color: "blue" }}
            >
              Questionnaire de satisfaction de Formation
            </div>
            <div class="d-flex flex-wrap flex-row bd-highlight mb-3 ">
              <div class="p-2 bd-highlight col-lg-5  col-md-4">
                <InputLabel
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    // marginTop: "-2%",
                  }}
                  required
                >
                  {<IntlMessages id="user.last.name" />}
                </InputLabel>
                <TextField
                  required
                  // error={values.nameError}
                  id="userLastName"
                  name="userLastName"
                  //   value={values.userLastName || ""}
                  //   onChange={this.props.handleChange("userLastName")}
                  style={{
                    marginTop: "3%",
                  }}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                />
              </div>
              <div class="p-2 bd-highlight col-lg-5  col-md-4">
                <InputLabel
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "18px",
                  }}
                  required
                >
                  {<IntlMessages id="user.name" />}
                </InputLabel>
                <TextField
                  required
                  // error={values.nameError}
                  id="userName"
                  name="userName"
                  // value={values.userName || ''}
                  // onChange={this.props.handleChange('userName')}
                  style={{
                    marginTop: "3%",
                  }}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                />
              </div>
            </div>
            <div class="d-flex flex-wrap flex-row bd-highlight mb-3 ">
              <div class="p-2 bd-highlight col-md-6 col-lg-3 ">Vous etes </div>
              <div class="p-2 bd-highlight">
                {" "}
                <div className="col-md-6 col-lg-3 col-sm-12 p-0 d-flex justify-content-center">
                  <Radio
                    //   checked={values.userGender === "Male"}
                    //   onChange={this.props.handleChange("userGender")}
                    value="Male"
                    color="primary"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "D" }}
                  />
                  <WcIcon color="primary" style={{ fontSize: 60 }} />
                  <Radio
                    //   checked={values.userGender === "Female"}
                    //   onChange={this.props.handleChange("userGender")}
                    value="Female"
                    color="primary"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "D" }}
                  />
                </div>
              </div>
            </div>
            <div class="p-2 bd-highlight col-lg-8  col-md-8">
              <InputLabel
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                }}
                required
              >
                Entreprise
              </InputLabel>
              <TextField
                required
                // error={values.nameError}
                id="userName"
                name="userName"
                // value={values.userName || ''}
                // onChange={this.props.handleChange('userName')}
                style={{
                  marginTop: "3%",
                }}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              />
            </div>

            <div className=" col-lg-8 col-md-8 col-sm-12 p-2 bd-highlight">
              <TextField
                id="status"
                name="status"
                select
                // value={this.state.status || ""}
                // onChange={this.handleChangeStatus("status")}
                SelectProps={{}}
                label={<IntlMessages id={`name.formation`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {/* {listStatus.map((role) => ( */}
                <MenuItem
                // key={role.id} value={role.id}
                >
                  {/* {role.label} */}
                </MenuItem>
                {/* ))} */}
              </TextField>
            </div>
            <div class="d-flex flex-row bd-highlight mb-3">
             
              <div className="col-lg-5  col-md-5 p-2 bd-highlight">
                                <div className="form-group">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      required
                                      label="Date début Formation"                                       
                                      fullWidth
                                      id="dateVirtualClass"
                                      name="dateVirtualClass"
                                    //   value={values.dateVirtualClass}
                                    //   onChange={handleChangeDate}
                                      format="DD-MM-YYYY"
                                      autoOk
                                      minDate={new Date()}
                                    />
                                  </MuiPickersUtilsProvider>
                                
                              </div>
              </div>
              <div class="p-2 bd-highlight col-lg-5  col-md-5">
              <div className="form-group">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      required
                                      label="Date fin Formation"                                       
                                      fullWidth
                                      id="dateVirtualClass"
                                      name="dateVirtualClass"
                                    //   value={values.dateVirtualClass}
                                    //   onChange={handleChangeDate}
                                      format="DD-MM-YYYY"
                                      autoOk
                                      minDate={new Date()}
                                    />
                                  </MuiPickersUtilsProvider>
                                
                              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2 bd-highlight col-lg-1  col-md-2 ">
          Flex item 2
        </div>
        <div class="p-2 bd-highlight col-lg-5  col-md-9 ">
          Flex item 3
        </div>
      </div>
    );
  }
}
