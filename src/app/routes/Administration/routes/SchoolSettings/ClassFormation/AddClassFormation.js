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
import _ from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class AddClassFormation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.validationClickStep1 = this.validationClickStep1.bind(this);
    this.validationClickStep2 = this.validationClickStep2.bind(this);
  }

  validationClickStep1() {
    if (this.props.values.nameClassFormation === '' && _.isEmpty(this.props.values.subjectSelected)===true) {
      return true;
    } else return false;
  }
  validationClickStep2() {
    if (this.props.values.agenceIds === [] && _.isEmpty(this.props.values.participantList)===true) {
      return true;
    } else return false;
  }
  render() {   /* eslint eqeqeq: "off" */
    const { values } = this.props;

    return (
      <div className="d-flex flex-column ">
        <div className="d-flex justify-content-start align-items-center">
          <h1>
            <b>Ajouter une classe de formation</b>
          </h1>
          &nbsp;&nbsp;&nbsp;
          <Fab size="small" color="primary" aria-label="Add" onClick={this.props.openAddModal}>
            {this.props.values.open ? <RemoveSharpIcon /> : <AddIcon />}
          </Fab>
        </div>
        <form autoComplete="off" onSubmit={this.props.handleSubmitStep3}>
          <br />
          {this.props.values.open ? (
            <>
              <div>
                <h3> Informations générales </h3>
              </div>
              <div className="d-flex flex-wrap flex-row mt-2">
                <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                  <InputLabel required htmlFor="name-class">
                    Nom
                  </InputLabel>
                  <TextField
                    disabled={values.step2}
                    id="nameClassFormation"
                    name="nameClassFormation"
                    value={values.nameClassFormation}
                    onChange={this.props.handleChangeName('nameClassFormation')}
                    style={{
                      marginTop: '2%',
                    }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                  <InputLabel required htmlFor="name-multiple">
                    Niveau
                  </InputLabel>
                  <Select
                    isDisabled={values.step2}
                    options={values.levelList}
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
                    isDisabled={values.step2}
                    options={values.subjectList}
                    onChange={this.props.handleChange('subjectId')}
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
                  />
                </div>
                <div className="col-md-6 col-lg-3 col-sm-12 p-2 ">
                  <InputLabel required htmlFor="name-multiple">
                    Formateur
                  </InputLabel>
                  <Select
                    isDisabled={values.step2}
                    options={values.professorList}
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
                  disabled={
                    // values.step2 &&
                    this.validationClickStep1()===true ? true : false
                  }
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
                  onClick={this.props.handleConfirmStep1}
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
                          isDisabled={values.step3}
                          options={values.agenceList.filter((element) => !values.agenceIds.includes(element.id))}
                          onChange={(e) => this.props.handleChangeParticipant(e, 'agence', index)}
                          value={objParticipants.agence}
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
                          isDisabled={values.step3}
                          value={objParticipants.participants}
                          options={values.studentsList.filter((element) => element.agenceId === objParticipants.agence.id)}
                          onChange={(e) => this.props.handleChangeParticipant(e, 'participants', index)}
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
                          disabled={values.step3}
                          size="small"
                          value={`${index}`}
                          color="primary"
                          aria-label="Add"
                          onClick={() => {
                            if (!objParticipants.isAdded) {
                              if (objParticipants.agence.id !== undefined && objParticipants.participants.length > 0) {
                                this.props.addNewListParticipant(index + 1);
                              } else {
                              }
                            } else {
                              this.props.deleteListParticipant(index);
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
                      disabled={
                        // values.step3 &&
                        this.validationClickStep2()===true ? true : false
                      }
                      variant="contained"
                      style={{
                        borderBottomLeftRadius: '16px',
                        borderBottomRightRadius: '16px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        width: '10%',
                        height: '6%',
                      }}
                      disabled={values.step3}
                      color="primary"
                      onClick={this.props.handleConfirmStep2}
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
                        checked={values.horaireList.length < 2}
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
                        checked={false}
                        checked={values.horaireList.length > 1}
                        value="Female"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'D' }}
                      />
                      <h3>Plusieurs séances</h3>{' '}
                    </div>
                  </div>
                  {values.horaireList.map((horaireItem, index) => (
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
                            value={horaireItem.dateFormation}
                            onChange={(e) => this.props.handleChangeHoraire(e, 'dateFormation', index)}
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
                            value={horaireItem.startHour}
                            showTabs={false}
                            onChange={(e) => this.props.handleChangeHoraire(e, 'startHour', index)}
                            ampm={false}
                            minDate={new Date()}
                            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                          />
                        </div>
                        <FormHelperText error={moment(horaireItem.startHour).isAfter(horaireItem.endHour)}>
                          {moment(horaireItem.startHour).isAfter(horaireItem.endHour) ? <IntlMessages id="start.hour.check" /> : ''}
                        </FormHelperText>
                      </div>
                      <div className="col-md-5 col-lg-2 col-sm-12 p-2 mt-1">
                        <div key="datetime_default" className="picker">
                          <TimePicker
                            required
                            label={<IntlMessages id="end.hour.class" />}
                            fullWidth
                            value={horaireItem.endHour}
                            showTabs={false}
                            onChange={(e) => this.props.handleChangeHoraire(e, 'endHour', index)}
                            ampm={false}
                            minDate={horaireItem.startHour}
                            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                          />
                        </div>
                        <FormHelperText error={moment(horaireItem.startHour).isAfter(horaireItem.endHour)}>
                          {moment(horaireItem.startHour).isAfter(horaireItem.endHour) ? <IntlMessages id="end.hour.check" /> : ''}
                        </FormHelperText>
                      </div>
                      <div className="col-md-5 col-lg-3 col-sm-12 p-2">
                        <InputLabel required htmlFor="name-multiple">
                          Lieu
                        </InputLabel>
                        <Select
                          options={values.roomsList}
                          onChange={(e) => this.props.handleChangeHoraire(e, 'room', index)}
                          value={horaireItem.room}
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
                          disabled={horaireItem.room.id === undefined}
                          onClick={() => {
                            if (!horaireItem.isAdded) {
                              // if (horaireItem.subjectId != 0) {
                              if (true) {
                                this.props.addNewHoraire(index + 1);
                              } else {
                              }
                            } else {
                              this.props.deleteHoraire(index);
                            }
                          }}
                        >
                          {horaireItem.isAdded ? <RemoveIcon /> : <AddIcon />}
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
                      'd-flex flex-row justify-content-end mt-3': this.props.settings.locale !== 'ar',
                      '': this.props.settings.locale==='ar',
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
                      {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
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
                      type="submit"
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings.locale,
  };
};
export default connect(mapStateToProps)(AddClassFormation);
