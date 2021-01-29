import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

class EditCourseAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  render() {
    const { values } = this.props;

    return (
      <Auxiliary>
        <Modal isOpen={this.props.isOpen} toggle={this.props.handleToggle}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.room" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-6">
                <TextField
                  id="classId"
                  select
                  label={<IntlMessages id="class.choice" />}
                  value={values.classId}
                  onChange={this.props.handleChange("classId")}
                  SelectProps={{}}
                  margin="normal"
                  defaultValue=""
                  fullWidth
                >
                  {this.props.ClassSettings.map((classItem) => (
                    <MenuItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-6">
                <TextField
                  id="subjectId"
                  select
                  label={<IntlMessages id="subject.choice" />}
                  value={values.subjectId}
                  onChange={this.props.handleChange("subjectId")}
                  SelectProps={{}}
                  margin="normal"
                  defaultValue=""
                  fullWidth
                >
                  {this.props.subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </TextField>
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


export default connect()(EditCourseAssignment);
