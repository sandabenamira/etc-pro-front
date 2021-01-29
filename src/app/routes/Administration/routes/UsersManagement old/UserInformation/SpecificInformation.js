import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IntlMessages from "../../../../../../util/IntlMessages";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { UncontrolledAlert } from "reactstrap";
import RemoveIcon from '@material-ui/icons/Remove';

export default class SpecificInformation extends Component {
  render() {
    const {
      values,
      handleChange,
      handleChangeClass,
      handleChangeListSubjects,
      addNewSubject,
      handleChangestudentSection,
      classesSubjects,
      deleteChoice
    } = this.props;
    if (values.role_id === 3) {
      return (
        <>
          {values.communsuccessAlert ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {<IntlMessages id="notification.successMessage" />}
              </span>
            </UncontrolledAlert>
          ) : (
              ""
            )}
          {values.communFailedAlert ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {<IntlMessages id="edit.user.error" />}
              </span>
            </UncontrolledAlert>
          ) : (
              ""
            )}
          <div className="row">
            <div className="col-md-6">
              <TextField
                name="date_start_contract"
                id="date_start_contract"
                type="date"
                helperText={
                  <IntlMessages id="components.professor.formadd.date_start_contract" />
                }
                value={values.date_start_contract}
                onChange={handleChange("date_start_contract")}
                margin="normal"
                fullWidth
              ></TextField>
            </div>
            <div className="col-md-6">
              <TextField
                name="date_end_contract"
                id="date_end_contract"
                type="date"
                helperText={
                  <IntlMessages id="components.professor.formadd.date_end_contract" />
                }
                value={values.date_end_contract}
                onChange={handleChange("date_end_contract")}
                margin="normal"
                fullWidth
              ></TextField>
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
                <div className="col-md-1">
                  <Fab
                    size="small"
                    value={`${index}`}
                    color="primary"
                    aria-label="Add"
                    // onClick={() => addNewSubject(index + 1)}
                    onClick={() => {
                      if (objSubject.isAdded) {
                       deleteChoice(index);
                      } else {
                        addNewSubject(index + 1);
                      }
                    }}
                  >

                    {objSubject.isAdded ? (
                      <RemoveIcon />
                    ) : (
                        <AddIcon />
                      )}
                  </Fab>
                </div>
              </>
            ))}
          </div>
        </>
      );
    }
    /////////////////////////////student////////////////////
    if (values.role_id === 5) {
      return (
        <div>
          {values.communsuccessAlert ? (
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
          {values.communFailedAlert ? (
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block">
                {<IntlMessages id="edit.user.error" />}
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
                defaultValue=" "
                onChange={handleChange("level_id")}
                SelectProps={{}}
                margin="normal"
                fullWidth
              >
                {this.props.levels.map((level) => (
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
                {this.props.sections.map((section) => (
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
