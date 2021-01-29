import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import CardBox from "../../../../../components/CardBox/index";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export default class EditMoocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
     
    const { values } = this.props;
   

     return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
         
        >
          <ModalHeader className="modal-box-header bg-primary text-white"
           toggle={this.props.handleAnnule}>
            {<IntlMessages id="modal.modif.module.class" />}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={this.props.handleSubmit}>
              <CardBox styleName=" text-black  ">
                <div className="row">
                  <div className="d-flex flex-column  ">
                    <div className="d-flex flex-wrap  align-items-center ">
                      <div className="col-md-4 ">
                        <TextField
                          required
                          id="topicMoocs"
                          label={<IntlMessages id="subject.message" />}
                          value={this.props.values.topicMoocs}
                          onChange={this.props.handleChange("topicMoocs")}
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
                          label={<IntlMessages id="components.moocs.course" />}
                          value={this.props.values.itemSubject}
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
                            {<IntlMessages id="ticket.name.class" />}
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
                                    ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                  width: 200,
                                },
                              },
                            }}
                          >
                            {this.props.values.courseAssignment.map(
                              (courseAssignmentItem, index) => {
                                 
                                return (
                                  <MenuItem
                                    key={index}
                                    value={courseAssignmentItem }
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
                          label={<IntlMessages id="add.input.Session" />}
                          value={this.props.values.SessionMoocs}
                          onChange={this.props.handleChange("SessionMoocs")}
                          margin="normal"
                          fullWidth
                        />
                      </div>
                      <div className="col-md-4 ">
                        <TextField
                          id="prerequiste"
                          label={<IntlMessages id="add.input.prerequisite" />}
                          value={this.props.values.prerequiste}
                          onChange={this.props.handleChange("prerequiste")}
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
                          value={this.props.values.educationalGoals || ""}
                          onChange={this.props.handleChange("educationalGoals")}
                          style={{
                            borderRadius: "20px",
                            marginTop: "10px",
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBox>
              <div className="d-flex flex-wrap justify-content-end ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="bg-indigo text-white "
                  type="submit"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "15%",
                    height: "6%",
                  }}
                >
                  {
                    <IntlMessages id="components.establishments.formModify.buttonModify" />
                  }
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  className="bg-grey text-white "
                  onClick={this.props.handleAnnule}
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "15%",
                    height: "6%",
                  }}
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