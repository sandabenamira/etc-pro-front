import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../../util/Auxiliary";
import { connect } from "react-redux";

class EditExamType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameExamType: "",
      coefficient: "",
      id: null,
    };
  }
  componentDidMount() {
    this.setState({
      nameExamType: this.props.examType.nameExamType,
      id: this.props.examType.id,
    });
  }
  render() {
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
          toggle={this.props.handleToggle}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.module.subjects" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-6">
                <TextField
                  required
                  id="nameExamType"
                  label={<IntlMessages id="examType.formadd.name" />}
                  value={this.props.values.nameExamType}
                  onChange={this.props.handleChange("nameExamType")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-4   ">
                <TextField
                  type="number"
                  required
                  id="coefficient"
                  label={<IntlMessages id="coefficient.formadd.name" />}
                  value={this.props.values.coefficient}
                  onChange={this.props.handleChange("coefficient")}
                  margin="normal"
                  fullWidth
                  error={this.props.values.coefficient < 0}
                />
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
                  disabled={
                    this.props.values.coefficient <= null ||
                    this.props.values.nameExamType == null
                      ? true
                      : false
                  }
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
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(EditExamType);
