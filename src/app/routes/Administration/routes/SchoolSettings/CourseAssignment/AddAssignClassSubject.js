import React from "react";
import IntlMessages from "../../../../../../util/IntlMessages";
import CardBox from "../../../../../../components/CardBox/index";
import Can from "../../../../../../can";
import { RoleContext } from "../../../../../../Context";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";

class AddAssignClassSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
                          <IntlMessages id="sidebar.components.courseAssignment" />
                        </b>
                      </h1>
                      &nbsp;&nbsp;&nbsp;
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="Add"
                        onClick={this.props.openAddModal}
                      >
                        {this.props.values.open ? (
                          <RemoveSharpIcon />
                        ) : (
                          <AddIcon />
                        )}
                      </Fab>
                    </div>
                    <br />
                    {this.props.values.open ? (
                      <>
                        {" "}
                        <CardBox styleName="col-lg-12">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  id="class_id"
                                  select
                                  label={<IntlMessages id="class.choice" />}
                                  value={JSON.stringify(this.props.values.class) || ""}
                                  onChange={this.props.handleChangeClass(
                                    "class_id"
                                  )}
                                  SelectProps={{}}
                                  margin="normal"
                                  defaultValue=""
                                  fullWidth
                                >
                                  {this.props.ClassSettings.map((classItem) => {
                                    let data = {
                                      id: classItem.id,
                                      name: classItem.name,
                                    };
                                    return (
                                      <MenuItem
                                        key={classItem.id}
                                        value={JSON.stringify(data)}
                                      >
                                        {data.name}
                                      </MenuItem>
                                    );
                                  })}
                                </TextField>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  id="subject_id"
                                  select
                                  label={<IntlMessages id="subject.choice" />}
                                  value={this.props.values.subject_id}
                                  onChange={this.props.handleChangeSubject(
                                    "subject_id"
                                  )}
                                  SelectProps={{}}
                                  margin="normal"
                                  defaultValue=""
                                  fullWidth
                                >
                                  {this.props.subjects.map((subject) => (
                                    <MenuItem
                                      key={subject.id}
                                      value={subject.id}
                                    >
                                      {subject.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                          </div>
                        </CardBox>
                        <div className="d-flex flex-wrap justify-content-end ">
                          <Button
                            variant="contained"
                            onClick={this.props.handleCancel}
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

export default connect()(AddAssignClassSubject);
