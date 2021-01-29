import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
export default class EditLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
     return (
      <Auxiliary>
        <Modal isOpen={this.props.isOpen} toggle={this.props.handleToggle}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.level" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-6">
                <TextField
                  required
                  id="namelevel"
                  label={<IntlMessages id="stuppUser.formadd.name" />}
                  value={this.props.values.namelevel}
                  onChange={this.props.handleChange("namelevel")}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  required
                  id="fk_id_education_type_v4"
                  name="fk_id_education_type_v4"
                  onChange={this.props.handleChange("fk_id_education_type_v4")}
                  select
                  label={
                    <IntlMessages id="sidebar.components.typeOfEducation" />
                  }
                  value={this.props.values.fk_id_education_type_v4}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {this.props.educationTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
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
                  onClick={this.props.handleAnnule}
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
