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
import MenuItem from "@material-ui/core/MenuItem";
export default class AddClassesSettings extends React.Component {
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
                          <IntlMessages id="add.new.class" />
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
                        <CardBox styleName=" text-black  ">
                          <div className="d-flex flex-column  ">
                            <div className="d-flex flex-wrap  align-items-center ">
                              <div className="col-md-4 ">
                                <TextField
                                  required
                                  id="nameClassSettings"
                                  label={
                                    <IntlMessages id="components.student.formadd.classe" />
                                  }
                                  value={this.props.values.nameClassSettings}
                                  onChange={this.props.handleChange(
                                    "nameClassSettings"
                                  )}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                              <div className="col-md-4 ">
                                <TextField
                                  required
                                  id="level_id"
                                  onChange={this.props.handleChangeLevel(
                                    "level_id"
                                  )}
                                  select
                                  label={
                                    <IntlMessages id="components.note.niveau" />
                                  }
                                  value={this.props.values.level_id}
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
                              {/* <div className="col-md-4 ">
                                <TextField
                                  id="section_id"
                                  onChange={this.props.handleChange(
                                    "section_id"
                                  )}
                                  select
                                  label={
                                    <IntlMessages id="components.class.level.input.label.section" />
                                  }
                                  value={this.props.values.section_id}
                                  SelectProps={{}}
                                  margin="normal"
                                  fullWidth
                                >
                                  {this.props.sections.map((section) => (
                                    <MenuItem
                                      key={section.id}
                                      value={section.id}
                                    >
                                      {section.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div> */}
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
                            disabled={
                               this.props.values.level_id == null ||
                              this.props.values.nameClassSettings == ""
                                ? true
                                : false
                            }
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
