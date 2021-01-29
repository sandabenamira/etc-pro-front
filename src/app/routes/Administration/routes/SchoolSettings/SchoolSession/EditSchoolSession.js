import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../../util/Auxiliary';
import { connect } from 'react-redux';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import MenuItem from '@material-ui/core/MenuItem';

const schoolSessionList = [
  {
    value: 'Trimestre 1',
    id: 1,
  },
  {
    value: 'Trimestre 2',
    id: 2,
  },
  {
    value: 'Trimestre 3',
    id: 3,
  },
  {
    value: 'Semestre 1',
    id: 4,
  },
  {
    value: 'Semestre 2',
    id: 5,
  },
];
class EditSchoolSession extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Auxiliary>
        <Modal
          isOpen={this.props.values.isOpen}
          toggle={this.props.handleToggle}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.module.school.session" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-6">
                <TextField
                  required
                  id="nameSchoolSession"
                  label={<IntlMessages id="sidebar.components.sessionSchool" />}
                  select
                  value={this.props.values.nameSchoolSession}
                  onChange={this.props.handleChange('nameSchoolSession')}
                  margin="normal"
                  fullWidth
                >
                  {schoolSessionList.map((schoolSession) => (
                    <MenuItem
                      key={schoolSession.id}
                      value={schoolSession.value}
                    >
                      {schoolSession.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-sm-6">
                <TextField
                  required
                  select
                  id="nameSchoolSession"
                  label={
                    <IntlMessages id="sidebar.components.typeOfEducation" />
                  }
                  value={JSON.stringify(this.props.values.educationItem)}
                  onChange={this.props.handleChangeEducationType(
                    'fk_id_education_type_v4'
                  )}
                  margin="normal"
                  fullWidth
                >
                  {this.props.educationTypes.map((educationType) => {
                    let data = educationType;

                    return (
                      <MenuItem
                        key={educationType.id}
                        value={JSON.stringify(data)}
                      >
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </div>
              <div className="col-sm-6   ">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    helperText={
                      <IntlMessages id="components.class.formadd.startdate" />
                    }
                    clearable
                    margin="normal"
                    fullWidth
                    id="start_date"
                    name="start_date"
                    value={this.props.values.start_date}
                    onChange={this.props.handleChangeStartDate}
                    format="DD-MM-YYYY"
                    autoOk
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-sm-6   ">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    helperText={
                      <IntlMessages id="components.class.formadd.enddate" />
                    }
                    clearable
                    margin="normal"
                    fullWidth
                    id="end_date"
                    name="end_date"
                    value={this.props.values.end_date}
                    onChange={this.props.handleChangeEndDate}
                    format="DD-MM-YYYY"
                    autoOk
                    minDate={this.props.values.start_date}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-md-12 text-left d-flex flex-wrap justify-content-end">
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    width: '100px',
                    height: '40px',
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
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    width: '100px',
                    height: '40px',
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

export default connect()(EditSchoolSession);
