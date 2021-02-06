import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Auxiliary from '../../../../../util/Auxiliary';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { connect } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import AddBox from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import WcIcon from '@material-ui/icons/Wc';
import { Radio } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import RemoveIcon from '@material-ui/icons/Remove';
import MuiPhoneNumber from 'material-ui-phone-number';
import { isEmail } from '../../../../../constants/validationFunctions';
import moment from 'moment';
import PhotoIcon from '@material-ui/icons/Photo';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from '../../../../../config/config';
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

class EditUsers extends React.Component {
  constructor(props) {
    super(props);
  }
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }

    return res;
  };
  render() {
    const { values, usefulData } = this.props;

    return (
      <Auxiliary>
        <Modal isOpen={this.props.values.openEdit}>
          <ModalHeader
            toggle={this.props.handleToggle}
            className="modal-box-header bg-primary text-white"
          >
            Modifier un utilisateur
          </ModalHeader>
          <ModalBody>
            <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-wrap align-items-start">
              <form
                className="d-flex  flex-wrap col-lg-12 col-md-12 col-sm-12 p-4"
                autoComplete="off"
                onSubmit={this.props.handleSubmitEdit}
              >
                {this.props.values.openEdit ? (
                  <>
                    <div className=" d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center">
                      <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                          required
                        >
                          {<IntlMessages id="role.user" />}
                        </InputLabel>
                        <Select
                          required
                          isDisabled
                          options={usefulData.listRoles}
                          value={values.roleItemEdit}
                          id="role"
                          name="role"
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
                      <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                          required
                        >
                          {<IntlMessages id="school.year.user" />}
                        </InputLabel>
                        <Select
                          options={usefulData.listSchoolYears}
                          isDisabled
                          value={values.schoolyearEdit}
                          id="role"
                          name="role"
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
                      {this.props.userProfile.role_id === roleIdSuperAdmin ? (
                        <>
                          <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                            <InputLabel
                              htmlFor="nomSelect"
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                              }}
                              required
                            >
                              {<IntlMessages id="user.establishment" />}
                            </InputLabel>
                            <Select
                              options={usefulData.establishmentsList}
                              // onChange={this.props.handleChangeEstablishments}
                              values={values.establishmentEdit}
                              id="role"
                              name="role"
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
                        </>
                      ) : (
                        ''
                      )}
                      {values.roleItemEdit.id === roleIdStudent ? (
                        <>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0 "> </div>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0 "> </div>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-1">
                            <InputLabel
                              htmlFor="nomSelect"
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                              }}
                            >
                              {<IntlMessages id="parent.couplage.user" />}
                            </InputLabel>
                            <Select
                              options={usefulData.parentsList}
                              onChange={this.props.handleChangeParent}
                              defaultValue={values.listParentEdit}
                              isMulti
                              id="role"
                              name="role"
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
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                            <InputLabel
                              htmlFor="nomSelect"
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                              }}
                              required
                            >
                              {<IntlMessages id="classe.couplage.user" />}
                            </InputLabel>
                            <Select
                              options={usefulData.classForStudent}
                              onChange={this.props.handleChangeStudentClass}
                              value={values.studentClassEdit}
                              id="nomSelect"
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
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                            <InputLabel
                              htmlFor="group"
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                              }}
                              required
                            >
                              {<IntlMessages id="assignment.student.group" />}
                            </InputLabel>
                            <Select
                              value={values.studentGroupEdit}
                              options={values.listGroupClass}
                              onChange={this.props.handleChangeGroupClassRoom}
                              id="group"
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
                        </>
                      ) : (
                        ''
                      )}
                      {values.roleItemEdit.id === roleIdProfessor ? (
                        <>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0 "> </div>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0 "> </div>
                        </>
                      ) : (
                        ''
                      )}
                      {values.roleItemEdit.id === roleIdProfessor ? (
                        <>
                          {values.listOfSubjectsEdit.map((objSubject, index) => (
                            <div className="col-md-6 col-lg-12 col-sm-12 d-flex flex-row justify-content-between p-3">
                              <div className="col-md-6 col-lg-4 col-sm-12 p-0 ">
                                <InputLabel
                                  htmlFor="nomSelect"
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                  }}
                                  required
                                >
                                  {<IntlMessages id="prof.couplage.class" />}
                                </InputLabel>
                                <Select
                                  options={usefulData.classRoomList}
                                  onChange={(e) =>
                                    this.props.handleChangeClassRoom(e, 'classId', index)
                                  }
                                  value={
                                    usefulData.classRoomList.find(
                                      (element) => element.id == objSubject.classId
                                    ) == undefined
                                      ? {}
                                      : usefulData.classRoomList.find(
                                          (element) => element.id == objSubject.classId
                                        )
                                  }
                                  id="classId"
                                  name="classId"
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
                              <div className="col-md-6 col-lg-4 col-sm-12 p-0">
                                <InputLabel
                                  htmlFor="nomSelect"
                                  style={{
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                  }}
                                  required
                                >
                                  {<IntlMessages id="prof.couplage.subjects" />}
                                </InputLabel>
                                <Select
                                  options={objSubject.subjects}
                                  options={objSubject.subjects.filter(
                                    (element) => !values.subjectIdSelected.includes(element.id)
                                  )}
                                  onChange={(e) =>
                                    this.props.handleChangeClassRoom(e, 'subjectId', index)
                                  }
                                  value={
                                    objSubject.subjects.find(
                                      (element) => element.id == objSubject.subjectId
                                    ) == undefined
                                      ? {}
                                      : objSubject.subjects.find(
                                          (element) => element.id == objSubject.subjectId
                                        )
                                  }
                                  id="subjectId"
                                  name="subjectId"
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
                              <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                                <Fab
                                  size="small"
                                  value={`${index}`}
                                  color="primary"
                                  aria-label="Add"
                                  onClick={() => {
                                    if (!objSubject.isAdded) {
                                      if (objSubject.subjectId != 0) {
                                        this.props.addNewSubject(index + 1);
                                      } else {
                                      }
                                    } else {
                                      this.props.deleteChoice(index);
                                    }
                                  }}
                                >
                                  {objSubject.isAdded ? <RemoveIcon /> : <AddIcon />}
                                </Fab>
                              </div>
                              <div className="col-md-6 col-lg-3 col-sm-12 p-0"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        ''
                      )}
                      {values.roleItemEdit.id === roleIdParent ? (
                        <>
                          <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                            <InputLabel
                              htmlFor="nomSelect"
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                              }}
                            >
                              {<IntlMessages id="parent.couplage.student" />}
                            </InputLabel>
                            <Select
                              isMulti
                              options={usefulData.studentsList}
                              onChange={this.props.handleChangeStudent}
                              defaultValue={values.listStudentEdit}
                              // value={values.listStudentEdit[0]}
                              id="studentIdAssignement"
                              name="studentIdAssignement"
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
                        </>
                      ) : (
                        ''
                      )}
                      {values.roleItemEdit.id === roleIdSupervisor ? (
                        <div className="col-md-6 col-lg-3 col-sm-12 p-0">
                          <InputLabel
                            htmlFor="nomSelect"
                            style={{
                              fontFamily: 'Roboto',
                              fontSize: '18px',
                            }}
                          >
                            {<IntlMessages id="vie.scolaire.fonction" />}
                          </InputLabel>
                          <Select
                            options={this.props.fonctionList}
                            onChange={this.props.handleChangeFunctions}
                            value={values.fonctionEdit}
                            id="function"
                            name="function"
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
                      ) : (
                        ''
                      )}
                      <hr
                        style={{
                          width: '100%',
                          margin: 'auto',
                          marginTop: '40px',
                          marginBottom: '10px',
                          border: '1px dashed #979A9A',
                          paddingLeft: '-100%',
                        }}
                      />
                    </div>

                    <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center pt-3">
                      <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                          required
                        >
                          {<IntlMessages id="user.name" />}
                        </InputLabel>
                        <TextField
                          required
                          id="userName"
                          name="userName"
                          value={values.userNameEdit || ''}
                          onChange={this.props.handleChange('userNameEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                          required
                        >
                          {<IntlMessages id="user.last.name" />}
                        </InputLabel>
                        <TextField
                          required
                          id="userLastName"
                          name="userLastName"
                          value={values.userLastNameEdit || ''}
                          onChange={this.props.handleChange('userLastNameEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 p-0 d-flex justify-content-center">
                        <div className="col-md-2 p-1 d-flex justify-content-center align-items-end ">
                          <Radio
                            checked={values.userGenderEdit == 'Male'}
                            onChange={this.props.handleChange('userGenderEdit')}
                            value="Male"
                            color="primary"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'D' }}
                          />
                          <WcIcon color="primary" style={{ fontSize: 60 }} />
                          <Radio
                            checked={values.userGenderEdit == 'Female'}
                            onChange={this.props.handleChange('userGenderEdit')}
                            value="Female"
                            color="primary"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'D' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 p-2">
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
                                required={values.roleItemEdit.id === roleIdStudent}
                              >
                                {<IntlMessages id="user.birthday.date" />}
                              </InputLabel>
                            }
                            clearable
                            fullWidth
                            id="birthdayDate"
                            name="birthdayDate"
                            value={values.birthdayDateEdit}
                            onChange={this.props.handleChangeBirthdayDate}
                            format="DD-MM-YYYY"
                            autoOk
                            style={{
                              marginTop: '4px',
                            }}
                            maxDate={moment().year() - 6 + '-01-01'}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 p-2">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-16px',
                            width: '300px',
                          }}
                        >
                          {<IntlMessages id="user.birthday.place" />}
                        </InputLabel>
                        <TextField
                          id="birthdayPlace"
                          name="birthdayPlace"
                          value={values.birthdayPlaceEdit || ''}
                          onChange={this.props.handleChange('birthdayPlaceEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center pt-3">
                      <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                          required={values.roleItemEdit.id === roleIdStudent}
                        >
                          {<IntlMessages id="user.nationality" />}
                        </InputLabel>
                        <TextField
                          required={values.roleItemEdit.id === roleIdStudent}
                          id="userNationnality"
                          name="userNationnality"
                          value={values.userNationnalityEdit || ''}
                          onChange={this.props.handleChange('userNationnalityEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>

                      <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                          required
                        >
                          {<IntlMessages id="user.mail" />}
                        </InputLabel>
                        <TextField
                          required
                          error={isEmail(values.userMailEdit) === false ? true : false}
                          id="userMail"
                          name="userMail"
                          value={values.userMailEdit || ''}
                          onChange={this.props.handleChange('userMailEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                          helperText={
                            isEmail(values.userMailEdit) === false ? (
                              <IntlMessages id="error.user.message.mail" />
                            ) : (
                              ''
                            )
                          }
                        />
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                        <MuiPhoneNumber
                          error={
                            this.isValidphoneNumber(values.userPhoneNumberEdit) === true ||
                            values.userPhoneNumberEdit.length === 0
                              ? false
                              : true
                          }
                          id="userPhoneNumber"
                          name="userPhoneNumber"
                          value={values.userPhoneNumberEdit}
                          onChange={this.props.handleChangePhone}
                          fullWidth={true}
                          label={<IntlMessages id="user.phone.number" />}
                          placeholder="(+XXX) XXX XXX XXX"
                          helperText={
                            this.isValidphoneNumber(values.userPhoneNumberEdit) === true ||
                            values.userPhoneNumberEdit.length === 0 ? (
                              ''
                            ) : (
                              <IntlMessages id="error.user.message.phone" />
                            )
                          }
                        />
                      </div>
                      {this.props.values.roleId !== roleIdStudent ? (
                        <>
                          <div className="col-md-6 col-lg-2 col-sm-12 p-1">
                            <InputLabel
                              style={{
                                fontFamily: 'Roboto',
                                fontSize: '18px',
                                marginTop: '-2%',
                              }}
                            >
                              {<IntlMessages id="user.cin" />}
                            </InputLabel>
                            <TextField
                              id="userCIN"
                              id="userCIN"
                              name="userCIN"
                              type="number"
                              value={values.userCinEdit || ''}
                              onChange={this.props.handleChange('userCinEdit')}
                              style={{
                                marginTop: '3%',
                              }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                      <div className="col-md-6 col-lg-2 col-sm-12 d-flex flex-row p-1">
                        <input
                          type="file"
                          className="d-none"
                          accept="image/png, image/jpeg,image/bmp"
                          id="add-photo"
                          onChange={(e) => this.props.uploadPhoto(e)}
                        />
                        <label htmlFor="add-photo" className="d-flex  bd-highlight">
                          <AddBox fontSize="inherit" style={{ fontSize: '40px' }} />
                        </label>
                        <div className="p-2 bd-highlight">
                          <Typography
                            variant="h6"
                            style={{
                              color: 'grey',
                              fontWeight: 'normal',
                            }}
                          >
                            <IntlMessages id="user.join.photo" />
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap justify-content-around align-items-center pt-3">
                      <div className="col-md-6 col-lg-2 col-sm-12 ">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                        >
                          {<IntlMessages id="user.id" />}
                        </InputLabel>
                        <TextField
                          id="userIdentifier"
                          name="userIdentifier"
                          value={values.userIdentifierEdit || ''}
                          onChange={this.props.handleChange('userIdentifierEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-3 col-sm-12 ">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                        >
                          {<IntlMessages id="user.address.postal" />}
                        </InputLabel>
                        <TextField
                          id="userAdress"
                          name="userAdress"
                          value={values.userAdressEdit || ''}
                          onChange={this.props.handleChange('userAdressEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 ">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                        >
                          {<IntlMessages id="zip.code.user" />}
                        </InputLabel>
                        <TextField
                          id="userZipCode"
                          name="userZipCode"
                          type="number"
                          value={values.userZipCodeEdit || ''}
                          onChange={this.props.handleChange('userZipCodeEdit')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-2 col-sm-12 ">
                        <InputLabel
                          htmlFor="nomSelect"
                          // style={{
                          //   fontFamily: 'Roboto',
                          //   fontSize: '18px',
                          // }}
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                        >
                          {<IntlMessages id="country.user" />}
                        </InputLabel>
                        <Select
                          options={usefulData.countriesList}
                          onChange={this.props.handleChangeCountries}
                          value={values.userCountryEdit}
                          id="userCountry"
                          name="userCountry"
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

                      {values.photoText != '' && (
                        <div className="col-md-6 col-lg-2 col-sm-12   d-flex ">
                          <div>
                            {' '}
                            <Typography
                              variant="h6"
                              style={{
                                color: '#3F51B5',
                                fontWeight: 'normal',
                                fontFamily: 'Roboto',
                                fontSize: '15px',
                                // marginTop: '10px',
                              }}
                            >
                              {values.photoText} &nbsp;
                            </Typography>
                          </div>
                          <PhotoIcon
                            style={{
                              fontSize: '30',
                            }}
                            color="primary"
                          />
                        </div>
                      )}
                      <div className="col-md-6 col-lg-1 col-sm-12 d-flex flex-row p-1"></div>
                    </div>
                    <hr
                      style={{
                        width: '100%',
                        margin: 'auto',
                        marginTop: '40px',
                        marginBottom: '10px',
                        border: '1px dashed #979A9A',
                        paddingLeft: '-100%',
                      }}
                    />
                    <div className="d-flex col-lg-12 col-md-12 col-sm-12 flex-row flex-wrap pt-3">
                      <div className="col-md-6 col-lg-4 col-sm-12 p-1">
                        <div className="d-flex flex-row justify-content-start align-items-center ">
                          <input
                            type="file"
                            className="d-none"
                            accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
                            id="add-file"
                            multiple
                            onChange={(e) => this.props.attachFile(e)}
                          />
                          <label htmlFor="add-file" className="d-flex  bd-highlight">
                            <CheckCircleIcon checked={true} color={'default'} />
                          </label>
                          <div className="p-2 bd-highlight">
                            <Typography
                              variant="h6"
                              style={{
                                color: 'grey',
                                fontWeight: 'normal',
                              }}
                            >
                              <IntlMessages id="user.join.papiers" />
                            </Typography>
                          </div>
                        </div>
                        <div className="bd-highlight" style={{ marginTop: '-40px' }}>
                          <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-4 ml-1 "></i>
                        </div>
                        <div className="d-flex flex-row bd-highlight ">
                          <div className="p-2 bd-highlight ">
                            <hr
                              style={{
                                height: '80%',
                                margin: 'auto',
                                marginTop: '5%',
                                marginBottom: '5%',
                                border: '1px dashed #979A9A',
                                paddingLeft: '-100%',
                              }}
                            />
                          </div>
                          <div className=" bd-highlight ">
                            <div className="d-flex flex-column bd-highlight mb-3">
                              {values.nameFiles.map((papier, index) => (
                                <div className=" bd-highlight " key={index}>
                                  {papier}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-8 col-sm-12 p-1">
                        <label>
                          <Typography
                            variant="h6"
                            style={{
                              color: 'grey',
                              fontWeight: 'normal',
                            }}
                          >
                            <IntlMessages id="inforamtions.user" />
                          </Typography>
                        </label>
                        <textarea
                          className="container"
                          id="usefulInformation"
                          name="usefulInformation"
                          rows="3"
                          value={values.usefulInformationEdit || ''}
                          onChange={this.props.handleChange('usefulInformationEdit')}
                          style={{
                            borderRadius: '20px',
                            marginTop: '10px',
                            width: '100%',
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-sm-12 col-md-12 d-flex flex-wrap flex-row justify-content-end pt-5">
                      <div className="p-1">
                        <Button
                          variant="contained"
                          className="bg-grey text-white pr-2 "
                          style={{
                            borderBottomLeftRadius: '16px',
                            borderBottomRightRadius: '16px',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                            width: '100px',
                            height: '30px',
                          }}
                          onClick={this.props.handleToggle}
                        >
                          {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                        </Button>
                      </div>
                      <div className="p-1">
                        <Button
                          // disabled={values.roleId ==="" || values.schoolyearId===""}
                          variant="contained"
                          style={{
                            borderBottomLeftRadius: '16px',
                            borderBottomRightRadius: '16px',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px',
                            width: '100px',
                            height: '30px',
                          }}
                          className=" bg-indigo text-white pr-2 "
                          type="submit"
                        >
                          <IntlMessages id="service.button.publish" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </form>
            </div>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

function mapStateToProps(state) {
  return {
    ClassSettings: state.ClassSettingsReducer.classSettings,
    usersReducer: state.usersReducer,
    userProfile: state.auth.userProfile,
    schoolYearEtabs: state.schoolYearEtab.remoteSchoolYearEtab,
  };
}

export default connect(mapStateToProps, {})(EditUsers);
