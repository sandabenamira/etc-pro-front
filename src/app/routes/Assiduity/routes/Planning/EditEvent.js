import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../util/Auxiliary';
import MomentUtils from '@date-io/moment';
import _ from 'lodash';
import moment from 'moment';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import Dialog from '@material-ui/core/Dialog';

import { TimePicker, DatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FormHelperText from '@material-ui/core/FormHelperText';
import { UncontrolledAlert } from 'reactstrap';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    // console.log('----this.props.values.startHours-------',this.props.values.startHours);
    // console.log('----this.props.values.endHours-------',this.props.values.endHours);

    return (
      <Auxiliary>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Dialog
            fullScreen
            open={this.props.modal}
            onClose={this.props.handleToggle}
            TransitionComponent={Transition}
          >
            <AppBar className="position-relative">
              <Toolbar>
                <IconButton onClick={this.props.handleToggle} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  style={{
                    flex: 1,
                  }}
                ></Typography>
              </Toolbar>
            </AppBar>
            <br />
            <br />

            <form onSubmit={(e) => this.props.handleEditConfirmation(e)}>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-between">
                  <div className="p-2 bd-highlight">
                    <div className="d-flex flex-row mb-4 ml-5">
                      <div className="p-2 bd-highlight">
                        {this.props.values.EventGategorie===1 ? (
                          <Nav className="jr-tabs-pills-ctr" pills>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.props.values.eventType === 'lesson',
                                })}
                                onClick={() => {
                                  this.props.toggle('lesson');
                                }}
                              >
                                <IntlMessages id="eventType.lesson" />
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.props.values.eventType === 'exam',
                                })}
                                onClick={() => {
                                  this.props.toggle('exam');
                                }}
                              >
                                <IntlMessages id="components.note.exam" />
                              </NavLink>
                            </NavItem>

                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.props.values.eventType === 'event',
                                })}
                                onClick={() => {
                                  this.props.toggle('event');
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
                                  active: this.props.values.eventType === 'holidays',
                                })}
                                onClick={() => {
                                  this.props.toggle('holidays');
                                }}
                              >
                                <IntlMessages id="components.event.freeday" />
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.props.values.eventType === 'schoolVacation',
                                })}
                                onClick={() => {
                                  this.props.toggle('schoolVacation');
                                }}
                              >
                                <IntlMessages id="components.event.vacance" />
                              </NavLink>
                            </NavItem>
                          </Nav>
                        )}
                      </div>

                      <div className="ml-5 bd-highlight">
                        <Button
                          disabled={this.props.values.nameError}
                          variant="contained"
                          className=" bg-indigo text-white "
                          type="submit"
                        >
                          <IntlMessages id="note.button.save" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column  ">
                <ul className="contact-list list-unstyled">
                  <li className="media">
                    <div className="d-flex flex-row ml-5">
                      <i className="zmdi zmdi-alarm zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                      {this.props.values.eventType != 'schoolVacation' &&
                      this.props.values.eventType != 'holidays' ? (
                        <div className="d-flex flex-row ml-3">
                          <div className="p-2 bd-highlight">
                            <DatePicker
                              id="dateEvent"
                              label={
                                <IntlMessages id="components.establishments.formadd.jour.sceances" />
                              }
                              fullWidth
                              value={this.props.values.startHours}
                              onChange={this.props.handleDateChange}
                              animateYearScrolling={false}
                              format="dddd   DD"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <i className="zmdi zmdi-alarm" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                          <div className="p-2 bd-highlight">
                            <TimePicker
                              id="startHours"
                              label={
                                <IntlMessages id="components.establishments.formadd.date.debut.sceances" />
                              }
                              fullWidth
                              value={this.props.values.startHours}
                              onChange={this.props.handleDateStartChange}
                              ampm={false}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <i className="zmdi zmdi-alarm" />
                                  </InputAdornment>
                                ),
                              }}
                            />

                            <FormHelperText error={!this.props.values.startHourEventError}>
                              {!this.props.values.startHourEventError ? (
                                <IntlMessages id="start.hour.check" />
                              ) : (
                                ''
                              )}
                            </FormHelperText>
                          </div>
                          <div className="p-2 bd-highlight">
                            <TimePicker
                              id="endHours"
                              label={
                                <IntlMessages id="components.establishments.formadd.date.fin.sceances" />
                              }
                              fullWidth
                              value={this.props.values.endHours}
                              onChange={this.props.handleDateEndChange}
                              ampm={false}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <i className="zmdi zmdi-alarm" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <FormHelperText error={!this.props.values.endHourEventError}>
                              {!this.props.values.endHourEventError ? (
                                <IntlMessages id="end.hour.check" />
                              ) : (
                                ''
                              )}
                            </FormHelperText>
                          </div>
                        </div>
                      ) : this.props.values.eventType==='schoolVacation' ? (
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
                              <FormHelperText error={!this.props.values.startTimeEventError}>
                                {!this.props.values.startTimeEventError ? (
                                  <IntlMessages id="check.date.start" />
                                ) : (
                                  ''
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

                              <FormHelperText error={!this.props.values.endTimeEventError}>
                                {!this.props.values.endTimeEventError ? (
                                  <IntlMessages id="check.date.end" />
                                ) : (
                                  ''
                                )}
                              </FormHelperText>
                            </div>
                          </div>
                        </div>
                      ) : this.props.values.eventType==='holidays' ? (
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
                  <li className="media">
                    <div className="d-flex flex-row ml-5">
                      {this.props.values.checkEventEdit ? (
                        <UncontrolledAlert className="alert-addon-card bg-success bg-danger text-white shadow-lg">
                          <span className="icon-addon alert-addon">
                            <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                          </span>
                          <span className="d-inline-block">
                            {' '}
                            il y a une autre séance pour ce proffesseur dans cet intervalle
                          </span>
                        </UncontrolledAlert>
                      ) : (
                        ''
                      )}
                    </div>
                  </li>
                  <li className="media ">
                    <div className="d-flex flex-row ml-5">
                      {this.props.values.eventType != 'schoolVacation' &&
                      this.props.values.eventType != 'holidays' ? (
                        <>
                          <i className="zmdi zmdi-graphic-eq zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                          <div className="p-2 bd-highlight">
                            <span className="media-body ">
                              <TextField
                                required
                                label={<IntlMessages id="calandar.popup.details.frequency" />}
                                id="frequencyID"
                                onChange={this.props.handleChangeFields('frequencyID')}
                                select
                                value={
                                  this.props.values.frequencyID != ''
                                    ? this.props.values.frequencyID
                                    : ''
                                }
                                disabled
                                SelectProps={{}}
                                InputProps={{ disableUnderline: true }}
                                margin="normal"
                                fullWidth
                              >
                                {this.props.values.frequency.map((option, index) => (
                                  <MenuItem key={index} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </span>
                          </div>
                        </>
                      ) : null}

                      {this.props.values.eventType === 'lesson' ||
                      this.props.values.eventType === 'exam' ? (
                        <div className="p-2 bd-highlight">
                          <li className="media">
                            <i className="zmdi zmdi-accounts zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                            <span className="media-body">
                              <TextField
                                label={<IntlMessages id="sidebar.components.lesson" />}
                                required
                                id="subject"
                                onChange={this.props.handleChangeSubject('subject')}
                                select
                                value={this.props.values.subject}
                                SelectProps={{}}
                                InputProps={{ disableUnderline: true }}
                                margin="normal"
                                fullWidth
                              >
                                {this.props.values.subjects.map((option, index) => (
                                  <MenuItem key={index} value={option.id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </span>
                          </li>
                        </div>
                      ) : this.props.values.EventGategorie===0 ? (
                        <div className="p-2 bd-highlight">
                          <li className="media">
                            <i className="zmdi zmdi-accounts zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                            <span className="media-body">
                              <TextField
                                required
                                type="text"
                                id="eventName"
                                name="eventName"
                                label={<IntlMessages id="components.event.name.text" />}
                                value={this.props.values.eventName}
                                onChange={this.props.handleChangeFields('eventName')}
                                margin="normal"
                                fullWidth
                              />
                            </span>
                          </li>
                        </div>
                      ) : (
                        <div className="p-2 bd-highlight">
                          <li className="media">
                            <i className="zmdi zmdi-accounts zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                            <span className="media-body">
                              <TextField
                                required
                                type="text"
                                id="eventName"
                                name="eventName"
                                label={<IntlMessages id="components.event.name.text" />}
                                value={this.props.values.eventName}
                                onChange={this.props.handleChangeFields('eventName')}
                                margin="normal"
                                fullWidth
                              />
                            </span>
                          </li>
                        </div>
                      )}
                    </div>
                  </li>
                  <li className="media">
                    <div className="d-flex flex-row ml-5">
                      {this.props.values.eventType !== 'schoolVacation' &&
                      this.props.values.eventType !== 'holidays' ? (
                        <>
                          <i className="zmdi zmdi-accounts-list-alt zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                          <div className="d-flex flex-row ml-3">
                            <div className="p-2 bd-highlight">
                              <span className="media-body">
                                <TextField
                                  required
                                  name="professorId"
                                  id="professorId"
                                  label={<IntlMessages id="pages.professorPage" />}
                                  onChange={this.props.handleChangeFieldsProfessor('professorId')}
                                  select
                                  InputProps={{ disableUnderline: true }}
                                  value={this.props.values.professorId}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth
                                >
                                  {!_.isEmpty(this.props.values.professor) ? (
                                    this.props.values.professor.map((option, index) => (
                                      <MenuItem key={index} value={option.profile.professors[0].id}>
                                        {option.profile.user.name} {option.profile.user.surname}
                                      </MenuItem>
                                    ))
                                  ) : (
                                    <MenuItem>
                                      <IntlMessages id="empty.list" />
                                    </MenuItem>
                                  )}
                                </TextField>
                              </span>
                            </div>
                            <div className="p-2 bd-highlight">
                              <li className="media">
                                <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                                <span className="media-body">
                                  <TextField
                                    required
                                    id="room"
                                    name="room"
                                    label={<IntlMessages id="sidebar.rooms" />}
                                    onChange={this.props.handleChangeFieldsRoom('room')}
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
                            </div>{' '}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </li>

                  <li className="media">
                    <div className="d-flex flex-row ml-5">
                      <i className="zmdi zmdi-info zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                      <span className="media-body">
                        <div className="d-flex flex-row ml-3">
                          <IntlMessages id="components.event.with.class" /> :{' '}
                          {this.props.values.eventType==='schoolVacation' ||
                          this.props.values.eventType==='holidays' ? (
                            <IntlMessages id="components.event.with.class.all" />
                          ) : (
                            this.props.values.classe.name
                          )}
                        </div>
                      </span>
                    </div>
                  </li>
                </ul>
                <br />
              </div>
            </form>
          </Dialog>
        </MuiPickersUtilsProvider>
      </Auxiliary>
    );
  }
}

export default EditEvent;
