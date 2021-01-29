import React, { Component } from "react";
import IntlMessages from "../../../../../../util/IntlMessages";
import Auxiliary from "../../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import CardBox from "../../../../../../components/CardBox/index";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

class NewFileModal extends Component {
  render() {
    return (
      <Auxiliary>
        <Modal isOpen={true}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="service.button.file" />}
          </ModalHeader>
          <br />
          <ModalBody>
            <form autoComplete="off">
              <div className="row">
                <CardBox
                  // heading={<IntlMessages id="component.student.info.general" />}
                  styleName="col-lg-12 text-primary"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          required
                          name="fileName"
                          id="fileName"
                          type="Text"
                          inputProps={{ min: 0 }}
                          label={
                            <IntlMessages id="components.class.file.name" />
                          }
                          onChange={this.props.handleChange("fileName")}
                          value={this.props.values.fileName}
                          margin="normal"
                          fullWidth
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <TextField
                          id="folderId"
                          name="folderId"
                          select
                          value={this.props.values.folderId}
                          defaultValue=" "
                          onChange={this.props.handleChange("folderId")}
                          SelectProps={{}}
                          helperText={<IntlMessages id="ticket.name.folder" />}
                          margin="normal"
                          fullWidth
                        >
                          {this.props.folders.map((itemClass) => (
                            <MenuItem key={itemClass.id} value={itemClass.id}>
                              {itemClass.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <InputLabel htmlFor="name-multiple">
                          {
                            <IntlMessages id="components.class.choix.file.name" />
                          }
                        </InputLabel>{" "}
                        <br /> <br />
                        <label
                          htmlFor="files"
                          className="btn"
                          style={{
                            cursor: "pointer",
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "#4C19A9",
                            borderRadius: "4rem",
                          }}
                        >
                          <strong>
                            {
                              <IntlMessages id="components.establishments.formadd.selectImage" />
                            }
                          </strong>
                        </label>{" "}
                        <label htmlFor="files" className="btn">
                          {/* {values.inputText} */}
                        </label>
                        <input
                          id="files"
                          type="file"
                          style={{ visibility: "hidden" }}
                          //onChange={(e) => this.props.onDrop(e)}
                          accept=".jpg, .jpeg, .png"
                        />
                      </div>
                    </div>
                  </div>
                </CardBox>
              </div>
              <div className="col-md-12 text-right ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  onClick={this.props.addNewFile}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonAdd" />
                  }
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.handleCancel}
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

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    classLevels: state.ClassLevels.remoteLevels,
    classSections: state.classSections.remoteSections,
    classes: state.classes,
    settings: state.settings.locale,
    folders: state.SupportCoursReducer.remoteSupportCours,
  };
}
export default connect(mapStateToProps, {})(NewFileModal);
