import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../util/Auxiliary';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UncontrolledAlert } from 'reactstrap';
import { isEmail } from '../../../../../constants/validationFunctions';
import {
  roleIdSuperAdmin,
  roleIdAdmin,
  roleIdProfessor,
  roleIdStudent,
  roleIdDirector,
  roleIdParent,
  roleIdSupervisor,
} from '../../../../../config/config';
const listRolesUsers = [
  {
    id: roleIdProfessor,
    label: <IntlMessages id={`toDo.professor`} />,
    value: roleIdProfessor,
  },
  {
    id: roleIdStudent,
    label: "Collaborateur",
    value: roleIdStudent,
  },
  {
    id: roleIdParent,
    label: "Chef d'agence",
    value: roleIdParent,
  },
  {
    id: roleIdSupervisor,
    label: "Responsable formation",
    value: roleIdSupervisor,
  },
];
export default class ModalImportUser extends Component {
  render() {
    const { values } = this.props;

    return (
      <Auxiliary>
        <Modal
          isOpen={values.importisOpen}
          //  toggle={this.props.handleCancel}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            {<IntlMessages id="upload.file.user" />}
          </ModalHeader>
          <ModalBody>
            {values.errorHeader ? (
              <UncontrolledAlert className="alert-addon-card   bg-danger text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block">
                  {' '}
                  il y a une erreur au niveau des colonne{' '}
                  {values.errorHeaderColumn.map((element) => element + ' , ')}{' '}
                </span>
              </UncontrolledAlert>
            ) : (
              ''
            )}
            {values.fileUploaded ? (
              <UncontrolledAlert className="alert-addon-card bg-success   text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block">fichier est prêt pour le traitement</span>
              </UncontrolledAlert>
            ) : (
              ''
            )}
            <form className="row" onSubmit={this.props.handleSubmitImport}>
              <div className=" col-sm-12 col-lg-12 col-md-12 ">
                <div className="col-md-12 text-left  d-flex flex-wrap justify-content-end">
                  <div className="col-md-12 col-lg-12 col-sm-12 pt-3 pb-3">
                    <InputLabel
                      htmlFor="nomSelect"
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: '18px',
                      }}
                      required
                    >
                      {<IntlMessages id="role.user.type.import" />}
                    </InputLabel>
                    <Select
                      required
                      // options={this.props.options}
                      options={listRolesUsers}
                      onChange={this.props.handleChangeRole}
                      id="role"
                      name="role"
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
                  </div>
                  <div className="col-sm-12 col-lg-12 col-md-12  mb-3  ">
                    <input
                      id="input"
                      type="file"
                      onChange={(e) => this.props.onDrop(e)}
                      disabled={this.props.values.idRole == ''}
                    />
                  </div>
                  <div className="col-sm-12 col-lg-12 col-md-12  mb-3 d-flex flex-wrap justify-content-end">
                    <Button
                      variant="contained"
                      style={{
                        borderBottomLeftRadius: '16px',
                        borderBottomRightRadius: '16px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        width: '80px',
                        height: '40px',
                      }}
                      className=" bg-indigo text-white "
                      onClick={this.props.checkDataFile}
                    >
                      check
                    </Button>
                  </div>
                  <div className="col-sm-12 col-lg-12 col-md-12  mb-3">
                    <TableContainer component={Paper}>
                      <Table style={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <IntlMessages id={`check.validity`} />
                            </TableCell>
                            <TableCell>
                              <IntlMessages
                                id={`components.establishments.formadd.name_director`}
                              />
                            </TableCell>
                            <TableCell>
                              <IntlMessages id={`appModule.name`} />
                            </TableCell>
                            <TableCell>
                              {' '}
                              <IntlMessages id={`appModule.email`} />
                            </TableCell>
                            <TableCell align="center">
                              <IntlMessages id={`statut.import`} />
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.FormatedUserList.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {row.name == null ||
                                row.surname == null ||
                                isEmail(row.email) === false ? (
                                  <i
                                    className="zmdi zmdi-circle zmdi-hc-lg "
                                    style={{ color: 'red' }}
                                  >
                                    {row.indexFile}
                                  </i>
                                ) : (
                                  <i
                                    className="zmdi zmdi-circle zmdi-hc-lg "
                                    style={{ color: 'green' }}
                                  >
                                    {row.indexFile}
                                  </i>
                                )}
                              </TableCell>
                              <TableCell>
                                {row.name == null ? <h2>invalide</h2> : row.name}
                              </TableCell>
                              <TableCell>
                                {row.surname == null ? <h2>invalide</h2> : row.surname}
                              </TableCell>
                              <TableCell>
                                {isEmail(row.email) === false ? <h2>mail invalid</h2> : row.email}
                              </TableCell>
                              <TableCell align="center">
                                {!values.importDone ? (
                                  '--'
                                ) : values.importStatus.includes(row.indexFile) ? (
                                  <i style={{ color: 'green' }}>done </i>
                                ) : (
                                  <i style={{ color: 'red' }}>error </i>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
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
                    disabled={values.FormatedUserList.length == 0}
                  >
                    <IntlMessages id="components.user.import" />
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
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
