import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Auxiliary from '../../../../../util/Auxiliary';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { addSchoolYearEtab } from '../../../../../actions/SchoolYearEtabAction';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
 
class AddSchoolYearEtab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      establishment_id: '',
      school_year_id: '',
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCancel() {
    this.props.cancelModal();
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const establishment_id = this.state.establishment_id;
    const school_year_id = this.state.school_year_id;
    const data = {
      establishment_id,
      school_year_id,
    };

    this.props.dispatch(addSchoolYearEtab(data));
    this.setState({
      previewVisible: false,
      establishment_id: '',
      school_year_id: '',
    });
    this.props.cancelModal();
  };

  render() {
    let establishmentList = this.props.establishments;
    let schoolYearsList = this.props.schoolYearsList;

    return (
      <div className="app-wrapper">
        <Auxiliary>
          <Modal isOpen={this.state.previewVisible}>
            <ModalHeader
              toggle={this.handleCancel}
              className="modal-box-header bg-primary text-white"
            >
              {<IntlMessages id="new.school.year" />}
            </ModalHeader>
            <br />
            <ModalBody>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        required
                        name="establishment_id"
                        id="establishment_id"
                        select
                        label={
                          <IntlMessages id="components.student.formadd.establishment" />
                        }
                        value={this.state.establishment_id}
                        onChange={this.handleChange('establishment_id')}
                        margin="normal"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option></option>
                        {establishmentList.map((establishment) => (
                          <option
                            key={establishment.id}
                            value={establishment.id}
                          >
                            {this.props.settings === 'tunisia'
                              ? establishment.ar_name
                              : establishment.name}
                          </option>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        required
                        name="school_year_id"
                        id="school_year_id"
                        select
                        label={
                          <IntlMessages id="sidebar.components.schoolYears" />
                        }
                        value={this.state.school_year_id}
                        onChange={this.handleChange('school_year_id')}
                        margin="normal"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option></option>
                        {schoolYearsList.map((schoolYear) => (
                          <option key={schoolYear.id} value={schoolYear.id}>
                            {schoolYear.name}
                          </option>
                        ))}
                      </TextField>
                    </div>
                  </div>
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

export default connect()(AddSchoolYearEtab);
