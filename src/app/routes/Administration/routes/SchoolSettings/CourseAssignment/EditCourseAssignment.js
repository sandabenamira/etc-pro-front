import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../../util/Auxiliary';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
class EditCourseAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    const { values } = this.props;
    return (
      <Auxiliary>
        <Modal isOpen={this.props.isOpen} toggle={this.props.handleCancel}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="modal.modif.room" />}
          </ModalHeader>
          <ModalBody>
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="col-md-6">
                <div className="form-group">
                  <FormControl className="w-100">
                    <InputLabel required htmlFor="name-class">
                      {<IntlMessages id="class.choice" />}
                    </InputLabel>
                    <Select
                      // options={this.props.ClassSettingsList}
                      // onChange={this.props.handleChangeClass}
                      isDisabled
                      defaultValue={values.classItemEdit}
                      id="classRoom"
                      name="classRoom"
                      styles={{
                        control: (base) => ({
                          ...base,
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
                  </FormControl>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <FormControl className="w-100">
                    <InputLabel required htmlFor="name-multiple">
                      {<IntlMessages id="subject.choice" />}
                    </InputLabel>
                    <Select
                      options={this.props.subjectList}
                      onChange={this.props.handleChangeSubject}
                      defaultValue={values.subjectsSelected}
                      isMulti
                      id="subject"
                      name="subject"
                      styles={{
                        control: (base) => ({
                          ...base,
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
                  </FormControl>
                </div>
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
                  onClick={this.props.handleCancel}
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
