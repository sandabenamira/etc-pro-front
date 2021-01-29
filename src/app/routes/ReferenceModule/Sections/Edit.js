import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";

class Edi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namesubjectModule: "",
      id: null,
    };
  }


  render() {
    return (
      <Auxiliary>
        <Modal isOpen={this.props.isOpen} toggle={this.props.closeModal}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.module.section" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-6">
                <TextField
                  required
                  variant="outlined"
                  id="namesubjectModule"
                  label={<IntlMessages id="subjectModule.formadd.name" />}
                  value={this.props.values.nameSection}
                  onChange={this.props.handleChange("nameSection")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6 ">
                <TextField
                  required
                  id="establishment"
                  onChange={this.props.handleChange("level_id")}
                  select
                  label={<IntlMessages id="components.note.niveau" />}
                  value={this.props.values.level_id}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                  variant="outlined"
                >
                  {this.props.levels.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
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
              <div className="col-md-12 text-left ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  type="submit"
                >
                  {
                    <IntlMessages id="components.establishments.formModify.buttonModify" />
                  }
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.closeModal}
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
const mapStateToProps = (state) => {
  return {
    levels: state.levelsReducer.levels,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Edit);
