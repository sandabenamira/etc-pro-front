import React, { Component } from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import MuiPhoneNumber from 'material-ui-phone-number';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TimePicker } from "@material-ui/pickers";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/moment";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default class AddComplaint extends Component {
  isValidphoneNumber = (number) => {
    const tel = parsePhoneNumberFromString(number);
    let res = false;
    if (tel) {
      res = tel.isValid();
    }

    return res;
  };
  render() {
    return (
      <div class="d-flex flex-wrap flex-column bd-highlight ">
        <div class="p-2 ">
          <div class="d-flex flex-wrap flex-row bd-highlight  ">
            <div class="p-4 col-md-6 col-lg-4 col-sm-12">
              <InputLabel required htmlFor="name-class">
                {<IntlMessages id="complaint.role" />}
              </InputLabel>
              <Select
                // options={this.props.ClassSettingsList}
                // onChange={this.props.handleChangeClass}
                id="classRoom"
                name="classRoom"
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
              />{" "}
            </div>
            <div class="p-4 col-md-6 col-lg-3 col-sm-12">
              <InputLabel
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  marginTop: "-2%",
                }}
                required
              >
                {<IntlMessages id="destination" />}
              </InputLabel>
              <TextField
                // error={values.nameError}
                id="destination"
                name="destination"
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
          </div>
        </div>
        <div class="p-2 ">
          <div class="d-flex flex-wrap flex-row bd-highlight  ">
            <div class="p-4 col-md-6 col-lg-4 col-sm-12">
              <InputLabel
                style={{
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  marginTop: "-2%",
                }}
                required
              >
                {<IntlMessages id="appModule.email" />}
              </InputLabel>
              <TextField
                // error={values.nameError}
                id="email"
                name="email"
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
            <div class="p-4 col-md-6 col-lg-3 col-sm-12 ">
            <MuiPhoneNumber
                    // error={
                    //   this.isValidphoneNumber(values.userPhoneNumber) === true ||
                    //   values.userPhoneNumber.length === 0
                    //     ? false
                    //     : true
                    // }
                    id="userPhoneNumber"
                    name="userPhoneNumber"
                    // country={this.state.countrie_locale === "ar" ? "tn" : "fr"}
                    //value={values.userPhoneNumber}
                    //onChange={this.props.handleChangePhone}
                    fullWidth={true}
                    label={<IntlMessages id="user.phone.number" />}
                    placeholder="(+XXX) XXX XXX XXX"
                    // helperText={
                    //   this.isValidphoneNumber(values.userPhoneNumber) === true ||
                    //   values.userPhoneNumber.length === 0 ? (
                    //     ''
                    //   ) : (
                    //     <IntlMessages id="error.user.message.phone" />
                    //   )
                    // }
                  />
            </div>
          </div>
        </div>
        <div class="p-2 ">
          <div class="d-flex flex-wrap flex-row bd-highlight  ">
            <div class="p-4 col-md-6 col-lg-4 col-sm-12">
              <InputLabel required htmlFor="name-class">
                {<IntlMessages id="compalint.motif" />}
              </InputLabel>
              <Select
                // options={this.props.ClassSettingsList}
                // onChange={this.props.handleChangeClass}
                id="motif"
                name="motif"
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
              />{" "}
            </div>
            <div class="p-4 col-md-6 col-lg-2 col-sm-12">
              <div className="form-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    required
                    label={<IntlMessages id="complaint.date" />}
                    fullWidth
                    id="dateVirtualClass"
                    name="dateVirtualClass"
                    //value={values.dateVirtualClass}
                    //onChange={handleChangeDate}
                    format="DD-MM-YYYY"
                    autoOk
                    minDate={new Date()}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div class="p-4 col-md-6 col-lg-2 col-sm-12">
              <div className="form-group">
                <div key="datetime_default" className="picker">
                  <TimePicker
                    required
                    label={<IntlMessages id="complaint.hour" />}
                    fullWidth
                    //value={values.startTimeClass}
                    showTabs={false}
                    //onChange={handleStartTimeChange}
                    ampm={false}
                    minDate={new Date()}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                  />
                </div>
                {/* <FormHelperText
                                    error={!values.startTimeClassError}
                                  >
                                    {!values.startTimeClassError ? (
                                      <IntlMessages id="start.hour.check" />
                                    ) : (
                                      ""
                                    )}
                                  </FormHelperText> */}
              </div>
            </div>
          </div>
        </div>
        <div class="p-5 ">
          Merci de nous décrire l'incident le plus précisément possible : *
          <div className="col-md-12 col-lg-12 col-sm-12 p-1">
            <textarea
              className="container"
              id="incident"
              name="incident"
              rows="4"
              // value={values.usefulInformation || ''}
              // onChange={this.props.handleChange('usefulInformation')}
              style={{
                borderRadius: "20px",
                marginTop: "10px",
                width: "100%",
              }}
            >
              
            </textarea>
          </div>
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
    );
  }
}

// import React from 'react';
// import { Modal, ModalHeader } from 'reactstrap';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import baseUrl from '../../../../../config/config';
// import axios from 'axios';
// import MenuItem from '@material-ui/core/MenuItem';
// import * as moment from 'moment';
// import IntlMessages from '../../../../../util/IntlMessages';
// import { connect } from 'react-redux';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from 'react-select';
// import _ from 'lodash';
// import Autocomplete from '@material-ui/lab/Autocomplete';

// class AddComplaint extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       subject: '',
//       receiver_id: '',
//       receiverID: 0,
//       message: '',
//       professorsList: [],
//       professorsListNew: [],
//       date_hour_mail: '2019-07-18T13:07:42.438Z',
//       sender_id: '',
//       usersData: [],
//       inputText: '',
//       Reclam_File: null,
//       subject_Specifique: '',
//     };

//     this.onDrop = this.onDrop.bind(this);
//   }
//   _isMounted = false;

//   onDrop = (e) => {
//     let file = e.target.files[0];
//     this.setState({ Reclam_File: file, inputText: file.name });
//   };
//   render() {
//     const typesSubjects = ['transport', 'cantine', 'maltraitance', 'niveau educatif', 'autre'];
//     const { onClose, values, handleChange } = this.props;
//     console.log(values, 'valuuuues');
//     const {
//       receiver_id,
//       receiverID,
//       subject,
//       message,
//       sender_id,
//       date_hour_mail,
//       Reclam_File,
//       subject_Specifique,
//     } = this.state;

//     if (this.props.receiverID !== undefined && this.state.usersData.length > 0) {
//       var nameReciver = this.state.usersData.find((element) => element.id == this.props.receiverID);
//     }

//     return (
//       <Modal
//         className="modal-box modal-box-mail"
//         toggle={onClose}
//         isOpen={this.props.open}
//         style={{ zIndex: 2600 }}
//       >
//         <ModalHeader className="modal-box-header bg-primary text-white">
//           <IntlMessages id="Reclam.rédiger" />
//           <IconButton className="text-white" onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </ModalHeader>
//         <div className="modal-box-content d-flex flex-column">
//           <div>
//             <Autocomplete
//               name="receiver_id"
//               id="receiver_id"
//               disableClearable
//               value={
//                 this.props.receiverID === undefined
//                   ? this.state.usersData[
//                       _.findIndex(this.state.usersData, {
//                         id: receiverID,
//                       })
//                     ]
//                   : this.state.usersData[
//                       _.findIndex(this.state.usersData, {
//                         id: this.props.receiverID,
//                       })
//                     ]
//               }
//               options={this.props.receiverID === undefined ? this.state.usersData : []}
//               onChange={(event, newValue) => {
//                 this.setState({ receiverID: newValue.id });
//               }}
//               getOptionLabel={(option) => option.label}
//               renderInput={(params) => (
//                 <TextField {...params} label={<IntlMessages id="reciver.message" />} />
//               )}
//             />
//           </div>
//           <br></br>
//           <TextField
//             required
//             id="subject"
//             label={<IntlMessages id="subject.message" />}
//             onChange={handleChange('subject')}
//             select
//             value={values.subject}
//           >
//             {this.props.subjectReply === '' ? (
//               typesSubjects.map((type, index) => (
//                 <MenuItem key={index} value={type}>
//                   {type}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem value={subject}>{subject}</MenuItem>
//             )}
//           </TextField>
//           {values.subject === 'autre' ? (
//             <TextField
//               id="subject"
//               label={<IntlMessages id="subject.specifiq.subject" />}

//               variant="outlined"
//               value={subject_Specifique ? subject_Specifique : ''}
//               multiline
//               rowsMax="4"
//               margin="normal"
//             />
//           ) : (
//             ''
//           )}

//           <TextField
//             id="required"
//             label={<IntlMessages id="message" />}
//             onChange={handleChange('message')}
//             value={values.message}
//             multiline
//             rowsMax="4"
//             margin="normal"
//           />
//         </div>

//         <div className="modal-box-footer">
//           <InputLabel htmlFor="name-multiple">vous pouvez ajouter des piéces jointes</InputLabel>
//           <br />
//           <label
//             htmlFor="files"
//             className="btn"
//             style={{
//               cursor: 'pointer',
//               color: 'white',
//               fontWeight: 'bold',
//               backgroundColor: '#4B58B9',
//               borderRadius: '4rem',
//             }}
//           >
//             <strong>{<IntlMessages id="Choisir un fichier" />}</strong>
//           </label>
//           <label>{this.state.inputText}</label>
//           <input
//             id="files"
//             type="file"
//             style={{ visibility: 'hidden' }}
//             onChange={(e) => this.onDrop(e)}
//             accept="application/pdf,image/*"
//           />
//           <br />
//           <br />
//           <div align="right" className="col-sm-12">
//             <Button
//               disabled={
//                 receiverID == '' ||
//                 subject == '' ||
//                 receiverID == '' ||
//                 (subject == 'autre' && subject_Specifique === '')
//               }
//               variant="contained"
//               color="primary"
//               onClick={() => {
//                 let reclamSubject = '';
//                 if (subject === 'autre' && subject_Specifique !== '') {
//                   reclamSubject = subject_Specifique;
//                 } else {
//                   reclamSubject = subject;
//                 }
//                 // onClose();
//                 // onMailSend({
//                 //   sender_id: sender_id,
//                 //   receiver_id: receiverID,
//                 //   subject: reclamSubject,
//                 //   message: message,
//                 //   date_hour_mail: date_hour_mail,
//                 //   read: false,
//                 //   starred: false,
//                 //   important: false,
//                 //   hasAttachments: false,
//                 //   folder: 1,
//                 //   selected: false,
//                 //   labels: [],
//                 //   establishmentId: this.props.userProfile.establishment_id,
//                 //   file: Reclam_File,
//                 // });
//                 this.setState({
//                   subject: '',
//                   receiver_id: '',
//                   message: '',
//                   professorsList: [],
//                   professorsListNew: [],
//                   date_hour_mail: '2019-07-18T13:07:42.438Z',
//                   Reclam_File: null,

//                   subject_Specifique: '',
//                   receiverID: '',
//                 });
//               }}
//             >
//               <i className="zmdi zmdi-mail-send mr-2" />
//               {<IntlMessages id="button.send.message" />}
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     userProfile: state.auth.userProfile,
//   };
// };

// export default connect(mapStateToProps)(AddComplaint);
