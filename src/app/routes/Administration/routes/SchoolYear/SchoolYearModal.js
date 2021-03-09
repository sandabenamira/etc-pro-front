import React from "react";
import { connect } from "react-redux";
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { updateShoolYear } from "../../../../../actions/SchoolYearEtabAction";

class SchoolYearModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolYearId: null,
      schoolYearName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name) => (event) => {
    let schoolYear = this.props.schoolYear.filter(
      (element) => element.id === event.target.value
    );

    this.setState({
      [name]: event.target.value,
      schoolYearName: schoolYear[0].name,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userProfile = Object.assign({}, this.props.userProfile, {
      school_year_id: this.state.schoolYearId,
      school_year_name: this.state.schoolYearName,
    });
    localStorage.setItem("school_year_name", this.state.schoolYearName);
    localStorage.setItem("school_year_id", this.state.schoolYearId);
    this.props.dispatch(updateShoolYear(userProfile));
    this.props.cancelModal();
  };
  componentWillMount() {
    this.setState({
      schoolYearId: this.props.userProfile.school_year_id,
      schoolYearName: this.props.userProfile.school_year_name,
    });
  }

  render() {   /* eslint eqeqeq: "off" */
    let { schoolYear } = this.props;
    return (
      <div className="container">
        <Auxiliary>
          <Modal isOpen={this.props.openSchoolYearModal}>
            <ModalHeader
              toggle={this.props.cancelModal}
              className="modal-box-header bg-primary text-white"
            >
              <IntlMessages id="filter.school.years" />
            </ModalHeader>
            <ModalBody>
              <form className="row" autoComplete="off">
                <div className="col-md-6">
                  <TextField
                    required
                    name="appLang_id"
                    id="appLang_id"
                    select
                    label={<IntlMessages id="list.school.year" />}
                    value={this.state.schoolYearId}
                    onChange={this.handleChange("schoolYearId")}
                    fullWidth
                    SelectProps={{}}
                    margin="normal"
                  >
                    {schoolYear.map((year, index) => (
                      <MenuItem key={index} value={year.id}>
                        {year.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </form>
              <div className="col-md-12 text-right ">
                <Button
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "10%",
                    height: "6%",
                  }}
                  variant="contained"
                  className=" bg-indigo text-white "
                  onClick={this.handleSubmit}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonAdd" />
                  }
                </Button>
                &nbsp;&nbsp;
                <Button
                  style={{
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    width: "10%",
                    height: "6%",
                  }}
                  variant="contained"
                  className=" bg-grey text-white "
                  onClick={this.props.cancelModal}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </Auxiliary>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    schoolYear: state.schoolYearEtab.schoolYear,
    userProfile: state.auth.userProfile,
  };
}

export default connect(mapStateToProps)(SchoolYearModal);
