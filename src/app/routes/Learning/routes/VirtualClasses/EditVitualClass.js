import React, { Component } from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import CardBox from "../../../../../components/CardBox/index";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { UncontrolledAlert } from "reactstrap";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { TimePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import _ from "lodash";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import FormHelperText from "@material-ui/core/FormHelperText";

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

class EditVitualClass extends Component {
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
      <Auxiliary>
        <Modal isOpen={this.props.editIsopen}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="edit.class.virtual.header" />}
          </ModalHeader>
          <br />
          <ModalBody>
            <form autoComplete="off" onSubmit={this.props.editVirtualClass}>
              <div className="row">
                <CardBox
                  heading={
                    <IntlMessages id="component.etablishments.info.general" />
                  }
                  styleName="col-lg-12 text-primary"
                >
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            required
                            name="virtualClassName"
                            id="virtualClassName"
                            label={<IntlMessages id="subject.message" />}
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
                            name="classId"
                            select
                            required
                            value={"" || values.itemClass}
                            onChange={handleChangeClass("itemClass")}
                            SelectProps={{}}
                            label={<IntlMessages id="ticket.name.class" />}
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
                                    label={<IntlMessages id="toDo.professor" />}
                                    margin="normal"
                                    fullWidth
                                  >
                                    {values.professors.map((option) => {
                                      let data = {
                                        profId: option.professor.id,
                                        profName:
                                          option.professor.profile.user.name,
                                        profSurname:
                                          option.professor.profile.user.surname,
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
                            onChange={handleChangeSubject("itemSubject")}
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
                          htmlFor="comment"
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

                    <div className="row">
                      <div className="col-md-7">
                        <div className="form-group">
                          <h5 style={{ color: "#000" }}>
                            {" "}
                            <IntlMessages id="class.extern.link" /> &#x27A5;
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
                            label={<IntlMessages id="appModule.password" />}
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

                    <div className="row">
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
                          <div key="datetime_default" className="picker">
                            <TimePicker
                              required
                              label={<IntlMessages id="start.hour.class" />}
                              fullWidth
                              value={values.startTimeClass}
                              showTabs={false}
                              onChange={handleStartTimeChange}
                              ampm={false}
                              leftArrowIcon={
                                <i className="zmdi zmdi-arrow-back" />
                              }
                              rightArrowIcon={
                                <i className="zmdi zmdi-arrow-forward" />
                              }
                            />
                          </div>
                          <FormHelperText error={!values.startTimeClassError}>
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
                          <div key="datetime_default" className="picker">
                            <TimePicker
                              label={<IntlMessages id="end.hour.class" />}
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

                          <FormHelperText error={!values.endTimeClassError}>
                            {!values.endTimeClassError ? (
                              <IntlMessages id="end.hour.check" />
                            ) : (
                              ""
                            )}
                          </FormHelperText>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBox>
              </div>
              {values.alerteDate ? (
                <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">
                    <IntlMessages id="alerte.date" />
                  </span>
                </UncontrolledAlert>
              ) : (
                ""
              )}

              <div className="d-flex flex-wrap justify-content-end ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="bg-indigo text-white "
                  type="submit"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "15%",
                    height: "6%",
                  }}
                >
                  {
                    <IntlMessages id="components.establishments.formModify.buttonModify" />
                  }
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  className="bg-grey text-white "
                  onClick={this.props.handleCancel}
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "15%",
                    height: "6%",
                  }}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default connect()(EditVitualClass);
