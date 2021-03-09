import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { editRoom } from "../../../../../actions/roomAction";
import { connect } from "react-redux";

const roleIdSuperAdmin = 1;
const Error = ({ test }) => {
  if (test < 0) {
    return (
      <div className="form-message invalid" style={{ color: "red" }}>
        <IntlMessages id="room.numberError" />
      </div>
    );
  }
  return <div className="form-message invalid">&nbsp;</div>;
};
class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      name: "",
      description: "",
      establishment_id: 0,
      max_number: "",
      status: "",
      id: 0,
      nameError: false,
      schoolYear: ""

    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      name: this.props.room.name,
      description: this.props.room.description,
      max_number: this.props.room.max_number,
      establishment_id: this.props.room.establishment_id,
      status: this.props.room.status,
      id: this.props.room.id,
      schoolYear: this.props.room.fk_id_school_year

    });
  }

  handleAnnule() {
    this.props.cancelModal();
  }
  handleChange = (name) => (event) => {
    if (name==="name") {
      let nameError = false;

      if (this.props.room.name === event.target.value.trim()) {
        nameError = false;
      } else {
        nameError =
          this.props.rooms.filter(
            (element) => element.name === event.target.value.trim()
          ).length > 0;
      }

      this.setState({ [name]: event.target.value, nameError: nameError });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  handleToggle() {
    this.props.cancelModal();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      max_number: this.state.max_number,
      description: this.state.description,
      establishment_id: this.state.establishment_id,
      status: this.state.status,
      id: this.state.id,
      fk_id_school_year: this.state.schoolYear

    };

    this.props.editRoom(data);
    this.setState({ previewVisible: false });
  };
  render() {   /* eslint eqeqeq: "off" */
    return (
      <Auxiliary>
        <Modal
          isOpen={this.state.previewVisible}
          toggle={this.handleToggle.bind(this)}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.room" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.handleSubmit}>
              {this.props.userProfile.role_id === roleIdSuperAdmin ? (
                <div className="col-sm-6">
                  <TextField
                    required
                    id="establishment"
                    select
                    label={
                      <IntlMessages id="components.student.formadd.establishment" />
                    }
                    value={this.state.establishment_id}
                    onChange={this.handleChange("establishment_id")}
                    SelectProps={{}}
                    margin="normal"
                    fullWidth
                  >
                    {this.props.ListEstablishment.map((establishment) => (
                      <MenuItem key={establishment.id} value={establishment.id}>
                        {establishment.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              ) : (
                ""
              )}
              <div className="col-sm-6">
                <TextField
                  required
                  name="name"
                  id="name"
                  label={<IntlMessages id="room.name" />}
                  onChange={this.handleChange("name")}
                  value={this.state.name}
                  margin="normal"
                  fullWidth
                  error={this.state.nameError}
                />
                <FormHelperText error={this.state.nameError}>
                  {this.state.nameError ? (
                    <IntlMessages id="room.nameError" />
                  ) : (
                    ""
                  )}
                </FormHelperText>
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  name="max_number"
                  id="max_number"
                  type="number"
                  label={<IntlMessages id="room.max_number" />}
                  error={this.state.max_number < 0}
                  inputProps={{ min: 0 }}
                  onChange={this.handleChange("max_number")}
                  value={this.state.max_number}
                  margin="normal"
                  fullWidth
                />
                <Error test={this.state.max_number} />
              </div>
              <div className="col-sm-6">
                <TextField
                  name="description"
                  id="description"
                  label={<IntlMessages id="room.description" />}
                  onChange={this.handleChange("description")}
                  value={this.state.description}
                  margin="normal"
                  fullWidth
                />
              </div>

              <br />
              <br />
              <br />
              <br />
              <br />
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
                  disabled={this.state.nameError}
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
                  onClick={this.handleAnnule}
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
  };
};

export default connect(mapStateToProps,{editRoom})(EditRoom);