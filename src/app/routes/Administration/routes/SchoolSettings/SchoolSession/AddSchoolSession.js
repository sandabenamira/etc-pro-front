import React from 'react';
import IntlMessages from '../../../../../../util/IntlMessages';
import CardBox from '../../../../../../components/CardBox/index';
import Can from '../../../../../../can';
import { RoleContext } from '../../../../../../Context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import { connect } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import MenuItem from '@material-ui/core/MenuItem';
const schoolSessionList = [
  {
    value: 'Trimestre 1',
    id: 1,
  },
  {
    value: 'Trimestre 2',
    id: 2,
  },
  {
    value: 'Trimestre 3',
    id: 3,
  },
  {
    value: 'Semestre 1',
    id: 4,
  },
  {
    value: 'Semestre 2',
    id: 5,
  },
];
class AddSchoolSession extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div>
                  <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                    <div className="d-flex justify-content-start align-items-center">
                      <h1>
                        <b>
                          <IntlMessages id="new.School.Session" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.props.openAddModal}
                      >
                        {this.props.values.isOpen ? <RemoveSharpIcon /> : <AddIcon />}
                      </Fab>
                    </div>
                    <br />
                    {this.props.values.isOpen ? (
                      <>
                        {' '}
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="col-md-6 mb-5  ">
                                <TextField
                                  required
                                  id="nameSchoolSession"
                                  label={
                                    <IntlMessages id="sidebar.components.sessionSchool" />
                                  }
                                  select
                                  value={this.props.values.nameSchoolSession}
                                  onChange={this.props.handleChange(
                                    'nameSchoolSession'
                                  )}
                                  margin="normal"
                                  fullWidth
                                >
                                  {schoolSessionList.map((schoolSession) => (
                                    <MenuItem
                                      key={schoolSession.id}
                                      value={schoolSession.value}
                                    >
                                      {schoolSession.value}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                              <div className="col-md-6 mb-5  ">
                                <TextField
                                  required
                                  select
                                  id="nameSchoolSession"
                                  label={
                                    <IntlMessages id="sidebar.components.typeOfEducation" />
                                  }
                                  value={JSON.stringify(
                                    this.props.values.educationItem
                                  )}
                                  onChange={this.props.handleChangeEducationType(
                                    'educationTypeId'
                                  )}
                                  margin="normal"
                                  fullWidth
                                >
                                  {this.props.educationTypes.map(
                                    (educationType) => {
                                      let data = educationType;

                                      return (
                                        <MenuItem
                                          key={educationType.id}
                                          value={JSON.stringify(data)}
                                        >
                                          {data.name}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </TextField>
                              </div>
                              <div className="col-md-6   ">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    helperText={
                                      <IntlMessages id="components.class.formadd.startdate" />
                                    }
                                    clearable
                                    fullWidth
                                    id="start_date"
                                    name="start_date"
                                    value={this.props.values.start_date}
                                    onChange={this.props.handleChangeStartDate}
                                    format="DD-MM-YYYY"
                                    autoOk
                                   />
                                </MuiPickersUtilsProvider>
                              </div>

                              <div className="col-md-6   ">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    helperText={
                                      <IntlMessages id="components.class.formadd.enddate" />
                                    }
                                    clearable
                                    fullWidth
                                    id="end_date"
                                    name="end_date"
                                    value={this.props.values.end_date}
                                    onChange={this.props.handleChangeEndDate}
                                    format="DD-MM-YYYY"
                                    autoOk
                                    minDate={this.props.values.start_date+1}
                                  />
                                </MuiPickersUtilsProvider>
                              </div>
                            </div>
                          </div>
                        </CardBox>
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.openAddModal}
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '10%',
                              height: '20%',
                            }}
                          >
                            {
                              <IntlMessages id="components.establishments.formadd.buttonCancel" />
                            }
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            disabled={
                              this.props.values.end_date == null ||
                              this.props.values.start_date == null ||
                              this.props.values.nameSchoolSession == ''
                                ? true
                                : false
                            }
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '10%',
                              height: '6%',
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="service.button.publish" />
                          </Button>
                        </div>{' '}
                      </>
                    ) : (
                      ''
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

export default connect()(AddSchoolSession);
