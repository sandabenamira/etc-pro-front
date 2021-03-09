import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class AssignmentSubjectSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    const {
      values,
      levels,
      addNewAssignment,
      handleChangeListSubjects,
      handleChangeListSubjectsSection,
      handleChangeAssignment,
      handleSubmitAssignment,
      handleCancel,
    } = this.props;
    return (
      <Auxiliary>
        <Modal isOpen={values.isOpenAssignment}>
          <ModalHeader
            className="modal-box-header bg-primary text-white"
            toggle={handleCancel}
          >
            {<IntlMessages id="assignment.subjects.levels.sections" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={handleSubmitAssignment}>
              {values.listOfAssignment.map((objSubject, index) => (
                <>
                  <div className="col-md-2 ">
                    <FormControlLabel
                      id={`${index}`}
                      control={
                        <GreenCheckbox
                          checked={objSubject.isChecked}
                          onChange={(event) =>
                            handleChangeAssignment(event, "isChecked", index)
                          }
                          name="isChecked"
                        />
                      }
                      label={<IntlMessages id="userStuppDisplay.all" />}
                    />
                  </div>

                  <div className="col-md-4 ">
                    <TextField
                      id={`${index}`}
                      name="levelId"
                      required={!objSubject.isLevelDisabled}
                      disabled={objSubject.isLevelDisabled}
                      select
                      label={<IntlMessages id="sidebar.components.levels" />}
                      value={objSubject.levelId}
                      onChange={(event) =>
                        handleChangeListSubjects(event, "levelId", index)
                      }
                      SelectProps={{}}
                      fullWidth
                    >
                      {levels.map((level) => (
                        <MenuItem key={level.id} value={level.id}>
                          {level.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <div className="col-md-4 ">
                    <TextField
                      id={`${index}`}
                      disabled={objSubject.sectionDisabled}
                      required={!objSubject.sectionDisabled}
                      name="sectionId"
                      select
                      label={<IntlMessages id="sidebar.components.sections" />}
                      value={objSubject.sectionId}
                      onChange={(event) =>
                        handleChangeListSubjectsSection(
                          event,
                          "sectionId",
                          index
                        )
                      }
                      SelectProps={{}}
                      fullWidth
                    >
                      {values.sections.map((section) => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="col-md-1">
                    <Fab
                      size="small"
                      // value={`${index}`}
                      color="primary"
                      aria-label="Add"
                      onClick={() => addNewAssignment(index + 1)}
                    >
                      <AddIcon />
                    </Fab>
                  </div>
                </>
              ))}
              <br />

              <div className="col-md-12 text-right ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  style={{
                    borderBottomLeftRadius: "18px",
                    borderBottomRightRadius: "18px",
                    borderTopLeftRadius: "18px",
                    borderTopRightRadius: "18px",
                    width: "20%",
                    height: "40%",
                  }}
                  type="submit"
                >
                  {<IntlMessages id="button.save.registreAppel" />}
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  style={{
                    borderBottomLeftRadius: "18px",
                    borderBottomRightRadius: "18px",
                    borderTopLeftRadius: "18px",
                    borderTopRightRadius: "18px",
                    width: "20%",
                    height: "40%",
                  }}
                  onClick={handleCancel}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(AssignmentSubjectSetting);
