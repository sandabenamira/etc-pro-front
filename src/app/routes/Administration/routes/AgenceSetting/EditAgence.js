import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
 import MenuItem from "@material-ui/core/MenuItem";
export default class EditClassSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.values);
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
          toggle={this.props.handleAnnule}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.module.class" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-4">
                <TextField
                  required
                  id="namesubjectModule"
                  label={
                    <IntlMessages id="components.student.formadd.classe" />
                  }
                  value={this.props.values.nameClassSettings}
                  onChange={this.props.handleChange("nameClassSettings")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-4">
                <TextField
                  required
                  select
                  id="levelId"
                  label={<IntlMessages id="components.note.niveau" />}
                  value={this.props.values.levelId}
                  onChange={this.props.handleChangeLevel("levelId")}
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
              <div className="col-sm-3">
                <TextField
                  required
                  select
                  id="sectionId"
                  label={
                    <IntlMessages id="components.class.level.input.label.section" />
                  }
                  value={this.props.values.sectionId}
                  onChange={this.props.handleChange("sectionId")}
                  margin="normal"
                  fullWidth
                >
                  {this.props.values.sectionsByLevelId.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="col-sm-12">
                <h4>
                  <font color="red">*</font>{" "}
                  {<IntlMessages id="component.required_fields" />}
                </h4>
              </div>
              <div className="col-md-12 text-left d-flex flex-wrap justify-content-end">
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100px",
                    height: "40px",
                  }}
                  className=" bg-indigo text-white "
                  type="submit"
                >
                  <IntlMessages id="components.establishments.formModify.buttonModify" />
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "100px",
                    height: "40px",
                  }}
                  className=" bg-grey text-white "
                  type="submit"
                >
                  <IntlMessages id="components.establishments.formadd.buttonCancel" />
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
