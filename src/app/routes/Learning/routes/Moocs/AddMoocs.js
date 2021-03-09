import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import CardBox from "../../../../../components/CardBox/index";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class AddClassesSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div>
                  <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                    <div className="d-flex justify-content-start align-items-center">
                      <h1>
                        <b>
                          <IntlMessages id="add.new.moocs" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.props.openAddModal}
                      >
                        {this.props.values.isOpen ? (
                          <RemoveSharpIcon />
                        ) : (
                          <AddIcon />
                        )}
                      </Fab>
                    </div>
                    <br />
                    {this.props.values.isOpen ? (
                      <>
                        {" "}
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="col-md-4 ">
                                <TextField
                                  required
                                  id="topicMoocs"
                                  label={<IntlMessages id="subject.message" />}
                                  value={this.props.values.topicMoocs}
                                  onChange={this.props.handleChange(
                                    "topicMoocs"
                                  )}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4 ">
                                <TextField
                                  required
                                  id="subject_id"
                                  onChange={this.props.handleChangeSubject(
                                    "itemSubject"
                                  )}
                                  select
                                  label={
                                    <IntlMessages id="components.moocs.course" />
                                  }
                                  value={JSON.stringify(
                                    this.props.values.itemSubject
                                  )}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth
                                >
                                  {this.props.subjects.map((subject) => {
                                    let data = {
                                      subjectId: subject.id,
                                      subjectName: subject.name,
                                    };
                                    return (
                                      <MenuItem
                                        key={subject.id}
                                        value={JSON.stringify(data)}
                                      >
                                        {data.subjectName}
                                      </MenuItem>
                                    );
                                  })}
                                </TextField>
                              </div>
                              <div className="col-md-4 ">
                                <FormControl className="w-100">
                                  <InputLabel htmlFor="name-multiple">
                                    {"Classe de formation"}
                                  </InputLabel>
                                  <Select
                                    required
                                    multiple
                                    name="idAssignement"
                                    value={this.props.values.moocsAssignment}
                                    onChange={this.props.handleChangeClass(
                                      "idAssignement"
                                    )}
                                    input={<Input id="name-multiple" />}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          maxHeight:
                                            ITEM_HEIGHT * 4.5 +
                                            ITEM_PADDING_TOP,
                                          width: 200,
                                        },
                                      },
                                    }}
                                  >
                                    {this.props.courseAssignment.map(
                                      (courseAssignmentItem, index) => {
                                         
                                        return (
                                          <MenuItem
                                            key={index}
                                            value={courseAssignmentItem}
                                          >
                                            {courseAssignmentItem.class.name}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="col-md-4 ">
                                <TextField
                                  id="SessionMoocs"
                                  label={
                                    <IntlMessages id="add.input.Session" />
                                  }
                                  value={this.props.values.SessionMoocs}
                                  onChange={this.props.handleChange(
                                    "SessionMoocs"
                                  )}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4 ">
                                <TextField
                                  id="prerequisite"
                                  label={
                                    <IntlMessages id="add.input.prerequisite" />
                                  }
                                  value={this.props.values.prerequisite}
                                  onChange={this.props.handleChange(
                                    "prerequisite"
                                  )}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <br /> <br />
                              <br /> <br />
                              <div className=" d-flex align-items-start  justify-content-start pt-4">
                                <div className="col-md-6  ">
                                  <label
                                    htmlFor="files"
                                    className="btn"
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                      fontWeight: "bold",
                                      backgroundColor: "#4C19A9",
                                      borderRadius: "16px",
                                    }}
                                  >
                                    <strong>
                                      {
                                        <IntlMessages id="components.establishments.formadd.selectVideo" />
                                      }
                                    </strong>
                                  </label>{" "}
                                </div>
                                <div className="col-md-6 ">
                                  <label htmlFor="files" className="btn">
                                    {this.props.values.moocsText}
                                  </label>
                                  <div
                                    className="col-md-4 pt-4 align-items-left justify-content-left"
                                    style={{ left: "80px" }}
                                  >
                                    <input
                                      id="files"
                                      type="file"
                                      style={{ visibility: "hidden" }}
                                      onChange={(e) => this.props.onDrop(e)}
                                      accept=".mp4,.webm"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>{" "}
                              <div className="d-flex col-md-12 flex-column">
                                <label
                                  htmlFor="educationalGoals"
                                  style={{ fontSize: "20px", color: "#0B4786" }}
                                >
                                  <IntlMessages id="add.input.educational.goals" />
                                </label>
                                <textarea
                                  rows="3"
                                  value={
                                    this.props.values.educationalGoals || ""
                                  }
                                  onChange={this.props.handleChange(
                                    "educationalGoals"
                                  )}
                                  style={{
                                    borderRadius: "20px",
                                    marginTop: "10px",
                                  }}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </CardBox>
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.openAddModal}
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "20%",
                            }}
                          >
                            {
                              <IntlMessages id="components.establishments.formadd.buttonCancel" />
                            }
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            className="bg-grey text-white "
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "6%",
                            }}
                            onClick={this.props.handleArchive}
                          >
                            {<IntlMessages id="service.button.archive" />}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            variant="contained"
                            style={{
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              width: "10%",
                              height: "6%",
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="service.button.publish" />
                          </Button>
                        </div>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              )}
            />
          )}
        </RoleContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moocsLoading: state.MoocsReducer.moocsLoading,
  };
};
export default connect(mapStateToProps)(AddClassesSettings);
