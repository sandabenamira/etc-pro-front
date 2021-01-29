import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../../../util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { getLevelListFromEstabType } from "../../../../../../actions/classLevelAction";
import { getSectionFromLevel } from "../../../../../../actions/sectionAction";
import { subjectsByLevelBySection } from "../../../../../../actions/subjectAction";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { UncontrolledAlert } from "reactstrap";

export default class SpecificInformation extends Component {
 
  render() {
    console.log('====================================');
    console.log(this.props.classList);
    console.log('====================================');
    const {
      values,
      handleChangeClass,
      handleChangeListSubjects,
      handleChangestudentLevel,
      handleChangeListSubjectsAdd,
      handleChangeStartContract,
      handleChangeEndContract,
      addNewSubject,
      handleChangestudentSection,
      classList,
      subjects,
      classesSubjects
    } = this.props;
    const levelsbyestablishment = getLevelListFromEstabType(
      this.props.classLevels,
      values.estabType
    );
    console.log("SpecificInformation -> render -> subjects", subjects)
    console.log("SpecificInformation -> render -> subjects", values.listOfSubjects)
    console.log("SpecificInformation -> render -> subjects", values.addedListSubject)

    

    
    if (values.role_id === 3) {
      return (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label={
                      <IntlMessages id="components.professor.formadd.date_start_contract" />
                    }
                    fullWidth
                    id="date_start_contract"
                    name="date_start_contract"
                    value={values.date_start_contract}
                    onChange={handleChangeStartContract}
                    format="DD-MM-YYYY"
                    autoOk
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label={
                      <IntlMessages id="components.professor.formadd.date_end_contract" />
                    }
                    fullWidth
                    id="date_end_contract"
                    name="date_end_contract"
                    value={values.date_end_contract}
                    onChange={handleChangeEndContract}
                    format="DD-MM-YYYY"
                    autoOk
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>
          <div className="row">
            {values.listOfSubjects.map((objSubject, index) => (
              <>
                <div className="col-md-6" key={index}>
                  <div className="form-group">
                    <TextField
                      required
                      id={`${index}`}
                      name="classId"
                      select
                      multiple
                      label={<IntlMessages id="components.student.formadd.classe" />}
                      value={objSubject.assignmentClassSubject.fk_id_class_v4}
                      onChange={(event) =>
                        handleChangeListSubjects(
                          event,
                          "classId",
                          objSubject.id,
                          index
                        )
                      }
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {classList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="form-group">
                    <TextField
                      disabled={objSubject.sectionDisabled}
                      id={`${index}`}
                      name="section_id"
                      select
                      label={
                        <IntlMessages id="components.class.level.input.label.section" />
                      }
                      value={objSubject.section_id}
                      onChange={(event) =>
                        handleChangeListSubjects(event, "section_id", index)
                      }
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {getSectionFromLevel(
                        this.props.classSections,
                        objSubject.level_id
                      ).map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div> */}

                <div className="col-md-5">
                  <TextField
                    required
                    name="subject_id"
                    id={`${index}`}
                    select
                    label={
                      <IntlMessages id="sidebar.components.lesson" />
                    }
                    value={objSubject.assignmentClassSubject.fk_id_subject_v4}
                    onChange={(event) =>
                      handleChangeListSubjects(
                        event,
                        "subject_id",
                        objSubject.id,
                        index
                      )
                    }
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                {index === values.listOfSubjects.length - 1 &&
                values.addedListSubject.length === 0 ? (
                  <div className="col-md-1">
                    <Fab
                      size="small"
                      value={`${index}`}
                      color="primary"
                      aria-label="Add"
                      onClick={() => addNewSubject(index + 1)}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                ) : null}
              </>
            ))}
            {values.added
              ? values.addedListSubject.map((objSubject, index) => (
                  <>
                       <div className="col-md-6" key={index}>
                  <div className="form-group">
                    <TextField
                      required
                      id={`${index}`}
                      name="classId"
                      select
                      label={<IntlMessages id="todo.labels" />}
                      value={objSubject.classId}
                      onChange={(event) =>
                        handleChangeListSubjects(event, "classId", index)
                      }
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {classesSubjects.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>



                <div className="col-md-5">
                  <TextField
                    required
                    name="subject_id"
                    id={`${index}`}
                    select
                    label={
                      <IntlMessages id="sidebar.components.lesson" />
                    }
                    value={objSubject.subject_id}
                    onChange={(event) =>
                      handleChangeListSubjects(event, "subject_id", index)
                    }
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {objSubject.subjects.map((item) => (
                      <MenuItem key={item.subject.id} value={item.subject.id}>
                        {item.subject.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                  

                    {index === values.addedListSubject.length - 1 ? (
                      <div className="col-md-1">
                        <Fab
                          size="small"
                          value={`${index}`}
                          color="primary"
                          aria-label="Add"
                          onClick={() =>
                            addNewSubject(values.listOfSubjects.length)
                          }
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                    ) : null}
                  </>
                ))
              : null}
          </div>
        </>
      );
    }
    /////////////////////////////student////////////////////
    if (values.role_id === 5) {
      return (
        <div>
          {values.successStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {<IntlMessages id="edit.user.message" />}
              </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-md-6">
              <TextField
                variant="outlined"
                required
                name="level_id"
                id="level_id"
                select
                label={<IntlMessages id="components.note.niveau" />}
                value={values.level_id}
                onChange={handleChangestudentLevel("level_id")}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {levelsbyestablishment.map((level) => (
                  <MenuItem key={level.id} value={level.id}>
                    {level.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-md-6">
              <TextField
                variant="outlined"
                required
                disabled={values.Disable_studentsection}
                name="section_id"
                id="section_id"
                select
                label={
                  <IntlMessages id="components.class.level.input.label.section" />
                }
                value={values.section_id}
                onChange={handleChangestudentSection("section_id")}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {values.studentsectionByLevels.map((section) => (
                  <MenuItem key={section.id} value={section.id}>
                    {section.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                variant="outlined"
                required
                name="class_id"
                id="class_id"
                select
                label={<IntlMessages id="components.student.formadd.classe" />}
                value={values.class_id}
                onChange={handleChangeClass("class_id")}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {values.studentClassesByLevelSectionID.map((classe) => (
                  <MenuItem key={classe.id} value={classe.id}>
                    {classe.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <br />
            <br />
          </div>
        </div>
      );
    }
  }
}
