import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../../util/Auxiliary';
import MenuItem from '@material-ui/core/MenuItem';
export default class EditGroupes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { values } = this.props;
    console.log(values.itemEdit, 'itemEdit');
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
                  id="group"
                  name="group"
                  label={<IntlMessages id="stuppUser.formadd.groupe" />}
                  value={this.props.values.group}
                  onChange={this.props.handleChange('group')}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="classId"
                  name="classId"
                  onChange={this.props.handleChange('classId')}
                  select
                  label={<IntlMessages id="sidebar.components.class" />}
                  value={this.props.values.classId}
                  SelectProps={{}}
                  margin="normal"
                  fullWidth
                >
                  {/* {this.props.educationTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))} */}

                  {[0, 1, 2].map((type) => (
                    <MenuItem>{'type.name'}</MenuItem>
                  ))}
                </TextField>
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
