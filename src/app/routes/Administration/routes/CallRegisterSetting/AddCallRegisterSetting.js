import React, { Component } from "react";
import CardBox from "../../../../../components/CardBox/index";
import Select from "react-select";
import IntlMessages from "../../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";

export class AddCallRegisterSetting extends Component {
  render() {
    return (
      <div className="col-md-12 col-lg-12 col-sm-12 d-flex flex-column bd-highlight mb-3 ">
        <CardBox styleName="col-md-6 col-lg-6 col-sm-12">
          <div>
            <div className="d-flex p-2 bd-highlight ">
              <div className="d-flex flex-column bd-highlight mb-3 ">
                <div className="p-2 bd-highlight ml-4">
                  <h1 style={{ color: "#0000CD", fontFamily: "Roboto" }}>
                    {" "}
                    <IntlMessages id="setting.call.register" />
                  </h1>
                </div>

                {this.props.values.show ? (
                  <div className="p-2 bd-highlight ml-4 ">
                    <div className="bd-highlight ml-2">
                      <IntlMessages id="sidebar.components.typeOfEducation" />
                    </div>
                    <Select
                      value={this.props.values.optionEducationType}
                      id="nomSelect"
                      styles={{
                        control: (base) => ({
                          ...base,
                          "&:hover": { borderColor: "gray" },
                          border: "1px solid lightgray",
                          boxShadow: "none",
                          borderTopStyle: "none",
                          borderRightStyle: "none",
                          borderLeftStyle: "none",
                          borderRadius: " none",
                        }),
                      }}
                      onChange={this.props.handleChangeEducationType}
                      options={this.props.values.educationTypes}
                    />
                    <FormHelperText
                      error={this.props.values.educationTypesError}
                    >
                      {this.props.values.educationTypesError ? (
                        <IntlMessages id="component.required_fields" />
                      ) : (
                        ""
                      )}
                    </FormHelperText>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="d-flex flex-wrap flex-row bd-highlight justify-content-around mb-2">
              <div className="p-2 bd-highlight  mr-2 ">
                <div className="d-flex flex-column justify-content-start bd-highlight ">
                  <div className=" bd-highlight ">
                    <div className="d-flex flex-row bd-highlight ml-2 justify-content-between">
                      <div
                        className="p-2 bd-highlight mt-2"
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#656564",
                        }}
                      >
                        <IntlMessages id="presence.students" />
                      </div>
                      <div className="p-2 bd-highlight">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="isPresenceChecked"
                              icon={<RadioButtonUncheckedIcon />}
                              onChange={this.props.handleChange(
                                "isPresenceChecked"
                              )}
                              checked={this.props.values.isPresenceChecked}
                              checkedIcon={<CheckCircleIcon />}
                              color={"default"}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" bd-highlight  ">
                    <div className="d-flex flex-row bd-highlight ml-2 justify-content-between ">
                      <div
                        className="p-2 bd-highlight mt-2"
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#656564",
                        }}
                      >
                        <IntlMessages id="call.register.retard" />
                      </div>
                      <div className="p-2 bd-highlight">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="isRetardChecked"
                              icon={<RadioButtonUncheckedIcon />}
                              onChange={this.props.handleChange(
                                "isRetardChecked"
                              )}
                              checked={this.props.values.isRetardChecked}
                              checkedIcon={<CheckCircleIcon />}
                              color={"default"}
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" bd-highlight ">
                    <div className="d-flex flex-row bd-highlight justify-content-between ">
                      <div className="bd-highlight ">
                        <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-3"></i>
                      </div>
                      <div
                        className="p-2 bd-highlight mt-2 pr-5"
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#656564",
                        }}
                      >
                        {" "}
                        <IntlMessages id="dashborad.prof.observations" />
                      </div>
                      <div className="p-2 bd-highlight ">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="isObservationsChecked"
                              icon={<RadioButtonUncheckedIcon />}
                              onChange={this.props.handleChange(
                                "isObservationsChecked"
                              )}
                              checked={this.props.values.isObservationsChecked}
                              checkedIcon={<CheckCircleIcon />}
                              color={"default"}
                            />
                          }
                        />{" "}
                      </div>
                    </div>
                    <div className="d-flex flex-row bd-highlight ">
                      <div className="p-2 bd-highlight ">
                        <hr
                          style={{
                            height: "90%",
                            margin: "auto",
                            border: "1px dashed #979A9A",
                            paddingLeft: "-100%",
                          }}
                        />
                      </div>
                      <div className=" bd-highlight ">
                        <div className="d-flex flex-column bd-highlight mb-3">
                          {this.props.observations.map((observation, index) => (
                            <div className=" bd-highlight " key={index}>
                              {this.props.settings.languageId == "tunisia"
                                ? observation.name_ar
                                : this.props.settings.languageId == "french"
                                ? observation.name_fr
                                : observation.name_en}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column bd-highlight mb-3 ">
                <div className="p-2 bd-highlight ">
                  <div className="d-flex flex-row bd-highlight justify-content-between ">
                    <div className="bd-highlight ">
                      <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-3"></i>
                    </div>
                    <div
                      className="p-2 bd-highlight mt-2"
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#656564",
                      }}
                    >
                      <IntlMessages id="encouragement.action" />
                    </div>
                    <div className="p-2 bd-highlight ">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="isEncouragementsChecked"
                            icon={<RadioButtonUncheckedIcon />}
                            onChange={this.props.handleChange(
                              "isEncouragementsChecked"
                            )}
                            checked={this.props.values.isEncouragementsChecked}
                            checkedIcon={<CheckCircleIcon />}
                            color={"default"}
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row bd-highlight ">
                    <div className="p-2 bd-highlight ">
                      <hr
                        style={{
                          height: "68%",
                          margin: "auto",
                          marginTop: "5%",
                          marginBottom: "5%",
                          border: "1px dashed #979A9A",
                          paddingLeft: "-100%",
                        }}
                      />
                    </div>
                    <div className=" bd-highlight ">
                      <div className="d-flex flex-column bd-highlight mb-3">
                        {this.props.encouragements.map(
                          (encouragement, index) => (
                            <div className=" bd-highlight " key={index}>
                              {this.props.settings.languageId == "tunisia"
                                ? encouragement.name_ar
                                : this.props.settings.languageId == "french"
                                ? encouragement.name_fr
                                : encouragement.name_en}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 bd-highlight ">
                  <div className="d-flex flex-row bd-highlight justify-content-between ">
                    <div className="bd-highlight ">
                      <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-3"></i>
                    </div>
                    <div
                      className="p-2 bd-highlight mt-2 pr-5"
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#656564",
                      }}
                    >
                      <IntlMessages id="call.register.sanction" />
                    </div>
                    <div className="p-2 bd-highlight ">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="isSanctionsChecked"
                            icon={<RadioButtonUncheckedIcon />}
                            onChange={this.props.handleChange(
                              "isSanctionsChecked"
                            )}
                            checked={this.props.values.isSanctionsChecked}
                            checkedIcon={<CheckCircleIcon />}
                            color={"default"}
                          />
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row bd-highlight ">
                    <div className="p-2 bd-highlight ">
                      <hr
                        style={{
                          height: "80%",
                          margin: "auto",
                          marginTop: "5%",
                          marginBottom: "5%",
                          border: "1px dashed #979A9A",
                          paddingLeft: "-100%",
                        }}
                      />
                    </div>
                    <div className=" bd-highlight ">
                      <div className="d-flex flex-column bd-highlight mb-3">
                        {this.props.sanctions.map((sanction, index) => (
                          <div className=" bd-highlight " key={index}>
                            {this.props.settings.languageId == "tunisia"
                              ? sanction.name_ar
                              : this.props.settings.languageId == "french"
                              ? sanction.name_fr
                              : sanction.name_en}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBox>
        <div className="d-flex flex-row-reverse bd-highlight col-md-6 col-lg-6 col-sm-12">
          <div className=" bd-highlight ">
            <Button
              variant="contained"
              className="bg-secondary text-white "
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                width: "100%",
                height: "80%",
                textTransform: "capitalize",
              }}
              onClick={this.props.handleSubmit}
            >
              {this.props.values.isTheFirstInit ? (
                <IntlMessages id="superadmin.apply.button" />
              ) : (
                <IntlMessages id="button.modify" />
              )}
            </Button>
          </div>
          <div className=" bd-highlight mr-2">
            <Button
              variant="contained"
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                width: "100%",
                height: "80%",
                textTransform: "capitalize",
              }}
              className=" bg-grey text-white "
              onClick={this.props.handleCancel}
            >
              <IntlMessages id="components.classes.formadd.buttonCancel" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCallRegisterSetting;
