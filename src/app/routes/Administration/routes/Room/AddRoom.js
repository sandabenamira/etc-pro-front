import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormHelperText from "@material-ui/core/FormHelperText";
import { addRoom } from "../../../../../actions/roomAction";
import { connect } from "react-redux";
const roleIdAdmin = 2;
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

class AddRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      ListEstablishment: [],
      name: "",
      description: "",
      schoolYear:"",
      establishment: "",
      max_number: "",
      nameError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const roleId = this.props.userProfile.role_id;
    const establishmentId = this.props.userProfile.establishment_id;
    if (roleId === roleIdAdmin || roleId === 7) {
      this.setState({ establishment: establishmentId });
    }
  }

  handleCancel() {
    this.setState({
      previewVisible: false,
      name: "",
      description: "",
      establishment_id: 0,
      schoolYear_id:""
    });
    this.props.cancelModal();
  }

  handleChange = (name) => (event) => {
    if (name==="name") {
      let nameError = false;
      nameError =
        this.props.rooms.filter(
          (element) => element.name === event.target.value.trim()
        ).length > 0;

      this.setState({ [name]: event.target.value, nameError: nameError });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  isNumber(value) {
    if (value.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.name;
    const max_number = this.state.max_number;
    const description = this.state.description;
    const establishment_id = this.state.establishment;
    const fk_id_school_year = this.props.userProfile.school_year_id;
     const data = { name, max_number, description, establishment_id,fk_id_school_year };
    this.props.addRoom(data);
    this.setState({
      previewVisible: false,
      name: "",
      max_number: "",
      description: "",
      establishment: "",
      schoolYear: ""
    });
    this.props.cancelModal();
  };
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper">
        <Auxiliary>
          <Modal isOpen={this.state.previewVisible}>
            <ModalHeader
              toggle={this.handleCancel}
              className="modal-box-header bg-primary text-white"
            >
              {<IntlMessages id="sidebar.rooms" />}
            </ModalHeader>
            <ModalBody>
              <form
                className="row"
                autoComplete="off"
                onSubmit={this.handleSubmit}
              >
                {this.props.userProfile.role_id === roleIdSuperAdmin ? (
                  <div className="col-sm-6">
                    <TextField
                      required
                      id="establishment"
                      onChange={this.handleChange("establishment")}
                      select
                      label={
                        <IntlMessages id="components.establishments.formadd.establishment" />
                      }
                      value={this.state.establishment}
                      SelectProps={{}}
                      margin="normal"
                      fullWidth
                    >
                      {this.props.ListEstablishment.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
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
                    error={this.state.max_number < 0}
                    inputProps={{ min: 0 }}
                    label={<IntlMessages id="room.max_number" />}
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
                      <IntlMessages id="components.establishments.formadd.buttonAdd" />
                    }
                  </Button>
                  <Button
                    variant="contained"
                    className="jr-btn bg-grey text-white "
                    onClick={this.handleCancel}
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
      </div>
    );
  }
}
 
const mapStateToProps = (state) => {
  return {
  
  };
};

export default connect(mapStateToProps,{addRoom})(AddRoom);
