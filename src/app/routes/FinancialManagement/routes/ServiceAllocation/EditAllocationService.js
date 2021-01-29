import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Auxiliary from '../../../../../util/Auxiliary';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Row } from 'reactstrap';
import Select from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';
import EditAllocationItem from './ServiceAllocationComp/EditAllocationItem';
import {
  addAllocationService,
  editAllocationService,
  getAllocationServiceByEstablishment,
} from '../../../../../actions/AllocationServiceAction';
import { connect } from 'react-redux';
import ServiceItem from './ServiceAllocationComp/ServiceItem';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { UncontrolledAlert } from 'reactstrap';

class EditAllocationService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      alerteIcon: false,
      services: [],
      allocationItemEdit: {},

      idServicesAffected: [],
      servicesSelected: [],
    };
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.alertIcon = this.alertIcon.bind(this);
  }
  alertIcon(itemSelected) {
    console.log(this.props.servicesSelected, 'alertIcon');

     const found = this.props.servicesSelected.find(
      (element) => element.fk_id_service == itemSelected.id
    );
    if (found !== undefined) {
      if (found.id != '') {
        this.setState({
          alerteIcon: true,
        });
        setTimeout(() => {
          this.setState({
            alerteIcon: false,
          });
        }, 1500);
      } else {
        this.props.handleIcon(itemSelected);
      }
    }
  }
  handleChangeMonth = (monthId, element) => {
    let tab = element.allocation_month;

    var index = tab.findIndex((element) => element == parseInt(monthId, 10));
    if (index == -1) {
      tab.push(parseInt(monthId, 10));
     } else {
      tab.splice(index, 1);
     }
  };

  render() {
    let { services, allocationItemEdit, idServicesAffected, servicesSelected } = this.props;

    return (
      <Auxiliary>
        <Modal isOpen={this.props.openEdit}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            Modifier
            <IconButton className="text-white" onClick={this.props.cancel}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: '5%', paddingRight: '5%' }}>
            <form autoComplete="off">
              <div>
                <Row>
                  <h3 style={{ color: 'blue' }}>Information élève</h3>
                </Row>
                <br />
                <Row>
                  <div>
                    <InputLabel htmlFor="idSelect">ID</InputLabel>
                  </div>
                  <div className="col-md-2">
                    <Select
                      name="student_id"
                      id="student_id"
                      styles={{
                        control: (base) => ({
                          ...base,
                          '&:hover': { borderColor: 'gray' }, // border style on hover
                          border: '1px solid lightgray', // default border color
                          boxShadow: 'none', // no box-shadow
                          borderRadius: 20,
                        }),
                      }}
                      defaultValue={{
                        value: servicesSelected[0].fk_id_student,
                        label: servicesSelected[0].fk_id_student,
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <InputLabel htmlFor="nomSelect" style={{ paddingLeft: '10px' }}>
                      Nom
                    </InputLabel>
                    <Select
                      id="nomSelect"
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
                      defaultValue={{
                        value: servicesSelected[0].fk_id_student,
                        label: allocationItemEdit.name + ' ' + allocationItemEdit.surname,
                      }}
                    />
                  </div>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: '100%',
                      margin: 'auto',
                      marginTop: '5%',
                      marginBottom: '5%',
                      border: '1px dashed #979A9A',
                      paddingLeft: '-100%',
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: 'blue' }}>Prestations</h3>
                </Row>
                {this.state.alerteIcon ? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                      <span className="icon-addon alert-addon">
                        <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                      </span>
                      <span className="d-inline-block"> {'Prestation déja affectée'}</span>
                    </UncontrolledAlert>
                  </div>
                ) : (
                  ''
                )}
                <Row>
                  {services.map((element) => {
                    let color;
                    color = idServicesAffected.indexOf(element.id);

                    return (
                      <div className=" col-md-3 d-flex flex-row bd-highlight align-items-start justify-content-start  mb-3 ">
                        <div className="p-2 d-flex align-items-center justify-content-start ">
                          {' '}
                          <i
                            id={element.id}
                            className={`${element.path_img_service}`}
                            style={{
                              color: color !== -1 && color !== undefined ? 'blue' : 'black',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              if (color !== -1 && color !== undefined) {
                                this.alertIcon(element);
                              } else {
                                this.props.handleIcon(element);
                              }
                            }}
                          ></i>
                        </div>
                        <div
                          className="p-2   d-flex align-items-center "
                          style={{ color: 'black' }}
                        >
                          {element.name_fr_service}
                        </div>
                      </div>
                    );
                  })}
                </Row>

                <br />
                <Row>
                  <div className="col-lg-12 col-md-12 ">
                    {servicesSelected.map((servicesSelectedItem, index) => {
                      return (
                        <div key={index}>
                          <EditAllocationItem
                            key={index}
                            item={servicesSelectedItem}
                            // handleChangeMonth={this.handleChangeMonth}
                          />
                          <br></br>
                        </div>
                      );
                    })}
                  </div>
                </Row>
                <Row style={{ float: 'right' }}>
                  <Button
                    variant="contained"
                    style={{
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                    }}
                    onClick={this.props.cancel}
                  >
                    Annuler
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    disabled={this.state.student_id == '' || servicesSelected.length == 0}
                    variant="contained"
                    style={{
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                    }}
                    className=" bg-indigo text-white "
                    onClick={this.props.HandleSubmitAllocationService}
                  >
                    Modifier{' '}
                  </Button>
                </Row>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
  };
}

export default connect(mapStateToProps, {
  addAllocationService,
  editAllocationService,
  getAllocationServiceByEstablishment,
})(EditAllocationService);
