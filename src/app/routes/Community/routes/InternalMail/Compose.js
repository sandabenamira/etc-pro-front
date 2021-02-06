import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import Moment from "moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../../util/IntlMessages";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from "../../../../../config/config";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import _ from "lodash";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const listRole = [
  // { id: 0, label: <IntlMessages id={`permission.role.all`} /> },
  { id: roleIdAdmin, label: <IntlMessages id={`role.admin`} /> },
  {
    id: roleIdDirector,
    label: <IntlMessages id={`component.etablishments.info.director`} />,
  },
  { id: roleIdSupervisor, label: <IntlMessages id={`role.supervisor`} /> },
  { id: roleIdProfessor, label: <IntlMessages id={`toDo.professor`} /> },
  {
    id: roleIdStudent,
    label: <IntlMessages id={`userStuppDisplay.Student`} />,
  },
  { id: roleIdParent, label: <IntlMessages id={`userStuppDisplay.Parent`} /> },
];
class ComposeMail extends React.Component {
  constructor() {
    super();
    this.state = {
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      message: "",
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { onMailSend, onClose, user, values } = this.props;
    const { to, subject, message, editorState } = this.state;
    return (
      <Modal
        className="modal-box modal-box-mail"
        toggle={onClose}
        isOpen={this.props.open}
        style={{ zIndex: 2600 }}
      >
        <ModalHeader className="modal-box-header bg-primary text-white">
          <IntlMessages id={"add.new.message"} />
          <IconButton className="text-white" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <div className="modal-box-content d-flex flex-column">


          <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12">
              <TextField
                id="roleId"
                name="roleId"
                select
                value={values.roleId}
                onChange={this.props.handleChangeRole}
                SelectProps={{}}
                label={<IntlMessages id={`stuppUser.steps.role`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                <MenuItem key={0} value={0}>
                  <IntlMessages id={`permission.role.all`} />
                </MenuItem>
                {listRole.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {(values.roleId === roleIdAdmin ||
              values.roleId === roleIdSupervisor ||
              values.roleId === roleIdDirector) && (
              <div class="p-2 bd-highlight col-lg-4 col-md-3 col-sm-12 mt-3">
                <FormControl className="w-100">
                  <InputLabel htmlFor="name-multiple">
                    {<IntlMessages id="users.list" />}
                  </InputLabel>
                  <Select
                    required
                    multiple
                    name="idAssignement"
                    value={values.adminsIds}
                    disableUnderline
                    onChange={this.props.handleChangeAdminsIds}
                    input={<Input id="name-multiple" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                          width: 200,
                        },
                      },
                    }}
                  >
                    {values.users.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.profileId}>
                          {item.name + " " + item.surname}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            )}

            {values.roleId == roleIdProfessor && (
              <>
                <div class="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12">
                  <TextField
                    id="idClasse"
                    name="idClasse"
                    select
                    defaultValue=""
                    // value={this.state.classId}
                    onChange={this.props.handleChangeClass}
                    SelectProps={{}}
                    label={<IntlMessages id={`components.note.class`} />}
                    InputProps={{ disableUnderline: true }}
                    margin="normal"
                    fullWidth
                  >
                    <MenuItem key={0} value="all">
                      {<IntlMessages id={`userStuppDisplay.all`} />}
                    </MenuItem>
                    {this.props.classes.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div class="p-2 bd-highlight col-lg-4 col-md-3 col-sm-12 mt-3">
                  <FormControl className="w-100">
                    <InputLabel htmlFor="name-multiple">
                      {<IntlMessages id="component.chips.list.professors" />}
                    </InputLabel>
                    <Select
                      required
                      multiple
                      name="idAssignement"
                      disableUnderline
                      value={values.professorsIds}
                      onChange={this.props.handleChangeProfessorIds}
                      input={<Input id="name-multiple" />}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 200,
                          },
                        },
                      }}
                    >
                      {values.professorsFiltred.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.profileId}>
                            {item.name + " " + item.surname}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            )}

            {(values.roleId === roleIdStudent ||
              values.roleId === roleIdParent) && (
              <>
                <div className="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12">
                  <TextField
                    id="idLevel"
                    name="idLevel"
                    select
                    value={values.filterLevelStudentId}
                    onChange={this.props.handleChangeFilterStudent(
                      "filterLevelStudentId"
                    )}
                    SelectProps={{}}
                    label={<IntlMessages id={`components.note.niveau`} />}
                    InputProps={{ disableUnderline: true }}
                    margin="normal"
                    fullWidth
                  >
                    <MenuItem key={0} value={0}>
                      <IntlMessages id={`extraPages.all`} />
                    </MenuItem>
                    {this.props.levels.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12">
                  <TextField
                    id="idClasse"
                    name="idClasse"
                    select
                    // value={values.filterClassStudentId}
                    onChange={this.props.handleChangeFilterStudent(
                      "filterClassStudentId"
                    )}
                    SelectProps={{}}
                    label={<IntlMessages id={`components.note.class`} />}
                    InputProps={{ disableUnderline: true }}
                    margin="normal"
                    fullWidth
                  >
                    <MenuItem key={0} value={0}>
                      <IntlMessages id={`extraPages.all`} />
                    </MenuItem>
                    {values.classStudentFilter.map((classeItem) => (
                      <MenuItem key={classeItem.id} value={classeItem.id}>
                        {classeItem.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12 mt-3">
                  <FormControl className="w-100">
                    <InputLabel htmlFor="name-multiple">
                      {<IntlMessages id="component.students.list" />}
                    </InputLabel>
                    <Select
                      required
                      multiple
                      name="idAssignement"
                      value={values.studentsIds}
                      disableUnderline
                      onChange={this.props.handleChangeStudentsIds}
                      input={<Input id="name-multiple" />}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 200,
                          },
                        },
                      }}
                    >
                      {values.studentFiltred.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.profileId}>
                            {item.name + " " + item.surname}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                {values.roleId === roleIdParent && (
                  <div className="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12 mt-3">
                    <FormControl className="w-100">
                      <InputLabel htmlFor="name-multiple">
                        {<IntlMessages id="list.parents" />}
                      </InputLabel>
                      <Select
                        required
                        multiple
                        name="idAssignement"
                        value={values.parentsIds}
                        disableUnderline
                        onChange={this.props.handleChangeParentsIds}
                        input={<Input id="name-multiple" />}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                              width: 200,
                            },
                          },
                        }}
                      >
                        {values.parentFiltred.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.profileId}>
                              {item.name + " " + item.surname}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </>
            )}
          </div>

          <TextField
            required
            id="required"
            label= {<IntlMessages id="mail.object" />}
            defaultValue=""
            onChange={this.props.handleChangeSubject}
            margin="normal"
          />

          <div className="p-2">
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 200,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              // editorState={editorState}
              wrapperClassName="demo-wrapper"
              // onEditorStateChange={this.onEditorStateChange}
              onChange={this.props.handleChangeEditor}
            />
          </div>
        </div>

        <div className="modal-box-footer">
          <div>
            <input
              type="file"
              className="d-none"
              accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
              id="add-file"
              multiple
              onChange={(e) => this.props.attachFile(e)}
            />
            <label htmlFor="add-file" className="d-flex  ">
              <i className="zmdi zmdi-attachment mr-2 zmdi-hc-2x" /> <IntlMessages id={"attach.document"} />
             
            </label>
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-start align-items-center  mb-4 p-4 col-12">
            {values.nameFiles.map((mailFile, index) => (
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
                      this.props.deleteFile(mailFile);
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
                    {mailFile} &nbsp;
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          <Button
            disabled={(values.subject === "") || (_.isEmpty(values.receivers))}
            variant="contained"
            color="primary"
            onClick={() => {
              onClose();
              this.props.sendMail();
             
            }}
          >
            <i className="zmdi zmdi-mail-send mr-2" />
            <IntlMessages id={"button.send.message"} />
          </Button>
        </div>
      </Modal>
    );
  }
}

export default ComposeMail;
