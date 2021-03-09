import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import IntlMessages from "../../../../../util/IntlMessages";
import AddBox from "@material-ui/icons/AddBox";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { TimePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import FormHelperText from "@material-ui/core/FormHelperText";

class HomeworkList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    
    const {
      values,
      handleChange,
      handleChangeHomeworkType,
      handleChangeSubject,
      attachFile,
      deleteFile,
      handleChangePostTime,
      handleChangeDate,
      handleChangeClassList,
      addNewHomework,
      cancelModal,
    } = this.props;
    

    return (
      <div>
        <form className="row " autoComplete="off" onSubmit={addNewHomework}>
          <div className="d-flex flex-row justify-content-start align-items-center p-4 col-lg-12 col-md-12 col-sm-12">
            <div className="p-2 col-lg-3">
              <TextField
                required
                type="nameFile"
                type="text"
                id="nameFile"
                name="nameFile"
                label={<IntlMessages id="toDo.titre" />}
                value={values.nameFile || ""}
                onChange={handleChange("nameFile")}
                margin="normal"
                fullWidth
              />
            </div>
            <div className="p-2 col-lg-4">
              <InputLabel
                
                htmlFor="nomSelect"
                style={{
                  paddingLeft: "10px",
                  fontFamily: "Roboto",
                  fontSize: "13px",
                }}
              >
                {<IntlMessages id="type.homework" />}
              </InputLabel>
              <Select
                defaultValue={[]}
                name="homeworkType"
                options={values.HomeworkTypes}
                onChange={handleChangeHomeworkType}
                classNamePrefix="select"
                styles={{
                  control: (base) => ({
                    ...base,
                    "&:hover": { borderColor: "gray" },
                    border: "1px solid lightgray",
                    boxShadow: "none",
                    borderTopStyle: "none",
                    borderRightStyle: "none",
                    borderLeftStyle: "none",
                    borderRadius: " none",
                  }),
                }}
              />
            </div>
            <div className="pl-4 p-2 col-lg-4">
              <InputLabel
                required
                htmlFor="nomSelect"
                style={{
                  paddingLeft: "10px",
                  fontFamily: "Roboto",
                  fontSize: "13px",
                }}
              >
                {<IntlMessages id="material.subject.name" />}
              </InputLabel>
              <Select
                required
                defaultValue={[]}
                name="subjectName"
                options={values.subjects}
                classNamePrefix="select"
                onChange={handleChangeSubject}
                styles={{
                  control: (base) => ({
                    ...base,
                    "&:hover": { borderColor: "gray" },
                    border: "1px solid lightgray",
                    boxShadow: "none",
                    borderTopStyle: "none",
                    borderRightStyle: "none",
                    borderLeftStyle: "none",
                    borderRadius: " none",
                  }),
                }}
              />
              <FormHelperText error={values.errorClass}>
                {values.errorClass && (
                  <IntlMessages id="component.required_fields" />
                )}
              </FormHelperText>
            </div>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-start align-items-start p-4 col-lg-12 col-md-12 col-sm-12">
            <div className=" p-2 col-lg-4 mt-3">
              <InputLabel
                required
                htmlFor="nomSelect"
                style={{
                  paddingLeft: "10px",
                  fontFamily: "Roboto",
                  fontSize: "13px",
                }}
              >
                Groupes
              </InputLabel>
              <Select
                defaultValue={[]}
                required
                name="classes"
                isMulti
                className="basic-multi-select"
                options={values.classes}
                onChange={handleChangeClassList}
                classNamePrefix="select"
                styles={{
                  control: (base) => ({
                    ...base,
                    "&:hover": { borderColor: "gray" },
                    border: "1px solid lightgray",
                    boxShadow: "none",
                    borderTopStyle: "none",
                    borderRightStyle: "none",
                    borderLeftStyle: "none",
                    borderRadius: " none",
                  }),
                }}
              />
              <FormHelperText error={values.isEmptylistClass}>
                {values.isEmptylistClass && (
                  <IntlMessages id="component.required_fields" />
                )}
              </FormHelperText>
            </div>

            <div className="p-2 ml-5 ">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
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
                      <IntlMessages id="components.publication.date" />
                    </Typography>
                  }
                  clearable
                  fullWidth
                  id="publicationDate"
                  name="publicationDate"
                  value={values.publicationDate}
                  onChange={handleChangeDate("publicationDate")}
                  format="DD-MM-YYYY"
                  autoOk
                  style={{
                    marginTop: "20px",
                  }}
                  minDate={new Date()}
                />
              </MuiPickersUtilsProvider>
            </div>

            <div className="p-2 ml-3">
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
                style={{
                  marginTop: "20px",
                }}
                value={values.postTime}
                onChange={handleChangePostTime}
                ampm={false}
                showTabs={false}
                leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
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
                        color: "grey",
                        fontWeight: "normal",
                        fontFamily: "Roboto",
                        fontSize: "20px",
                        marginTop: "-30px",
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
                  onChange={handleChangeDate("renderingDate")}
                  format="DD-MM-YYYY"
                  autoOk
                  style={{
                    marginTop: "20px",
                  }}
                  minDate={new Date(values.publicationDate)}
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
                        color: "grey",
                        fontWeight: "normal",
                        fontFamily: "Roboto",
                        fontSize: "20px",
                        marginTop: "-30px",
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
                  onChange={handleChangeDate("correctionDate")}
                  format="DD-MM-YYYY"
                  autoOk
                  style={{
                    marginTop: "20px",
                  }}
                  minDate={new Date(values.renderingDate)}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-start align-items-center  mb-4 p-4 col-12">
            <div className="d-flex justify-content-start align-items-center flex-row col-md-4">
              <input
                type="file"
                className="d-none"
                accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
                id="add-file"
                multiple
                onChange={(e) => attachFile(e)}
              />
              <label htmlFor="add-file" className="d-flex  ">
                <AddBox fontSize="inherit" style={{ fontSize: "40px" }} />
              </label>
              <div className="p-2 bd-highlight">
                <Typography
                  variant="h6"
                  style={{
                    color: "grey",
                    fontWeight: "normal",
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
                    color: "grey",
                    fontWeight: "normal",
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
                  value={values.courseUrl || ""}
                  onChange={handleChange("courseUrl")}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-start align-items-center  mb-4 p-4 col-12">
            {values.nameFiles.map((homeworkFile, index) => (
              <div key={index}>
                <div className="d-flex  flex-row justify-content-center  col-md-6 col-lg-6">
                  <PictureAsPdfIcon
                    style={{
                      fontSize: "55",
                      marginRight: "20px",
                    }}
                    color="primary"
                  />
                </div>
                <div className="d-flex  flex-row justify-content-center  col-md-6 col-lg-6">
                  <div
                    onClick={() => {
                      deleteFile(homeworkFile);
                    }}
                  >
                    <HighlightOffIcon
                      style={{
                        fontSize: "15",
                        marginRight: "5px",
                      }}
                      color="primary"
                    />
                  </div>

                  <Typography
                    variant="h6"
                    style={{
                      color: "#3F51B5",
                      fontWeight: "normal",
                      fontFamily: "Roboto",
                      fontSize: "10px",
                    }}
                  >
                    {homeworkFile} &nbsp;
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-between  align-items-start col-md-6 col-lg-6">
            <label>
              <Typography
                variant="h6"
                style={{
                  color: "grey",
                  fontWeight: "normal",
                }}
              >
                <IntlMessages id="text.description" />
              </Typography>
            </label>
            <textarea
              className="container"
              id="exampleFormControlTextarea1"
              rows="5"
              value={values.description || ""}
              onChange={handleChange("description")}
              style={{
                borderRadius: "20px",
                marginTop: "10px",
                width: "200%",
              }}
            ></textarea>
          </div>

          <div className="d-flex mt-4 flex-wrap justify-content-end  align-items-start col-md-12 col-lg-12">
            <div className="mr-2">
              <Button
                variant="contained"
                onClick={cancelModal}
                style={{
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                  borderTopLeftRadius: "13px",
                  borderTopRightRadius: "13px",
                  width: "100%",
                  height: "100%",
                  textTransform: "capitalize",
                }}
              >
                {
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                }
              </Button>
            </div>
            <div className="mr-2">
              <Button
                variant="contained"
                style={{
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                  borderTopLeftRadius: "13px",
                  borderTopRightRadius: "13px",
                  width: "100%",
                  height: "100%",
                  textTransform: "capitalize",
                }}
                className=" bg-indigo text-white "
                type="submit"
              >
                <IntlMessages id="select.establishment.button.valider" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default HomeworkList;
