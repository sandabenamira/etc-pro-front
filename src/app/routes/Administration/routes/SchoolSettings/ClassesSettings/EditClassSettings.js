import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../../util/Auxiliary';
 import Select from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';

export default class EditClassSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /* eslint eqeqeq: "off" */
     return (
      <Auxiliary>
        <Modal isOpen={this.props.values.isOpen} toggle={this.props.closeModal}>
          <ModalHeader className="modal-box-header bg-primary text-white">{<IntlMessages id="modal.modif.module.class" />}</ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-sm-4">
                <TextField
                  required
                  id="nameClassSettings"
                  label={<IntlMessages id="components.student.formadd.classe" />}
                  value={this.props.values.nameClassSettings}
                  onChange={this.props.handleChange('nameClassSettings')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-sm-4">
                <InputLabel required htmlFor="name-class">
                  {'Formation'}
                </InputLabel>
                <Select
                  options={this.props.subjectList}
                  onChange={this.props.handleChangeSubject('subjectId')}
                  value={this.props.values.subjectId}
                  id="subjectId"
                  name="subjectId"
                  styles={{
                    control: (base) => ({
                      ...base,
                      marginTop: '10px',
                      '&:hover': { borderColor: 'gray' }, // border style on hover
                      border: '1px solid lightgray', // default border color
                      boxShadow: 'none', // no box-shadow
                      borderTopStyle: 'none',
                      borderRightStyle: 'none',
                      borderLeftStyle: 'none',
                      borderRadius: ' none',
                    }),
                  }}
                />{' '}
                {/* <TextField
                  required
                  select
                  id="subjectId"
                  label="Formation"
                  value={this.props.values.subjectId}
                  onChange={this.props.handleChange('subjectId')}
                  margin="normal"
                  fullWidth
                >
                  {this.props.subjectList.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </TextField> */}
              </div>
              <div className="col-sm-4">
                <InputLabel required htmlFor="name-class">
                  {'Formation'}
                </InputLabel>
                <Select
                  options={this.props.levelList}
                  isDisabled
                  value={this.props.values.levelId}
                  id="subjectId"
                  name="subjectId"
                  styles={{
                    control: (base) => ({
                      ...base,
                      marginTop: '10px',
                      '&:hover': { borderColor: 'gray' }, // border style on hover
                      border: '1px solid lightgray', // default border color
                      boxShadow: 'none', // no box-shadow
                      borderTopStyle: 'none',
                      borderRightStyle: 'none',
                      borderLeftStyle: 'none',
                      borderRadius: ' none',
                    }),
                  }}
                />{' '}
              </div>
              <div className="col-sm-12">
                <h4>
                  <font color="red">*</font> {<IntlMessages id="component.required_fields" />}
                </h4>
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
                  onClick={this.props.closeModal}
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
