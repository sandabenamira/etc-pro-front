import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import CardBox from "../../../../../components/CardBox/index";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { TimePicker } from "@material-ui/pickers";
import FormHelperText from "@material-ui/core/FormHelperText";
import { UncontrolledAlert } from "reactstrap";

const accessibilityList = [
  {
    value: true,
    name: "Publique",
  },
  {
    value: false,
    name: "Privé",
  },
];

class AddVirtualClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      values,
      handleChange,
      handleChangeDate,
      handleChangeProfessor,
      handleEndTimeChange,
      handleChangeSubject,
      handleStartTimeChange,
      handleChangeClass,
    } = this.props;

    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div>
                  <form
                    autoComplete="off"
                    onSubmit={this.props.addVirtualClass}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <h1>
                        <b>
                          <IntlMessages id="new.class.virtual" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.props.openAddModal}
                      >
                        {this.props.values.isOpen ? (
                          <RemoveSharpIcon />
                        ) : (
                          <AddIcon />
                        )}
                      </Fab>
                    </div>
                    <br />
                    {this.props.values.isOpen ? (
                      <>
                        {" "}
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <label
                              htmlFor="comment"
                              style={{ fontSize: "20px", color: "#0B4786" }}
                            >
                              <IntlMessages id="component.etablishments.info.general" />
                            </label>
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    required
                                    name="virtualClassName"
                                    id="virtualClassName"
                                    label={
                                      <IntlMessages id="subject.message" />
                                    }
                                    onChange={handleChange("virtualClassName")}
                                    value={values.virtualClassName || ""}
                                    margin="normal"
                                    fullWidth
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    id="classId"
                                    name="itemClass"
                                    select
                                    required
                                    value={values.itemClass || ""}
                                    onChange={handleChangeClass("itemClass")}
                                    SelectProps={{}}
                                    label={
                                      <IntlMessages id="components.student.formadd.classe" />
                                    }
                                    margin="normal"
                                    fullWidth
                                  >
                                    {values.classes.map((itemClass) => {
                                      let data = {
                                        classId: itemClass.id,
                                        classeName: itemClass.name,
                                      };
                                      return (
                                        <MenuItem
                                          key={itemClass.id}
                                          value={JSON.stringify(data)}
                                        >
                                          {data.classeName}
                                        </MenuItem>
                                      );
                                    })}
                                  </TextField>
                                </div>
                              </div>
                              <RoleContext.Consumer>
                                {({ role }) => (
                                  <Can
                                    role={role}
                                    perform="virtuel-class-input-professor:visit"
                                    yes={() => (
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <TextField
                                            id="professorId"
                                            name="itemProfessor"
                                            select
                                            required
                                            value={values.itemProfessor || ""}
                                            onChange={handleChangeProfessor(
                                              "itemProfessor"
                                            )}
                                            SelectProps={{}}
                                            label={
                                              <IntlMessages id="toDo.professor" />
                                            }
                                            margin="normal"
                                            fullWidth
                                          >
                                            {values.professors.map((option) => {
                                              let data = {
                                                profId: option.professor.id,
                                                profName:
                                                  option.professor.profile.user
                                                    .name,
                                                profSurname:
                                                  option.professor.profile.user
                                                    .surname,
                                              };
                                              return (
                                                <MenuItem
                                                  key={option.id}
                                                  value={JSON.stringify(data)}
                                                >
                                                  {data.profName +
                                                    " " +
                                                    data.profSurname}
                                                </MenuItem>
                                              );
                                            })}
                                          </TextField>
                                        </div>
                                      </div>
                                    )}
                                  />
                                )}
                              </RoleContext.Consumer>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    id="subjectId"
                                    name="itemSubject"
                                    select
                                    required
                                    value={values.itemSubject || ""}
                                    onChange={handleChangeSubject(
                                      "itemSubject"
                                    )}
                                    SelectProps={{}}
                                    label={
                                      <IntlMessages id="components.note.subject" />
                                    }
                                    margin="normal"
                                    fullWidth
                                  >
                                    {values.subjects.map((item) => {
                                      let data = {
                                        subjectId: item.subject.id,
                                        subjectName: item.subject.name,
                                        subjectColor: item.subject.color,
                                        courseId: item.courseId,
                                      };

                                      return (
                                        <MenuItem
                                          key={item.subject.id}
                                          value={JSON.stringify(data)}
                                        >
                                          {data.subjectName}
                                        </MenuItem>
                                      );
                                    })}
                                  </TextField>
                                </div>
                              </div>
                              <div className="d-flex col-md-12 flex-column">
                                <label
                                  htmlFor="description"
                                  style={{ fontSize: "20px", color: "#0B4786" }}
                                >
                                  <IntlMessages id="room.description" />
                                </label>
                                <textarea
                                  rows="3"
                                  value={values.description || ""}
                                  onChange={handleChange("description")}
                                  style={{
                                    borderRadius: "20px",
                                    marginTop: "10px",
                                  }}
                                ></textarea>
                              </div>
                            </div>
                            <hr
                              style={{
                                width: "100%",
                                margin: "auto",
                                marginTop: "5%",
                                marginBottom: "5%",
                                border: "1px dashed #979A9A",
                                paddingLeft: "-100%",
                              }}
                            />

                            <label
                              htmlFor="comment"
                              style={{
                                fontSize: "20px",
                                color: "#0B4786",
                                marginTop: "10px",
                              }}
                            >
                              <IntlMessages id="component.connexion.information" />
                            </label>

                            <div className="d-flex flex-wrap justify-content-start align-items-center  ">
                              <div className="col-md-7">
                                <div className="form-group">
                                  <h5 style={{ color: "#000" }}>
                                    {" "}
                                    <IntlMessages id="class.extern.link" />{" "}
                                    &#x27A5;
                                  </h5>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    required
                                    name="classUrl"
                                    id="classUrl"
                                    label={
                                      <IntlMessages id="components.virtual.class.url" />
                                    }
                                    onChange={handleChange("classUrl")}
                                    value={values.classUrl || ""}
                                    margin="normal"
                                    fullWidth
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <TextField
                                    name="password"
                                    id="password"
                                    multiline
                                    label={
                                      <IntlMessages id="appModule.password" />
                                    }
                                    onChange={handleChange("password")}
                                    value={values.password || ""}
                                    margin="normal"
                                    fullWidth
                                  />
                                </div>
                              </div>
                            </div>

                            <hr
                              style={{
                                width: "100%",
                                margin: "auto",
                                marginTop: "5%",
                                marginBottom: "5%",
                                border: "1px dashed #979A9A",
                                paddingLeft: "-100%",
                              }}
                            />

                            <label
                              htmlFor="comment"
                              style={{
                                fontSize: "20px",
                                color: "#0B4786",
                                marginTop: "10px",
                              }}
                            >
                              <IntlMessages id="horaires.informations" />
                            </label>
                            <div className="d-flex flex-wrap justify-content-start align-items-center  ">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      required
                                      label="                                           "
                                      fullWidth
                                      id="dateVirtualClass"
                                      name="dateVirtualClass"
                                      value={values.dateVirtualClass}
                                      onChange={handleChangeDate}
                                      format="DD-MM-YYYY"
                                      autoOk
                                      minDate={new Date()}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>
                              </div>

                              <div className="col-md-4">
                                <div className="form-group">
                                  <div
                                    key="datetime_default"
                                    className="picker"
                                  >
                                    <TimePicker
                                      required
                                      label={
                                        <IntlMessages id="start.hour.class" />
                                      }
                                      fullWidth
                                      value={values.startTimeClass}
                                      showTabs={false}
                                      onChange={handleStartTimeChange}
                                      ampm={false}
                                      minDate={new Date()}
                                      leftArrowIcon={
                                        <i className="zmdi zmdi-arrow-back" />
                                      }
                                      rightArrowIcon={
                                        <i className="zmdi zmdi-arrow-forward" />
                                      }
                                    />
                                  </div>
                                  <FormHelperText
                                    error={!values.startTimeClassError}
                                  >
                                    {!values.startTimeClassError ? (
                                      <IntlMessages id="start.hour.check" />
                                    ) : (
                                      ""
                                    )}
                                  </FormHelperText>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <div
                                    key="datetime_default"
                                    className="picker"
                                  >
                                    <TimePicker
                                      label={
                                        <IntlMessages id="end.hour.class" />
                                      }
                                      fullWidth
                                      required
                                      value={values.endTimeClass}
                                      ampm={false}
                                      showTabs={false}
                                      onChange={handleEndTimeChange}
                                      leftArrowIcon={
                                        <i className="zmdi zmdi-arrow-back" />
                                      }
                                      rightArrowIcon={
                                        <i className="zmdi zmdi-arrow-forward" />
                                      }
                                    />
                                  </div>

                                  <FormHelperText
                                    error={!values.endTimeClassError}
                                  >
                                    {!values.endTimeClassError ? (
                                      <IntlMessages id="end.hour.check" />
                                    ) : (
                                      ""
                                    )}
                                  </FormHelperText>
                                </div>
                              </div>
                              <div className="col-md-12">
                                {values.alerteDate ? (
                                  <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                                    <span className="icon-addon alert-addon">
                                      <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                                    </span>
                                    <span className="d-inline-block">
                                      {" "}
                                      <IntlMessages id="alerte.date" />
                                    </span>
                                  </UncontrolledAlert>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </CardBox>
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.openAddModal}
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "20%",
                            }}
                          >
                            {
                              <IntlMessages id="components.establishments.formadd.buttonCancel" />
                            }
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            className="bg-grey text-white "
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "6%",
                            }}
                            onClick={this.handleArchive}
                          >
                            {<IntlMessages id="service.button.archive" />}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "6%",
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="service.button.publish" />
                          </Button>
                        </div>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              )}
            />
          )}
        </RoleContext.Consumer>
      </div>
    );
  }
}

export default connect()(AddVirtualClass);