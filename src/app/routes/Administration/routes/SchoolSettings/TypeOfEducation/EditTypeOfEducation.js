import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../../util/Auxiliary";
import { connect } from 'react-redux';

class EditTypeOfEducation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {   /* eslint eqeqeq: "off" */
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
          toggle={this.props.handleCancel}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.module.education.type" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-6">
                <TextField
                  required
                  id="nameTypeEducation"
                  label={<IntlMessages id="subjectModule.formadd.name" />}
                  value={this.props.values.nameTypeEducation}
                  onChange={this.props.handleChange("nameTypeEducation")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-12 text-left  d-flex flex-wrap justify-content-end" >
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
const mapStateToProps = (state) => {
  return {};
};

export default connect(
  mapStateToProps,
  {  }
)(EditTypeOfEducation);
