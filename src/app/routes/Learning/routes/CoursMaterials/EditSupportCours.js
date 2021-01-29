import React, { Component } from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Auxiliary from '../../../../../util/Auxiliary';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../../../components/CardBox/index';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { getSections } from '../../../../../actions/sectionAction';
import { getLevels } from '../../../../../actions/classLevelAction';
import { getClassesByEstablishmentId } from '../../../../../actions/classeAction';
import moment from 'moment';
import _ from 'lodash';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import AddBox from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { roleIdProfessor } from '../../../../../config/config';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TimePicker } from '@material-ui/pickers';
class EditSupportCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerte: false,
      alerteDate: false,
      alerteHeure: false,
      estabType: '',
      levelsbyestablishment: [],
      profLevels: [],
    };
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
      handleChangestudentLevel,
      handleChangestudentSection,
      handleChangeClass,
    } = this.props;
    let name =
      this.props.informationsAdd.surnameProf == '0'
        ? 'non affectée'
        : this.props.informationsAdd.nameProf;
    let surname =
      this.props.informationsAdd.surnameProf == '0' ? ' ' : this.props.informationsAdd.surnameProf;
    let nameSurnameProf = name + ' ' + surname;
    var classList = this.props.courseAssignmentList;
    

    return (
      <Auxiliary>
        <Modal
          isOpen={values.openEdit}
          //style={{ width: '1000px' }}
        >
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {'modifier le support de cours'}
          </ModalHeader>
          <br />
          <ModalBody>
            <div>
            {values.alerteStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {values.messageAlerte} </span>
            </UncontrolledAlert>
          ) : (
            ''
          )}
              <form autoComplete="off" onSubmit={this.props.editMaterialCourse}>
                <br />

                <>
                  {' '}
                  <div className="d-flex flex-column  ">
                    <div className="d-flex flex-wrap  align-items-start ">
                      <div className="col-md-4 p-4">
                        <InputLabel
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                            marginTop: '-2%',
                          }}
                        >
                          {<IntlMessages id="material.course.name" />}
                        </InputLabel>
                        <TextField
                          required
                          error={values.nameError}
                          id="courseName"
                          name="courseName"
                          value={values.courseName || ''}
                          onChange={this.props.handleChange('courseName')}
                          style={{
                            marginTop: '3%',
                          }}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        />
                        <FormHelperText error={values.nameError}>
                          {values.nameError ? 'Nom de support de cours déja existe' : ''}
                        </FormHelperText>
                      </div>
                      <div className="col-md-4 p-4">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.class.name" />}
                        </InputLabel>
                        {this.props.userProfile.role_id === roleIdProfessor ? (
                          <Select
                            required
                            defaultValue={values.defaultClass}
                            isMulti
                            name="classList"
                            options={classList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.props.handleChangeClass}
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
                        ) : (
                          <Select
                            isDisabled={true}
                            value={{
                              label: this.props.informationsAdd.className,
                              value: 1,
                            }}
                            options={this.props.informationsAdd.className}
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
                          />
                        )}
                      </div>
                      <div className="col-md-4 p-4">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.school.session" />}
                        </InputLabel>
                        <Select
                          isDisabled={true}
                          value={{
                            label: this.props.informationsAdd.schoolSessionName,
                            value: 1,
                          }}
                          options={this.props.informationsAdd.schoolSessionName}
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
                      <div className="col-md-4 p-4">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.subject.name" />}
                        </InputLabel>
                        <Select
                          value={{
                            label: this.props.informationsAdd.subjectName,
                            value: 1,
                          }}
                          options={this.props.informationsAdd.subjectName}
                          isDisabled={true}
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

                      <div className="col-md-4 p-4">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.professor.name" />}
                        </InputLabel>
                        <Select
                          value={{ label: nameSurnameProf, value: 1 }}
                          options={[nameSurnameProf]}
                          id="nomSelect"
                          isDisabled={true}
                          styles={{
                            control: (base) => ({
                              ...base,
                              '&:hover': { borderColor: 'gray' },
                              border: '1px solid lightgray',
                              boxShadow: 'none',
                              borderTopStyle: 'none',
                              borderRightStyle: 'none',
                              borderLeftStyle: 'none',
                              borderRadius: ' none',
                            }),
                          }}
                        />{' '}
                      </div>
                    </div>
                    <div className="d-flex flex-column bd-highlight mb-4 ">
                      <div className="d-flex flex-row justify-content-start align-items-center p-2 bd-highlight mb-4 p-4 col-12">
                        <div className="d-flex justify-content-start align-items-center flex-row col-md-4">
                          <input
                            type="file"
                            class="d-none"
                            accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
                            id="add-file"
                            multiple
                            onChange={(e) => this.props.attachFile(e)}
                          />
                          <label htmlFor="add-file" className="d-flex  bd-highlight">
                            <AddBox fontSize="inherit" style={{ fontSize: '40px' }} />
                          </label>
                          <div class="p-2 bd-highlight">
                            <Typography
                              variant="h6"
                              style={{
                                color: 'grey',
                                fontWeight: 'normal',
                              }}
                            >
                              <IntlMessages id="material.course.join.file" />
                            </Typography>
                          </div>
                        </div>
                        <div className="d-flex flex-row justify-content-start align-items-center col-md-8 col-lg-8">
                          <div className="d-flex flex-row justify-content-between align-items-center col-md-2 col-lg-2">
                            <Typography
                              variant="h6"
                              style={{
                                color: 'grey',
                                fontWeight: 'normal',
                              }}
                            >
                              <IntlMessages id="material.course.url" />
                            </Typography>
                          </div>
                          <div className="d-flex flex-row justify-content-between align-items-center col-md-6 col-lg-6">
                            <TextField
                              type="url"
                              variant="outlined"
                              type="text"
                              id="courseUrl"
                              name="courseUrl"
                              label={<IntlMessages id="material.course.url" />}
                              value={values.courseUrl || ''}
                              onChange={this.props.handleChange('courseUrl')}
                              margin="normal"
                              fullWidth
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column bd-highlight mb-4 ">
                      <div className="d-flex flex-row justify-content-start align-items-center bd-highlight mb-4 col-12">
                        <div className="d-flex flex-row justify-content-start align-items-center col-md-12 col-lg-12">
                          {values.nameFiles.map((moocTextFile, index) => (
                            <div key={index}>
                              <div className="d-flex  flex-row justify-content-center  col-md-6 col-lg-6">
                                <PictureAsPdfIcon
                                  style={{
                                    fontSize: '55',
                                    marginRight: '20px',
                                  }}
                                  color="primary"
                                />
                              </div>
                              <div className="d-flex  flex-row justify-content-center  col-md-6 col-lg-6">
                                <div
                                  onClick={() => {
                                    this.props.deleteFile(moocTextFile);
                                  }}
                                >
                                  <HighlightOffIcon
                                    style={{
                                      fontSize: '15',
                                      marginRight: '5px',
                                    }}
                                    color="primary"
                                  />
                                </div>

                                <Typography
                                  variant="h6"
                                  style={{
                                    color: '#3F51B5',
                                    fontWeight: 'normal',
                                    fontFamily: 'Roboto',
                                    fontSize: '10px',
                                  }}
                                >
                                  {moocTextFile} &nbsp;
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap  align-items-start ">
                      <div className="col-md-4 col-lg-4 p-1">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            paddingLeft: '10px',
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.course.join.moocs" />}
                        </InputLabel>
                        <Select
                          defaultValue={values.defaultMoocs}
                          isMulti
                          name="nameMoocs"
                          options={values.optionsListMoocs}
                          onChange={this.props.handleChangeMoocsIds}
                          className="basic-multi-select"
                          classNamePrefix="select"
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
                      <div className="col-md-4  col-lg-4 p-1">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            paddingLeft: '10px',
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.course.join.virtual.class" />}
                        </InputLabel>
                        <Select
                          defaultValue={values.defaultVirtualClasses}
                          isMulti
                          name="nameMoocs"
                          options={values.optionsListVirtualClasses}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={this.props.handleChangeVirtualClassIds}
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
                      <div className="col-md-4  col-lg-4 p-1">
                        <InputLabel
                          htmlFor="nomSelect"
                          style={{
                            paddingLeft: '8px',
                            fontFamily: 'Roboto',
                            fontSize: '18px',
                          }}
                        >
                          {<IntlMessages id="material.course.join.to.do" />}
                        </InputLabel>
                        <Select
                          defaultValue={[]}
                          isMulti
                          name="nameMoocs"
                          // options={optionsListHomeWork}
                          className="basic-multi-select"
                          classNamePrefix="select"
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
                    <div className="d-flex flex-column bd-highlight mb-4 ">
                      <div className="d-flex flex-row justify-content-start align-items-start p-4 bd-highlight  col-lg-12 col-md-12 col-sm-12">
                        <div className="d-flex flex-row justify-content-start align-items-start col-md-6 col-lg-6 col-sm-6">
                          <div
                            className="d-flex justify-content-start col-md-6 col-lg-6  col-sm-6"
                            style={{ marginLeft: '-5%' }}
                          >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                label={
                                  <Typography
                                    variant="h5"
                                    style={{
                                      color: 'grey',
                                      fontWeight: 'normal',
                                      fontFamily: 'Roboto',
                                      fontSize: '20px',
                                      marginTop: '-30px',
                                    }}
                                  >
                                    <IntlMessages id="components.publication.date" />
                                  </Typography>
                                }
                                clearable
                                fullWidth
                                id="end_date"
                                name="end_date"
                                value={values.publicationDate}
                                onChange={this.props.handleChangePublicationDate}
                                format="DD-MM-YYYY"
                                autoOk
                                style={{
                                  marginTop: '20px',
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                          <div className=" d-flex flex-wrap  align-items-start col-md-6 col-lg-6 col-sm-6">
                            <TimePicker
                              label={
                                <Typography
                                  variant="h5"
                                  style={{
                                    color: 'grey',
                                    fontWeight: 'normal',
                                    fontFamily: 'Roboto',
                                    fontSize: '20px',
                                    marginTop: '-30px',
                                  }}
                                >
                                  <IntlMessages id="components.publication.hours" />
                                </Typography>
                              }
                              style={{
                                marginTop: '20px',
                              }}
                              required
                              value={values.postTime}
                              onChange={this.props.handleChangePostTime}
                              ampm={false}
                              showTabs={false}
                              leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                              rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                            />
                          </div>
                          <div className="d-flex flex-wrap justify-content-between  align-items-start col-md-12 col-lg-12">
                            <label>
                              <Typography
                                variant="h6"
                                style={{
                                  color: 'grey',
                                  fontWeight: 'normal',
                                }}
                              >
                                <IntlMessages id="material.course.comments" />
                              </Typography>
                            </label>
                            <textarea
                              className="container"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={values.comment || ''}
                              onChange={this.props.handleChange('comment')}
                              style={{
                                borderRadius: '20px',
                                marginTop: '10px',
                                width: '200%',
                              }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-end ">
                      <Button
                        variant="contained"
                        className="bg-grey text-white "
                        style={{
                          borderBottomLeftRadius: '16px',
                          borderBottomRightRadius: '16px',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                          width: '10%',
                          height: '6%',
                        }}
                        onClick={this.props.handleCancel}
                      >
                        {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        // disabled={values.assignmentIds.length == 0}
                        variant="contained"
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
                        <IntlMessages id="button.modify" />
                      </Button>
                    </div>{' '}
                  </div>
                </>
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
    userProfile: state.auth.userProfile,
    classLevels: state.ClassLevels.remoteLevels,
    classSections: state.classSections.remoteSections,
    classes: state.classes,
    settings: state.settings.locale,
  };
}
export default connect(mapStateToProps, {
  getSections,
  getLevels,
  getClassesByEstablishmentId,
})(EditSupportCours);