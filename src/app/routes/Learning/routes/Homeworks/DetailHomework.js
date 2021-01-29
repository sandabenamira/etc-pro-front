import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Auxiliary from "../../../../../util/Auxiliary";
import TextField from "@material-ui/core/TextField";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Row, Col } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import CardBox from "../../../../../components/CardBox/index";
import MenuItem from "@material-ui/core/MenuItem";
import { UncontrolledAlert } from "reactstrap";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { TimePicker } from "@material-ui/pickers";
import { connect } from "react-redux";
import { subjectsByLevelBySection } from "../../../../../actions/subjectAction";
import moment from "moment";
import { roleIdProfessor } from "../../../../../config/config";
import _ from "lodash";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import AddBox from "@material-ui/icons/AddBox";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export class DetailHomework extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      values,
    } = this.props;
    console.log("valuesvaluesvalues", values);
  
    return (
      <Auxiliary>
        <Modal isOpen={this.props.values.isOpenDetail}>
          <ModalHeader className="modal-box-header bg-primary text-white">
          <IntlMessages id="show.details" />
            
            <IconButton
              className="text-white"
              onClick={this.props.handleCancel}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <div>
              <div className="d-flex flex-column bd-highlight mb-3">
                <div className="d-flex flex-row justify-content-start align-items-center p-4 col-lg-12 col-md-12 col-sm-12">
                  <div className="p-2 col-lg-3">
                    <TextField
                      type="text"
                      id="nameFile"
                      name="nameFile"
                      label={<IntlMessages id="toDo.titre" />}
                      value={values.nameFile || ""}
                      margin="normal"
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                    />
                  </div>
                  <div className="p-2 col-lg-4">
                    <InputLabel
                      htmlFor="nomSelect"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "13px",
                      }}
                    >
                      {<IntlMessages id="type.homework" />}
                    </InputLabel>

                    <TextField
                      id="homeworkType"
                      label={values.homeworkType.label}
                      InputProps={{ disableUnderline: true }}
                      
                    />
                  </div>
                  <div className="pl-4 p-2 col-lg-4">
                    <InputLabel
                      htmlFor="nomSelect"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "13px",
                      }}
                    >
                      {<IntlMessages id="material.subject.name" />}
                    </InputLabel>
                    <TextField
                      id="homeworkType"
                      value={values.subjectItem.label}
                      InputProps={{ disableUnderline: true }}
                    />
                  </div>
                </div>
                <div>
                <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "2%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </div>

              
                <div className="d-flex flex-row flex-wrap justify-content-start align-items-start p-4 col-lg-12 col-md-12 col-sm-12">
                  <div className=" col-lg-3">
                    <InputLabel
                      htmlFor="nomSelect"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "13px",
                      }}
                    >
                      {<IntlMessages id="sidebar.components.classes" />}
                    </InputLabel>
                    <TextField
                      id="classItem"
                      value={values.classItem[0].label}
                      InputProps={{ disableUnderline: true }}
                    />
                  </div>

                  <div className="p-2 ">
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
                        id="publicationDate"
                        name="publicationDate"
                        value={values.publicationDate}
                        format="DD-MM-YYYY"
                        autoOk
                      
                        InputProps={{ disableUnderline: true }}

                      />
                    </MuiPickersUtilsProvider>
                  </div>

                  <div className="p-2">
                    <TimePicker
                      label={
                        <Typography
                          variant="h5"
                          style={{
                            color: "grey",
                            fontWeight: "normal",
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            marginTop: "-30px",
                          }}
                        >
                          <IntlMessages id="components.publication.hours" />
                        </Typography>
                      }
                 
                      value={values.postTime}
                      ampm={false}
                      showTabs={false}
                      leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                      rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                      InputProps={{ disableUnderline: true }}

                    />
                  </div>
                </div>


                <div className="d-flex flex-row flex-wrap justify-content-start align-items-start p-4 col-lg-12 col-md-12 col-sm-12">
                  <div className="p-2 ">
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
                            <IntlMessages id="date.rendering.date" />
                          </Typography>
                        }
                        clearable
                        fullWidth
                        id="renderingDate"
                        name="renderingDate"
                        value={values.renderingDate}
                        format="DD-MM-YYYY"
                        autoOk
                        minDate={new Date(values.publicationDate)}
                        InputProps={{ disableUnderline: true }}

                      />
                    </MuiPickersUtilsProvider>
                  </div>

                  <div className="p-2 ml-4">
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
                            <IntlMessages id="toDo.correctionDate" />
                          </Typography>
                        }
                        clearable
                        fullWidth
                        id="correctionDate"
                        name="correctionDate"
                        value={values.correctionDate}
                        // onChange={handleChangeDate('correctionDate')}
                        format="DD-MM-YYYY"
                        // style={{
                        //   marginTop: '20px',
                        // }}
                        autoOk
                        minDate={new Date(values.renderingDate)}
                        InputProps={{ disableUnderline: true }}

                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>

  
                <div>
                <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "2%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </div>
             
                <div className="d-flex flex-row flex-wrap justify-content-start align-items-center  mb-4 p-4 col-12">
                  <div className="d-flex flex-row justify-content-start align-items-center col-md-12 col-lg-12">
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
                    <div className="d-flex flex-row justify-content-between align-items-center col-md-10 col-lg-10">
                      <TextField
                        type="url"
                        variant="outlined"
                        type="text"
                        id="courseUrl"
                        name="courseUrl"
                        label={<IntlMessages id="material.course.url" />}
                        value={values.courseUrl || ''}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                  </div>
               
                  <div className="d-flex flex-row flex-wrap justify-content-start align-items-center  mb-4 p-4 col-12">
                  {values.nameFilesDetails.map((homeworkFile, index) => (
                    <div key={index}>
                      <div className="d-flex  flex-row justify-content-center  col-md-6 col-lg-6">
                      <Button href={homeworkFile.url} target="_blank">
                      <PictureAsPdfIcon
                          style={{
                            fontSize: '55',
                            marginRight: '20px',
                          }}
                          color="primary"
                        />
                            </Button>
                       
                      </div>
                      <div className="d-flex  flex-row justify-content-center  col-md-6 col-lg-6">
                        <div
                       
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
                          {homeworkFile.name} &nbsp;
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
                <div>
                <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "2%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-between  align-items-start ">
                  <label>
                    <Typography
                      variant="h6"
                      style={{
                        color: 'grey',
                        fontWeight: 'normal',
                      }}
                    >
                      <IntlMessages id="text.description" />
                    </Typography>
                  </label>
                  <textarea
                    className="container"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    value={values.description || ''}
                    style={{
                      borderRadius: '20px',
                      marginTop: '10px',
                      width: '200%',
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default DetailHomework;
