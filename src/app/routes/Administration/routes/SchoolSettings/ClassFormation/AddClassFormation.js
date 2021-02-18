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
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ClassNames from 'classnames';
import RemoveIcon from '@material-ui/icons/Remove';
import { Radio } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import DateFnsUtils from '@date-io/moment';
import { TimePicker } from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class AddClassFormation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { values } = this.props;
    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div className="d-flex flex-column ">
                  <div className="d-flex justify-content-start align-items-center">
                    <h1>
                      <b>Ajouter une classe de formation</b>
                    </h1>
                    &nbsp;&nbsp;&nbsp;
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Add"
                      onClick={this.props.openAddModal}
                    >
                      {this.props.values.open ? <RemoveSharpIcon /> : <AddIcon />}
                    </Fab>
                  </div>
                  <form autoComplete="off" onSubmit={this.props.handleSubmitStep3}>
                    <br />
                    {this.props.values.open ? (
                      <>
                        <div>
                          <h3>Informations générales </h3>
                        </div>
                        <div className="d-flex flex-wrap flex-row mt-2">
                          <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                            <InputLabel required htmlFor="name-class">
                              Nom
                            </InputLabel>
                            <TextField
                              id="nameClassFormation"
                              name="nameClassFormation"
                              // value={values.nameClassFormation || ''}
                              onChange={this.props.handleChangeName('nameClassFormation')}
                              style={{
                                marginTop: '2%',
                              }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                          </div>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                            <InputLabel required htmlFor="name-multiple">
                              Niveau
                            </InputLabel>
                            <Select
                              options={values.levelList}
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              onChange={this.props.handleChange('levelId')}
                              // isMulti
                              id="levelId"
                              name="levelId"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                            <InputLabel required htmlFor="name-multiple">
                              Formation
                            </InputLabel>
                            <Select
                              options={values.subjectList}
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              onChange={this.props.handleChange('subjectId')}
                              // isMulti
                              id="formation"
                              name="formation"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                            <InputLabel required htmlFor="name-multiple">
                              Formateur
                            </InputLabel>
                            <Select
                              options={values.professorList}
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              onChange={this.props.handleChange('profId')}
                              // isMulti
                              id="formateur"
                              name="formateur"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                        </div>
                        <div className="d-flex flex-row-reverse mt-2">
                          <Button
                            variant="contained"
                            style={{
                              borderBottomLeftRadius: '16px',
                              borderBottomRightRadius: '16px',
                              borderTopLeftRadius: '16px',
                              borderTopRightRadius: '16px',
                              width: '10%',
                              height: '6%',
                            }}
                            color="primary"
                            onClick={this.props.handleSubmitStep1}
                          >
                            suivant
                          </Button>
                        </div>
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '10px',
                            marginBottom: '10px',
                            border: '1px dashed #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                        {values.step2 && (
                          <>
                            <div className="d-flex  mt-2">
                              <h3>Informations sur les participants </h3>
                            </div>
                            {values.participantList.map((objParticipants, index) => (
                              <div className="d-flex flex-wrap flex-row mt-2">
                                <div className="col-md-5 col-lg-3 col-sm-12 p-2 ">
                                  <InputLabel required htmlFor="name-multiple">
                                    Agence
                                  </InputLabel>
                                  <Select
                                    options={values.agenceList}
                                    onChange={(e) =>
                                      this.props.handleChangeParticipant(e, 'agence', index)
                                    }
                                    value={objParticipants.agence}
                                    // options={this.props.subjectList.filter(
                                    //   (element) =>
                                    //     !this.props.values.subjectIDselected.includes(element.id)
                                    // )}
                                    id="level"
                                    name="level"
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: 'gray' }, // border style on hover
                                        border: '1px solid lightgray', // default border color
                                        boxShadow: 'none', // no box-shadow
                                        borderTopStyle: 'none',
                                        borderRightStyle: 'none',
                                        borderLeftStyle: 'none',
                                        borderRadius: ' none',
                                      }),
                                    }}
                                  />{' '}
                                </div>
                                <div className="col-md-5 col-lg-3 col-sm-12 p-2 ">
                                  <InputLabel required htmlFor="name-multiple">
                                    Collaborateurs
                                  </InputLabel>
                                  <Select
                                    options={values.studentsList}
                                    // options={this.props.subjectList.filter(
                                    //   (element) =>
                                    //     !this.props.values.subjectIDselected.includes(element.id)
                                    // )}
                                    onChange={(e) =>
                                      this.props.handleChangeParticipant(e, 'participants', index)
                                    }
                                    isMulti
                                    id="formation"
                                    name="formation"
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: 'gray' }, // border style on hover
                                        border: '1px solid lightgray', // default border color
                                        boxShadow: 'none', // no box-shadow
                                        borderTopStyle: 'none',
                                        borderRightStyle: 'none',
                                        borderLeftStyle: 'none',
                                        borderRadius: ' none',
                                      }),
                                    }}
                                  />{' '}
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-12 mt-3">
                                  <Fab
                                    size="small"
                                    value={`${index}`}
                                    color="primary"
                                    aria-label="Add"
                                    onClick={() => {
                                      if (!objParticipants.isAdded) {
                                        if (objParticipants.subjectId != 0) {
                                          this.props.addNewListParticipant(index + 1);
                                        } else {
                                        }
                                      } else {
                                        // this.props.deleteChoice(index);
                                      }
                                    }}
                                  >
                                    {objParticipants.isAdded ? <RemoveIcon /> : <AddIcon />}
                                  </Fab>
                                </div>
                                <div className="col-md-6 col-lg-3 col-sm-12 p-0"></div>
                              </div>
                            ))}
                            <div className="d-flex flex-row-reverse mt-2">
                              <Button
                                variant="contained"
                                style={{
                                  borderBottomLeftRadius: '16px',
                                  borderBottomRightRadius: '16px',
                                  borderTopLeftRadius: '16px',
                                  borderTopRightRadius: '16px',
                                  width: '10%',
                                  height: '6%',
                                }}
                                color="primary"
                                onClick={this.props.handleSubmitStep2}
                              >
                                suivant
                              </Button>
                            </div>
                            <hr
                              style={{
                                width: '100%',
                                margin: 'auto',
                                marginTop: '10px',
                                marginBottom: '10px',
                                border: '1px dashed #979A9A',
                                paddingLeft: '-100%',
                              }}
                            />
                          </>
                        )}
                        {values.step3 && (
                          <>
                            <div className="d-flex  mt-2">
                              <h3>Informations sur les horaires </h3>
                            </div>
                            <div className="d-flex flex-row mt-2">
                              <div className="col-md-5 col-lg-4 col-sm-12 p-2 d-flex flex-wrap flex-row  justify-content-center align-items-end  ">
                                <Radio
                                  // checked={values.userGender == 'Male'}
                                  // onChange={this.props.handleChange('userGender')}
                                  value="Male"
                                  color="primary"
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'D' }}
                                />
                                <h3>seule séance </h3>{' '}
                              </div>
                              <div className="col-md-5 col-lg-4 col-sm-12 p-2  d-flex flex-wrap flex-row justify-content-center align-items-end  ">
                                <Radio
                                  // checked={values.userGender == 'Female'}
                                  // onChange={this.props.handleChange('userGender')}
                                  value="Female"
                                  color="primary"
                                  name="radio-button-demo"
                                  inputProps={{ 'aria-label': 'D' }}
                                />
                                <h3>Plusieurs séances</h3>{' '}
                              </div>
                            </div>
                            {[1, 2, 3].map((objSubject, index) => (
                              <div className="d-flex flex-wrap flex-row mt-2">
                              <div className="col-md-6 col-lg-3 col-sm-12 p-2">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      label={
                                        <InputLabel
                                          style={{
                                            backgroundColor: 'white',
                                            fontFamily: 'Roboto',
                                            fontSize: '30px',
                                            marginTop: '-16px',
                                            width: '300px',
                                          }}
                                        >
                                         date
                                        </InputLabel>
                                      }
                                      clearable
                                      fullWidth
                                      id="birthdayDate"
                                      name="birthdayDate"
                                      // value={values.birthdayDate}
                                      // onChange={this.props.handleChangeBirthdayDate}
                                      format="DD-MM-YYYY"
                                      autoOk
                                      style={{
                                        marginTop: '4px',
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-md-6 col-lg-2 col-sm-12 p-2 mt-1">
                                  <div key="datetime_default" className="picker">
                                    <TimePicker
                                      required
                                      label={<IntlMessages id="start.hour.class" />}
                                      fullWidth
                                      // value={values.startTimeClass}
                                      showTabs={false}
                                      // onChange={handleStartTimeChange}
                                      ampm={false}
                                      minDate={new Date()}
                                      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                    />
                                  </div>
                                  <FormHelperText error={true}>
                                    {true ? <IntlMessages id="start.hour.check" /> : ''}
                                  </FormHelperText>
                                </div>
                                <div className="col-md-5 col-lg-2 col-sm-12 p-2 mt-1">
                                  <div key="datetime_default" className="picker">
                                    <TimePicker
                                      required
                                      label={<IntlMessages id="end.hour.class" />}
                                      fullWidth
                                      // value={values.startTimeClass}
                                      showTabs={false}
                                      // onChange={handleStartTimeChange}
                                      ampm={false}
                                      minDate={new Date()}
                                      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                    />
                                  </div>
                                  <FormHelperText error={true}>
                                    {true ? <IntlMessages id="end.hour.check" /> : ''}
                                  </FormHelperText>
                                </div>
                                <div className="col-md-5 col-lg-3 col-sm-12 p-2">
                                  <InputLabel required htmlFor="name-multiple">
                                    Lieu
                                  </InputLabel>
                                  <Select
                                    // options={this.props.subjectList.filter(
                                    //   (element) =>
                                    //     !this.props.values.subjectIDselected.includes(element.id)
                                    // )}
                                    // onChange={this.props.handleChangeSubject}
                                    // isMulti
                                    id="formation"
                                    name="formation"
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: 'gray' }, // border style on hover
                                        border: '1px solid lightgray', // default border color
                                        boxShadow: 'none', // no box-shadow
                                        borderTopStyle: 'none',
                                        borderRightStyle: 'none',
                                        borderLeftStyle: 'none',
                                        borderRadius: ' none',
                                      }),
                                    }}
                                  />{' '}
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-12 mt-3">
                                  <Fab
                                    size="small"
                                    value={`${index}`}
                                    color="primary"
                                    aria-label="Add"
                                    // onClick={() => {
                                    //   if (!objSubject.isAdded) {
                                    //     if (objSubject.subjectId != 0) {
                                    //       this.props.addNewSubject(index + 1);
                                    //     } else {
                                    //     }
                                    //   } else {
                                    //     this.props.deleteChoice(index);
                                    //   }
                                    // }}
                                  >
                                    {objSubject.isAdded ? <RemoveIcon /> : <AddIcon />}
                                  </Fab>
                                </div>
                                <div className="col-md-6 col-lg-3 col-sm-12 p-0"></div>
                              </div>
                            ))}
                            <hr
                              style={{
                                width: '100%',
                                margin: 'auto',
                                marginTop: '10px',
                                marginBottom: '10px',
                                border: '1px dashed #979A9A',
                                paddingLeft: '-100%',
                              }}
                            />
                            <div
                              className={ClassNames({
                                'd-flex flex-row justify-content-end mt-3':
                                  this.props.settings.locale !== 'ar',
                                '': this.props.settings.locale == 'ar',
                              })}
                            >
                              <Button
                                variant="contained"
                                onClick={this.props.handleCancel}
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
                                style={{
                                  borderBottomLeftRadius: '16px',
                                  borderBottomRightRadius: '16px',
                                  borderTopLeftRadius: '16px',
                                  borderTopRightRadius: '16px',
                                  width: '10%',
                                  height: '6%',
                                }}
                                color="primary"
                              >
                                <IntlMessages id="service.button.publish" />
                              </Button>
                            </div>{' '}
                          </>
                        )}
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
const mapStateToProps = (state) => {
  return {
    settings: state.settings.locale,
  };
};
export default connect(mapStateToProps)(AddClassFormation);
