import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
export default class EditSubjectSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpenEdit}
          toggle={this.props.handleCancel}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.subject" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-md-6 ">
                <TextField
                  required
                  id="nameSubject"
                  label={<IntlMessages id="components.exam.subject" />}
                  value={this.props.values.nameSubject}
                  onChange={this.props.handleChange("nameSubject")}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-md-6 ">
                <TextField
                  id="wording"
                  rows={3}
                  label={<IntlMessages id="wording.subject" />}
                  value={this.props.values.wording}
                  onChange={this.props.handleChange("wording")}
                  margin="normal"
                  fullWidth
                />
              </div>

              <div className="col-md-6 ">
                <InputLabel htmlFor="name-multiple">
                  {<IntlMessages id="choice.subject.color" />}
                </InputLabel>{" "}
                <TextField
                  required
                  id="moduleSubjectId"
                  onChange={this.props.handleChange("moduleSubjectId")}
                  select
                  label={<IntlMessages id="sidebar.components.subjectModule" />}
                  value={this.props.values.moduleSubjectId}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {this.props.subjectModules.map((subjectModule) => (
                    <MenuItem key={subjectModule.id} value={subjectModule.id}>
                      {subjectModule.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div
                className="col-md-3  d-flex align-items-center pt-5 justify-content-start"
                style={{ height: "80px" }}
              >
                <InputLabel htmlFor="name-multiple">
                  {<IntlMessages id="choice.subject.color" />}
                </InputLabel>{" "}
              </div>
              <div
                className="col-md-1  d-flex align-items-center pt-5 justify-content-start"
                style={{ height: "80px" }}
              >
                <input type="color" id="head" name="head" defaultValue={this.props.values.codeColor} onChange={this.props.handleColorChange}/>
              </div>
              <div className="col-md-12 pt-5 text-left d-flex flex-wrap justify-content-end">
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
                  onClick={this.props.handleCancel}
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