import React from 'react';
import CardBox from '../../../../../components/CardBox/index';
import InputLabel from '@material-ui/core/InputLabel';
import Select from 'react-select';
import ServiceItem from './ServiceAllocationComp/ServiceItem';
import Button from '@material-ui/core/Button';
import AllocationItem from './ServiceAllocationComp/AllocationItem';
import {
  addAllocationService,
  studentExist,
  getAllocationServiceByEstablishment,
} from '../../../../../actions/AllocationServiceAction';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from '../../../../../util/IntlMessages';
import { UncontrolledAlert } from 'reactstrap';
import _ from 'lodash';
class AddAllocationService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showListePrestation: false,
      frequency: '',
      servicesSelected: [],
      student_id: 0,
      options: [],
      idStudents: [],
      alerteEmpty: false,
      messageAlerte: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStudent = this.handleChangeStudent.bind(this);
    this.handleIcon = this.handleIcon.bind(this);
    this.HandleSubmitAllocationService = this.HandleSubmitAllocationService.bind(this);
    this.showPrestaion = this.showPrestaion.bind(this);
  }

  handleIcon(idSelected) {
    let servicesSelected = [];
    let serviceExistant = [];

    let services = this.state.servicesSelected;
    servicesSelected = this.props.services.filter((service) => service.id===idSelected)[0];
    let serviceObj = {};

    serviceObj = servicesSelected;

    if (servicesSelected.fk_id_frequency===7) {
      serviceObj.monthSelected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else {
      serviceObj.monthSelected = [];
    }

    serviceExistant = services.filter((service) => service.id===idSelected);

    let serviceDelete = services.filter((service) => service.id != idSelected);

    if (serviceExistant.length > 0) {
      this.setState({
        servicesSelected: serviceDelete,
      });
    } else {
      services.push(serviceObj);

      this.setState({
        servicesSelected: services,
      });
    }
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeStudent = (selectedOption) => {
    let idStudentsAffected = _.map(this.props.allocationService, function(el) {
      if (el.services.length > 0) {
        return el.services[0].fk_id_student;
      }
    });
    let alerte;
    alerte = idStudentsAffected.indexOf(selectedOption.value) >= 0;

    if (alerte) {
      this.props.openAddModal();
      this.props.studentExist(this.state.options[selectedOption.key].label);
    } else {
    }
    this.setState({
      student_id: selectedOption.value,
    });
  };

  HandleSubmitAllocationService = () => {
    if (this.state.student_id==='' || this.state.servicesSelected.length===0) {
      this.setState({
        alerteEmpty: true,
        messageAlerte: 'il faut choisir un élève et une prestation au moins ',
      });
      setTimeout(() => {
        this.setState({
          alerteEmpty: false,
          messageAlerte: '',
        });
      }, 3000);
    } else {
      let monthExisted = true;
      let data = [];
      let prestationWithoutMonths = '';

      this.state.servicesSelected.map((element) => {
        var allocationData = {};
        allocationData.fk_id_student = this.state.student_id;
        allocationData.fk_id_service = element.id;
        allocationData.allocation_month = element.monthSelected;
        if (element.monthSelected.length===0) {
          prestationWithoutMonths = element.name_fr_service;
        }
        monthExisted = monthExisted && element.monthSelected.length > 0;

        data.push(allocationData);
      });
      if (monthExisted) {
        this.props.addAllocationService(
          data,
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        );
        this.setState({
          showListePrestation: false,
          frequency: '',
          servicesSelected: [],
          student_id: 0,
        });
         
        this.props.openAddModal();
      } else {
        this.setState({
          alerteEmpty: true,
          messageAlerte:
            " Vous n'avez pas choisir un mois pour le service  " + prestationWithoutMonths,
        });
        setTimeout(() => {
          this.setState({
            alerteEmpty: false,
            messageAlerte: '',
          });
        }, 3000);
      }
    }
  };
  showPrestaion() {
    this.setState((previousState) => ({
      showListePrestation: !previousState.showListePrestation,
    }));
  }
  componentDidMount() {
    if (this.state.student_id === 0) {
      let options = [];
      let idStudents = [];
      this.props.studentList.forEach((student, index) => {
        let option = {
          label: student.profile.user.name + ' ' + student.profile.user.surname,
          value: student.id,
          key: index,
        };
        options.push(option);

        let ids = {
          label: student.id,
          value: student.id,
          key: index,
        };

        idStudents.push(ids);
      });
      this.setState({ options, idStudents });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.studentList !== this.props.studentList) {
      if (this.state.student_id === 0) {
        let options = [];
        let idStudents = [];
        this.props.studentList.forEach((student, index) => {
          let option = {
            label: student.profile.user.name + ' ' + student.profile.user.surname,
            value: student.id,
            key: index,
          };
          options.push(option);

          let ids = {
            label: student.id,
            value: student.id,
            key: index,
          };

          idStudents.push(ids);
        });
        this.setState({ options, idStudents });
      }
    }
  }

  render() {   /* eslint eqeqeq: "off" */
    let { services, studentList } = this.props;
    let { options, idStudents } = this.state;
    var lengthServices;
    if (this.state.showListePrestation===false) {
      lengthServices = 4;
    } else {
      lengthServices = services.length;
    }

    return (
      <CardBox
        heading={
          <b>
            {' '}
            <IntlMessages id="new.allocation.service" />
          </b>
        }
        styleName="col-lg-12 text-primary"
      >
        {this.state.alerteEmpty ? (
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.state.messageAlerte} </span>
            </UncontrolledAlert>
          </div>
        ) : (
          ''
        )}
        <div class="d-flex flex-column bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <p
              style={{
                fontFamily: 'Arial Helvetica sans-serif',
                color: '#979A9A',
              }}
            >
              <IntlMessages id="call.search" />
            </p>{' '}
          </div>
          <div class="p-2 bd-highlight">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="p-2 bd-highlight">
                <InputLabel htmlFor="idSelect">
                  <IntlMessages id="id" />
                </InputLabel>
              </div>
              <div class="p-2 bd-highlight col-md-2 col-sm-2 col-lg-2">
                <Select
                  value={
                    idStudents[
                      _.findIndex(idStudents, {
                        value: this.state.student_id,
                      })
                    ]
                  }
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
                  onChange={this.handleChangeStudent}
                  options={idStudents}
                />
              </div>
              <div class="p-2 bd-highlight">
                {' '}
                <IntlMessages id="components.professor.formadd.name" />
              </div>
              <div class="p-2 bd-highlight col-md-2 col-sm-2 col-lg-2">
                <Select
                  value={
                    options[
                      _.findIndex(options, {
                        value: this.state.student_id,
                      })
                    ]
                  }
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
                  onChange={this.handleChangeStudent}
                  options={options}
                />{' '}
              </div>
            </div>
          </div>

          <hr
            style={{
              width: '100%',
              margin: 'auto',
              marginTop: '5%',
              marginBottom: '5%',
              border: '1px dashed #979A9A',
              paddingLeft: 'none',
              paddingRight: '-10px',
            }}
          />

          <h3>
            <b>Prestation</b>
          </h3>

          <div className="row col-lg-12 col-md-12"></div>
          <div className="row col-lg-2 col-md-2"></div>

          <div className="row col-lg-10 col-md-10">
            {services.slice(0, lengthServices).map((element) => (
              <ServiceItem key={element.id} item={element} handleIcon={this.handleIcon} />
            ))}
          </div>
          <div className="col-lg-12 col-md-12 d-flex flex-column align-items-center ">
            {this.state.showListePrestation===false ? (
              <Button
                variant="contained"
                onClick={this.showPrestaion}
                style={{
                  borderRadius: '35px',
                  backgroundColor: 'white',
                  padding: '14px',
                  border: '0.5px solid',
                }}
              >
                {this.state.showListePrestation===false
                  ? ` Afficher toutes les prestations`
                  : ` masquer les prestations`}
              </Button>
            ) : (
              ''
            )}
          </div>
          <div className="col-lg-2 col-md-2"></div>
          <br />
          <br />
          <div className="col-lg-12 col-md-12 ">
            {this.state.servicesSelected.map((element, index) => {
              return (
                <div>
                  <AllocationItem item={element} key={index} />
                  <br></br>
                </div>
              );
            })}
          </div>
          <div className="col-lg-12 col-md-12 text-right " style={{ marginTop: '5%' }}>
            <Button
              variant="contained"
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
              onClick={this.props.openAddModal}
            >
              <IntlMessages id="components.classes.formadd.buttonCancel" />
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
              className=" bg-indigo text-white "
              onClick={this.HandleSubmitAllocationService}
            >
              <IntlMessages id="note.button.save" />
            </Button>
          </div>
        </div>
      </CardBox>
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
  studentExist,
  getAllocationServiceByEstablishment,
})(AddAllocationService);
