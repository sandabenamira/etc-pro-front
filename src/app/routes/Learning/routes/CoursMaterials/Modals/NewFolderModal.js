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

class NewFolderModal extends Component {
  render() {
    console.log("cccccccccccccccccccccccccccccccc", this.props.classSettings);
    return (
      <Auxiliary>
        <Modal isOpen={true}>
          <ModalHeader
            // toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="service.button.new.folder" />}
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
                          name="FolderName"
                          id="FolderName"
                          type="Text"
                          inputProps={{ min: 0 }}
                          label={
                            <IntlMessages id="components.class.folder.name" />
                          }
                          onChange={this.props.handleChange("FolderName")}
                          value={this.props.values.FolderName}
                          margin="normal"
                          fullWidth
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mt-3">
                      <div className="form-group">
                        <TextField
                          id="class_id"
                          name="class_id"
                          select
                          required
                          value={this.props.values.class_id}
                          onChange={this.props.handleChange("class_id")}
                          SelectProps={{}}
                          helperText={<IntlMessages id="ticket.name.class" />}
                          margin="normal"
                          fullWidth
                        >
                          {this.props.classSettings.map((itemClass) => (
                                      <MenuItem
                                        key={itemClass.id}
                                        value={itemClass.id}
                                      >
                                        {itemClass.name}
                                      </MenuItem>
                                    ))}
                        </TextField>
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
                  onClick={this.props.addNewFolder}
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
    classSettings: state.ClassSettingsReducer.classSettings,
    settings: state.settings.locale,
  };
}
export default connect(mapStateToProps, {})(NewFolderModal);
