import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import MomentUtils from "@date-io/moment";
import _ from "lodash";
import moment from "moment";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import FormHelperText from "@material-ui/core/FormHelperText";

class AddLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {
    this.props.handleChangeEventType();
  }
  render() {   /* eslint eqeqeq: "off" */
     const { language } = this.props;
    return (
      <Auxiliary>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Modal isOpen={this.props.modal} style={{ width: "400px" }}>
            <ModalHeader toggle={this.props.handleToggle}></ModalHeader>
            <ModalBody>
              <form
                className="row"
                onSubmit={(e) => this.props.handleSubmit(e)}
              >
                <div className="col-sm-12">
                  {this.props.values.EventGategorie===1 ? (
                    <Nav className="jr-tabs-pills-ctr" pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.props.values.eventType === "lesson",
                          })}
                          onClick={() => {
                            this.props.toggle("lesson");
                          }}
                        >
                          <IntlMessages id="eventType.lesson" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.props.values.eventType === "exam",
                          })}
                          onClick={() => {
                            this.props.toggle("exam");
                          }}
                        >
                          <IntlMessages id="components.note.exam" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.props.values.eventType === "event",
                          })}
                          onClick={() => {
                            this.props.toggle("event");
                          }}
                        >
                          <IntlMessages id="components.event.name" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  ) : (
                      <Nav className="jr-tabs-pills-ctr" pills>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.props.values.eventType === "holidays",
                            })}
                            onClick={() => {
                              this.props.toggle("holidays");
                            }}
                          >
                            <IntlMessages id="components.event.freeday" />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active:
                                this.props.values.eventType ===
                                "schoolVacation",
                            })}
                            onClick={() => {
                              this.props.toggle("schoolVacation");
                            }}
                          >
                            <IntlMessages id="components.event.vacance" />
                          </NavLink>
                        </NavItem>
                      </Nav>
                    )}
                </div>
                <div className="card-body">
                  <br />
                  <br />
                  <ul className="contact-list list-unstyled">
                    <li className="media">
                      <div className="d-flex flex-row">
                        <div className="d-flex flex-row justify-content-center align-items-center ">
                          <i className="zmdi zmdi-alarm zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                        </div>
                        {this.props.values.eventType != "schoolVacation" &&
                          this.props.values.eventType != "holidays" ? (
                            <span className="media-body">
                                  {language === "tunisia"
                                    ? new Date(
                                      this.props.startDateLesson
                                    ).toLocaleDateString("ar-TN", this.props.values.options)
                                    : language === "french"
                                      ? new Date(
                                        this.props.startDateLesson
                                      ).toLocaleDateString("fr-FR", this.props.values.options)
                                      : new Date(
                                        this.props.startDateLesson
                                      ).toLocaleDateString("en-US", this.props.values.options)}{" "}
                                  {language === "tunisia" ? (
                                    <>
                                      {moment(this.props.startDateLesson).format(
                                        "HH:mm"
                                      )}{" "}
                                      -{" "}
                                      {moment(this.props.endDateLesson).format(
                                        "HH:mm"
                                      )}{" "}
                                    </>
                                  ) : (
                                      <>
                                        {" "}
                                        {moment(this.props.startDateLesson).format(
                                          "HH:mm A"
                                        )}{" "}
                                        -{" "}
                                        {moment(this.props.endDateLesson).format(
                                          "HH:mm A"
                                        )}{" "}
                                      </>
                                    )}
                               

                            </span>
                          ) : this.props.values.eventType ==
                            "schoolVacation" ? (
                              <div className=" d-flex flex-row ">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        required
                                        label="                                           "
                                        fullWidth
                                        id="dateVirtualClass"
                                        name="dateVirtualClass"
                                        value={this.props.values.startHours}
                                        onChange={this.props.handleChangeStartDate}
                                        format="DD-MM-YYYY"
                                        autoOk
                                      />
                                    </MuiPickersUtilsProvider>
                                    <FormHelperText
                                    error={!this.props.values.startTimeEventError}
                                  >
                                    {!this.props.values.startTimeEventError ? (
                                      <IntlMessages id="check.date.start" />
                                    ) : (
                                        ""
                                      )}
                                  </FormHelperText>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        required
                                        label="                                           "
                                        fullWidth
                                        id="dateVirtualClass"
                                        name="dateVirtualClass"
                                        value={this.props.values.endHours}
                                        onChange={this.props.handleChangeEndDate}
                                        format="DD-MM-YYYY"
                                        autoOk
                                      />
                                    </MuiPickersUtilsProvider>
                                    <FormHelperText
                                    error={!this.props.values.endTimeEventError}
                                  >
                                    {!this.props.values.endTimeEventError ? (
                                      <IntlMessages id="check.date.end" />
                                    ) : (
                                        ""
                                      )}
                                  </FormHelperText>
                                  </div>
                                </div>
                              </div>
                            ) : this.props.values.eventType==="holidays" ? (
                              <div className=" d-flex flex-row justify-content-center ">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        required
                                        label="                                           "
                                        fullWidth
                                        id="dateVirtualClass"
                                        name="dateVirtualClass"
                                        value={this.props.values.startHours}
                                        onChange={this.props.handleChangeStartDate}
                                        format="DD-MM-YYYY"
                                        autoOk
                                      />
                                    </MuiPickersUtilsProvider>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                      </div>
                    </li>
                    <div className="row">
                      {this.props.values.eventType != "schoolVacation" &&
                        this.props.values.eventType != "holidays" ? (
                          <div className="col-sm-6">
                            <li className="media ">
                              <i className="zmdi zmdi-graphic-eq zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                              <span className="media-body ">
                                <TextField
                                  required
                                  label={
                                    <IntlMessages id="calandar.popup.details.frequency" />
                                  }
                                  id="frequencyID"
                                  onChange={this.props.handleChangeFields(
                                    "frequencyID"
                                  )}
                                  select
                                  value={
                                    this.props.values.frequencyID != ""
                                      ? this.props.values.frequencyID
                                      : ""
                                  }
                                  SelectProps={{}}
                                  InputProps={{ disableUnderline: true }}
                                  margin="normal"
                                  fullWidth
                                >
                                  {this.props.values.frequency.map(
                                    (option, index) => (
                                      <MenuItem key={index} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    )
                                  )}
                                </TextField>
                              </span>
                            </li>
                          </div>
                        ) : null}

                      {this.props.values.eventType === "lesson" ||
                        this.props.values.eventType === "exam" ? (
                          <div className="col-sm-6">
                            <li className="media">
                              <i className="zmdi zmdi-accounts zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                              <span className="media-body">
                                <TextField
                                  label={
                                    <IntlMessages id="sidebar.components.lesson" />
                                  }
                                  required
                                  id="subject"
                                  onChange={this.props.handleChangeSubject(
                                    "subject"
                                  )}
                                  select
                                  value={this.props.values.subject}
                                  SelectProps={{}}
                                  InputProps={{ disableUnderline: true }}
                                  margin="normal"
                                  fullWidth
                                >
                                  {this.props.values.subjects.map(
                                    (option, index) => (
                                      <MenuItem key={index} value={option.id}>
                                        {option.name}
                                      </MenuItem>
                                    )
                                  )}
                                </TextField>
                              </span>
                            </li>
                          </div>
                        ) : this.props.values.EventGategorie===0 ? (
                          <div className="col-sm-12">
                            <li className="media">
                              <i className="zmdi zmdi-accounts zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                              <span className="media-body">
                                <TextField
                                  required
                                  type="text"
                                  id="eventName"
                                  name="eventName"
                                  label={
                                    <IntlMessages id="components.event.name.text" />
                                  }
                                  value={this.props.values.eventName}
                                  onChange={this.props.handleChangeFields(
                                    "eventName"
                                  )}
                                  margin="normal"
                                  fullWidth
                                />
                              </span>
                            </li>
                          </div>
                        ) : (
                            <div className="col-sm-6">
                              <li className="media">
                                <i className="zmdi zmdi-accounts zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                                <span className="media-body">
                                  <TextField
                                    required
                                    type="text"
                                    id="eventName"
                                    name="eventName"
                                    label={
                                      <IntlMessages id="components.event.name.text" />
                                    }
                                    value={this.props.values.eventName}
                                    onChange={this.props.handleChangeFields(
                                      "eventName"
                                    )}
                                    margin="normal"
                                    fullWidth
                                  />
                                </span>
                              </li>
                            </div>
                          )}
                    </div>
                    {this.props.values.eventType !== "schoolVacation" &&
                      this.props.values.eventType !== "holidays" ? (
                        <div className="row">
                          <div className="col-sm-6">
                            <li className="media">
                              <i className="zmdi zmdi-accounts-list-alt zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                              <span className="media-body">
                                <TextField
                                  required
                                  name="professorId"
                                  id="professorId"
                                  label={<IntlMessages id="pages.professorPage" />}
                                  onChange={this.props.handleChangeFieldsProfessor(
                                    "professorId"
                                  )}
                                  select
                                  InputProps={{ disableUnderline: true }}
                                  value={this.props.values.professorId}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth
                                >

                                  {!_.isEmpty(this.props.values.professor) ? (
                                    this.props.values.professor.map(
                                      (option, index) => (
                                        <MenuItem
                                          key={index}
                                          value={option.profile.professors[0].id}
                                        >
                                          {option.profile.user.name}{" "}
                                          {option.profile.user.surname}
                                        </MenuItem>
                                      )
                                    )
                                  ) : (
                                      <MenuItem><IntlMessages id="empty.list" /></MenuItem>
                                    )}
                                </TextField>
                              </span>
                            </li>
                          </div>
                          <div className="col-sm-6">
                            <li className="media">
                              <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                              <span className="media-body">

                                <TextField
                                  required
                                  id="room"
                                  name="room"

                                  label={<IntlMessages id="sidebar.rooms" />}
                                  onChange={this.props.handleChangeFieldsRoom("room")}
                                  select
                                  InputProps={{ disableUnderline: true }}
                                  value={this.props.values.room}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth
                                  size="small"
                                >

                                  {this.props.rooms.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </span>
                            </li>
                          </div>{" "}
                        </div>
                      ) : null}
                    <li className="media">
                      <i className="zmdi zmdi-info zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                      <span className="media-body">
                        {" "}
                        <IntlMessages id="components.event.with.class" /> :
                        {this.props.values.eventType==="schoolVacation" ||
                          this.props.values.eventType==="holidays" ? (
                            <IntlMessages id="components.event.with.class.all" />
                          ) : (
                            this.props.values.classe.name
                          )}
                      </span>
                    </li>
                  </ul>
                  <br />
                  <div className="d-flex flex-wrap justify-content-end ">
                    <Button
                      variant="contained"
                      onClick={this.props.handleToggle}
                      style={{
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        width: "30%",
                        height: "20%",
                      }}
                    >
                      {
                        <IntlMessages id="components.establishments.formadd.buttonCancel" />
                      }
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      disabled={this.props.values.nameError}
                      variant="contained"
                      style={{
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        width: "30%",
                        height: "6%",
                      }}
                      className=" bg-indigo text-white "
                      type="submit"
                    >
                      <IntlMessages id="components.classes.formadd.buttonAdd" />
                    </Button>
                  </div>{" "}
                </div>
              </form>
            </ModalBody>
          </Modal>
        </MuiPickersUtilsProvider>
      </Auxiliary>
    );
  }
}

export default AddLesson;
