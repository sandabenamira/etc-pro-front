import React, { Component } from 'react'
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
  import moment from "moment";
  import DateFnsUtils from "@date-io/moment";
  import Select from "react-select";
  import Button from "@material-ui/core/Button";

export default class AddAffectation extends Component {
    render() {
        return (
            <div className="d-flex flex-wrap flex-column bd-highlight mb-3">
  <div className="p-2 bd-highlight">
  <IntlMessages id="book.Affectations des livres" />
  </div>
  <div className="p-2 bd-highlight">
  <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight col-md-6 col-lg-4 col-sm-12">
  <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.title" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="title"
                              name="title"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
  </div>
  <div class="p-2 bd-highlight col-md-6 col-lg-4 col-sm-12">
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label={
                        <InputLabel
                          style={{
                            backgroundColor: "white",
                            fontFamily: "Roboto",
                            fontSize: "30px",
                            marginTop: "-16px",
                            width: "300px",
                          }}
                          required
                        >
                          {<IntlMessages id="book.prelevement" />}
                        </InputLabel>
                      }
                      clearable
                      fullWidth
                      id="birthdayDate"
                      name="birthdayDate"
                    //   value={values.birthdayDate}
                    //   onChange={this.props.handleChangeBirthdayDate}
                      format="DD-MM-YYYY"
                      autoOk
                      
                     
                    />
                  </MuiPickersUtilsProvider>
  </div>
  <div class="p-2 bd-highlight col-md-6 col-lg-4 col-sm-12">
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label={
                        <InputLabel
                          style={{
                            backgroundColor: "white",
                            fontFamily: "Roboto",
                            fontSize: "30px",
                            marginTop: "-16px",
                            width: "300px",
                          }}
                          required
                        >
                          {<IntlMessages id="book.retour" />}
                        </InputLabel>
                      }
                      clearable
                      fullWidth
                      id="birthdayDate"
                      name="birthdayDate"
                    //   value={values.birthdayDate}
                    //   onChange={this.props.handleChangeBirthdayDate}
                      format="DD-MM-YYYY"
                      autoOk
                      
                     
                    />
                  </MuiPickersUtilsProvider>
  </div>
</div>
  </div>
  <div className="p-2 bd-highlight">
  <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
  <div class="p-2 bd-highlight col-md-6 col-lg-4 col-sm-12">
  <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.user.name" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="title"
                              name="title"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
  </div>
  <div class="p-2 bd-highlight col-md-6 col-lg-4 col-sm-12">
  <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.user.lastName" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="title"
                              name="title"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
  </div>
  <div class="p-2 col-md-6 col-lg-4 col-sm-12 bd-highlight ">
  <InputLabel
                        htmlFor="nomSelect"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "18px",
                          marginTop: "-3%"
                        }}
                        required
                      >
                        {<IntlMessages id="book.user.classe" />}
                      </InputLabel>
                      <Select
                        // options={this.props.values.classForStudent}
                        // onChange={this.props.handleChangeStudentClass}
                        id="nomSelect"
                        styles={{
                          control: (base) => ({
                            ...base,
                            "&:hover": { borderColor: "gray" }, // border style on hover
                            border: "1px solid lightgray", // default border color
                            boxShadow: "none", // no box-shadow
                            borderTopStyle: "none",
                            borderRightStyle: "none",
                            borderLeftStyle: "none",
                            borderRadius: " none",
                          }),
                        }}
                      />
  </div>
</div>
  </div>
  <div class="p-2 bd-highlight col-md-6 col-lg-4 col-sm-12">
  <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              
                            >
                              {<IntlMessages id="book.recomondation" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="title"
                              name="title"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
  </div>
  <div class=" d-flex flex-wrap flex-row justify-content-end pt-1">
                          <div class="p-1">
                            <Button
                              variant="contained"
                              className="bg-grey text-white pr-2 "
                              style={{
                                borderBottomLeftRadius: "16px",
                                borderBottomRightRadius: "16px",
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px",
                                width: "100px",
                                height: "30px",
                              }}
                            >
                              {
                                <IntlMessages id="components.establishments.formadd.buttonCancel" />
                              }
                            </Button>
                          </div>
                          <div className="p-1">
                            <Button
                            // disabled={values.roleId ==="" || values.schoolyearId===""}
                              variant="contained"
                              style={{
                                borderBottomLeftRadius: "16px",
                                borderBottomRightRadius: "16px",
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px",
                                width: "100px",
                                height: "30px",
                              }}
                              className=" bg-indigo text-white pr-2 "
                              type="submit"
                            >
                              <IntlMessages id="service.button.publish" />
                            </Button>
                          </div>
                        </div>
</div>
        )
    }
}
