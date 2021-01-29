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
    const { onMailSend, onClose, user } = this.props;
    const { to, subject, message ,editorState } = this.state;
    return (
      <Modal
        className="modal-box modal-box-mail"
        toggle={onClose}
        isOpen={this.props.open}
        style={{ zIndex: 2600 }}
      >
        <ModalHeader className="modal-box-header bg-primary text-white">
        <IntlMessages id={`msg.mail`} />
          <IconButton className="text-white" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <div className="modal-box-content d-flex flex-column">
          {/* <TextField
            id="required"
            label="To*"
            onChange={(event) => this.setState({to: event.target.value})}
            defaultValue={to}
            margin="normal"/> */}

          <div class="d-flex flex-wrap flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight col-lg-3 col-md-3 col-sm-12">
              <TextField
                id="idClasse"
                name="idClasse"
                select
                // value={this.state.classId}
                // onChange={this.handleChangeFilter(
                //   "classId"
                // )}
                SelectProps={{}}
                label={<IntlMessages id={`components.note.class`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                <MenuItem key={0} value="all">
                  {<IntlMessages id={`userStuppDisplay.all`} />}
                </MenuItem>
                {/* {this.state.classList.map((option) => (
                                          <MenuItem
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </MenuItem>
                                        ))} */}

                <MenuItem
                // key={option.id}
                // value={option.id}
                >
                  7B1
                </MenuItem>
              </TextField>
            </div>
            <div class="p-2 bd-highlight  col-lg-3 col-md-3 col-sm-12">
              <TextField
                id="idClasse"
                name="idClasse"
                select
                // value={this.state.classId}
                // onChange={this.handleChangeFilter(
                //   "classId"
                // )}
                SelectProps={{}}
                label={<IntlMessages id={`mail.enseignant`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                <MenuItem key={0} value="all">
                  {<IntlMessages id={`userStuppDisplay.all`} />}
                </MenuItem>
                {/* {this.state.classList.map((option) => (
                                          <MenuItem
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </MenuItem>
                                        ))} */}

                <MenuItem
                // key={option.id}
                // value={option.id}
                >
                  KHLIFI Bouraoui
                </MenuItem>
              </TextField>
            </div>
            <div class="p-2 bd-highlight  col-lg-3 col-md-3 col-sm-12">
              <TextField
                id="idClasse"
                name="idClasse"
                select
                // value={this.state.classId}
                // onChange={this.handleChangeFilter(
                //   "classId"
                // )}
                SelectProps={{}}
                label={<IntlMessages id={`mail.admin`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                <MenuItem key={0} value="all">
                  {<IntlMessages id={`userStuppDisplay.all`} />}
                </MenuItem>
                {/* {this.state.classList.map((option) => (
                                          <MenuItem
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </MenuItem>
                                        ))} */}

                <MenuItem
                // key={option.id}
                // value={option.id}
                >
                KHLIFI Hamza
                </MenuItem>
              </TextField>
            </div>
          </div>
 
 <TextField
            id="required"
            label="Objet"
            onChange={(event) => this.setState({ subject: event.target.value })}
            value={subject}
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
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              onEditorStateChange={this.onEditorStateChange}
            />
         
          </div>

        </div>

        <div className="modal-box-footer">
          <Button className="attach-file jr-btn text-muted">
            <i className="zmdi zmdi-attachment mr-2 zmdi-hc-2x" /> Joindre
          </Button>

          <Button
            disabled={to === ""}
            variant="contained"
            color="primary"
            onClick={() => {
              onClose();
              onMailSend({
                id: "15453a06c08fb021776",
                from: {
                  name: user.name,
                  avatar: user.avatar,
                  email: user.email,
                },
                to: [
                  {
                    name: to,
                    email: to,
                  },
                ],
                subject: subject,
                message: message,
                time: Moment().format("DD MMM"),
                read: false,
                starred: false,
                important: false,
                hasAttachments: false,
                folder: 1,
                selected: false,
                labels: [],
              });
            }}
          >
            <i className="zmdi zmdi-mail-send mr-2" /> 
            <IntlMessages id={`Envoyer`} />
          </Button>
        </div>
      </Modal>
    );
  }
}

export default ComposeMail;
