import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";
import IntlMessages from "../../../../../util/IntlMessages";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddBox from "@material-ui/icons/AddBox";


class AddCopybook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <div className="d-flex flex-wrap flex-column">
          <div className="p-2 ">
            <div className="d-flex flex-wrap flex-row">
              <div className="p-2 mt-2 col-lg-3">
                <InputLabel
                  htmlFor="nomSelect"
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Roboto",
                    fontSize: "13px",
                  }}
                >
                  {<IntlMessages id="components.note.subject" />}
                </InputLabel>
                <Select
                  defaultValue={[]}
                  name="homeworkType"
                  // options={values.HomeworkTypes}
                  // onChange={handleChangeHomeworkType}
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
              <div className="p-2 mt-2 col-lg-3">
                <InputLabel
                  htmlFor="nomSelect"
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Roboto",
                    fontSize: "13px",
                  }}
                >
                  {<IntlMessages id="professor.call" />}
                </InputLabel>
                <Select
                  defaultValue={[]}
                  name="homeworkType"
                  // options={values.HomeworkTypes}
                  // onChange={handleChangeHomeworkType}
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
              <div className="p-2 col-lg-3 d-flex flex-wrap flex-column">
                <div className="p-2">
                  <InputLabel
                    htmlFor="nomSelect"
                    style={{
                      paddingLeft: "10px",
                      fontFamily: "Roboto",
                      fontSize: "13px",
                    }}
                  >
                    {<IntlMessages id="components.note.class" />}
                  </InputLabel>
                  <Select
                    defaultValue={[]}
                    name="homeworkType"
                    // options={values.HomeworkTypes}
                    // onChange={handleChangeHomeworkType}
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
                <div className="p-2">
                  <RadioGroup
                    row
                    aria-label="paymentMethode"
                    name="paymentMethode"
                    // value={paymentMethode}
                    // onChange={this.handleChange('paymentMethode')}
                  >
                    <FormControlLabel
                      value="Espèce"
                      control={<Radio />}
                      label={
                        <IntlMessages id="components.event.with.class.all" />
                      }
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="d-flex flex-wrap flex-row">
              <div className="p-2 col-lg-3">
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
                        <IntlMessages id="complaint.date" />
                      </Typography>
                    }
                    clearable
                    fullWidth
                    id="renderingDate"
                    name="renderingDate"
                    //   value={values.renderingDate}
                    //   onChange={handleChangeDate("renderingDate")}
                    format="DD-MM-YYYY"
                    autoOk
                    style={{
                      marginTop: "20px",
                    }}
                    minDate={new Date()}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="p-2 ml-4 col-lg-6">
                <InputLabel
                  htmlFor="nomSelect"
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Roboto",
                    fontSize: "13px",
                  }}
                >
                  {<IntlMessages id="material.course.url" />}
                </InputLabel>
                <TextField
                  type="url"
                  variant="outlined"
                  type="text"
                  id="courseUrl"
                  name="courseUrl"
                  //   value={values.courseUrl || ""}
                  //   onChange={this.props.handleChange("courseUrl")}
                  margin="normal"
                  fullWidth
                />
              </div>
            </div>
          </div>

          <div className="p-2">
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              onEditorStateChange={this.onEditorStateChange}
            />
            <textarea
              style={{ width: "100%", height: 200 }}
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
          <div
            className="p-2"
            style={{ fontSize: "20px", color: "#0000CD" }}
          >
            <IntlMessages id="attach.document" />
          </div>
          <div className="p-2">
            <div className="d-flex  flex-wrap flex-row ">
              <div className="p-2 col-lg-3 col-md-6 col-sm-12">
                <InputLabel
                  htmlFor="nomSelect"
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Roboto",
                    fontSize: "13px",
                  }}
                >
                  {<IntlMessages id="support.cours.total" />}
                </InputLabel>
                <Select
                  defaultValue={[]}
                  name="homeworkType"
                  // options={values.HomeworkTypes}
                  // onChange={handleChangeHomeworkType}
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
             
             <div className="d-flex justify-content-start align-items-center flex-row col-lg-3 col-md-6 col-sm-12">
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
                     
                        <Typography
                          variant="h6"
                          style={{
                            color: 'grey',
                            fontWeight: 'normal',
                          }}
                        >
                          <IntlMessages id="attach.document" />
                        </Typography>
                   
                    </div>
             
             
             
             
              <div className="p-2 col-lg-3 col-md-6 col-sm-12">
               
                <InputLabel
                  htmlFor="nomSelect"
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Roboto",
                    fontSize: "13px",
                  }}
                >
                  {<IntlMessages id="cours.todo" />}
                </InputLabel>
                <Select
                  defaultValue={[]}
                  name="homeworkType"
                  // options={values.HomeworkTypes}
                  // onChange={handleChangeHomeworkType}
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
              <div className="d-flex justify-content-start align-items-center flex-row col-lg-3 col-md-6 col-sm-12">
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
                     
                        <Typography
                          variant="h6"
                          style={{
                            color: 'grey',
                            fontWeight: 'normal',
                          }}
                        >
                          <IntlMessages id="attach.document" />
                        
                        </Typography>
                   
                    </div>
             
            </div>
          </div>
          <div className="p-2">
            <div className="d-flex flex-wrap flex-row justify-content-end">
              <div className="p-2">
                <Button
                  variant="contained"
                  //   onClick={cancelModal}
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
              <div className="p-2">
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
          </div>
        </div>
      </div>
    );
  }
}

export default AddCopybook;
