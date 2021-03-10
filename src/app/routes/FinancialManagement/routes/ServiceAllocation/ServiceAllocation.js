import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from 'react-redux';
import IconWithTextCard from '../ServiceAllocation/ServiceAllocationComp/IconWithTextCard';
import TextField from '@material-ui/core/TextField';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ListServiceAllocation from './ListServiceAllocation';
import AddAllocationService from './AddAllocationService';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { getServiceV2 } from '../../../../../actions/ServiceAction';
import { getAllocationServiceByEstablishment } from '../../../../../actions/AllocationServiceAction';
import { UncontrolledAlert } from 'reactstrap';
import { fetchStudentByEstablishmentId } from '../../../../../actions/studentAction';
import CardBox from '../../../../../components/CardBox/index';

class ServiceAllocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      studentList: [],
      classesList: [],
      classLevel: null,
      sections: [],
      allocationServicesList: [],
      sectionStatus: false,
      idSection: '',
      idClasse: '',
      classSection: '',
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSection = this.handleChangeSection.bind(this);
  }

  handleChange = (name) => (event) => {
    let allocationServerFiltred = this.props.allocationService.filter(
      (element) => element.services[0].service_v2.fk_id_schol_year_v2 === event.target.value
    );
    this.setState({
      [name]: event.target.value,
      allocationServicesList: allocationServerFiltred,
    });
  };

  handleChangeSection = (name) => (event) => {
    let allocationServerFiltred = this.props.allocationService.filter(
      (element) => element.Class.section_id === event.target.value
    );
    this.setState({
      [name]: event.target.value,
      allocationServicesList: allocationServerFiltred,
    });
  };

  handleChangeClass = (name) => (event) => {
    let obj = JSON.parse(event.target.value);
    this.setState({
      classSection: event.target.value,
      idClasse: obj.classId,
      idSection: obj.sectionId,
    });
    let allocationServerFiltred = this.props.allocationService.filter(
      (element) => element.Class.id === event.target.value
    );

    let sectionFiltred = this.props.sections.filter((element) => element.id === obj.sectionId);

    this.setState({
      [name]: event.target.value,
      allocationServicesList: allocationServerFiltred,
      sections: sectionFiltred,
    });
  };

  handleChangeLevel = (name) => (event) => {
    this.setState({ [name]: event.target.value, idSection: null });
    let allocationServerFiltred = this.props.allocationService.filter(
      (element) => element.level.id === event.target.value
    );

    let classesListFiltred = this.props.classes.filter(
      (element) => element.fk_id_level_v4 === event.target.value
    );

    this.setState({
      allocationServicesList: allocationServerFiltred,
      classesList: classesListFiltred,
    });
  };

  componentWillMount() {
    this.props.dispatch(
      getServiceV2(this.props.userProfile.establishment_id, this.props.userProfile.school_year_id)
    );
    this.props.dispatch(
      getAllocationServiceByEstablishment(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
    this.props.dispatch(
      fetchStudentByEstablishmentId(
        this.props.userProfile.establishment_id,
        this.props.userProfile.school_year_id
      )
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userProfile.school_year_id !== this.props.userProfile.school_year_id) {
      this.props.dispatch(
        getServiceV2(this.props.userProfile.establishment_id, this.props.userProfile.school_year_id)
      );
      this.props.dispatch(
        getAllocationServiceByEstablishment(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        )
      );
      this.props.dispatch(
        fetchStudentByEstablishmentId(
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        )
      );
    }
    if (prevProps.classes !== this.props.classes) {
      this.setState({
        classesList: this.props.classes,
      });
    }
    if (prevProps.allocationService !== this.props.allocationService) {
      this.setState({
        allocationServicesList: this.props.allocationService,
      });
    }

    if (prevProps.classLevels !== this.props.classLevels) {
      this.setState({
        sectionStatus: true,
      });
    }

    if (prevProps.students !== this.props.students) {
      this.setState({
        studentList: this.props.students,
      });
    }
  }

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  render() {   /* eslint eqeqeq: "off" */
     
    let { services, classLevels } = this.props;
    let { classesList, sections, allocationServicesList } = this.state;
    // let allserviceAllocated = [];
    // allocationServicesList.map((data, index) => allserviceAllocated.push(data.services));
    // allserviceAllocated = allserviceAllocated.flat();
    // let serviceAllocated = _.intersectionWith(
    //   services,
    //   allserviceAllocated,
    //   (a, b) => a.id===b.fk_id_service
    // );

    let detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../ServiceAllocation/Icone/project-icon.png'),
        title: services.length,
        subTitle: 'Prestations',
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../ServiceAllocation/Icone/tasks-icon.png'),
        title: allocationServicesList.length,
        subTitle: 'Affectations',
      },
      {
        cardColor: 'info',
        imageIcon: require('../ServiceAllocation/Icone/teams-icon.png'),
        title: this.state.studentList.length,
        subTitle: 'Inscrit',
      },
      {
        cardColor: 'warning',
        imageIcon: require('../ServiceAllocation/Icone/files-icon.png'),
       // title: serviceAllocated.length,
        subTitle: 'Prestations affectées',
      },
    ];
    //console.log(this.state.allocationServicesList,'this.state.allocationServicesList');
    return (
      <div
        className="dashboard animated slideInUpTiny
      animation-duration-3"
        style={{
          marginLeft: '5%',
          marginRight: '4%',
        }}
      >
        <div className="row col-lg-12 col-md-12">
          {detailCards.map((data, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
              <IconWithTextCard data={data} />
            </div>
          ))}
          {this.props.successStatus ? (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block"> {this.props.message} </span>
              </UncontrolledAlert>
            </div>
          ) : (
            ''
          )}
          {this.props.errorStatus ? (
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                <span className="icon-addon alert-addon">
                  <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                </span>
                <span className="d-inline-block"> {this.props.message} </span>
              </UncontrolledAlert>
            </div>
          ) : (
            ''
          )}
          <div className=" bd-highlight" style={{ width: '100%' }}>
            <CardBox styleName="col-lg-12 col-md-12 ">
              <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">
                  <InputLabel htmlFor="newAllocation" style={{ color: '#0000FF' }}>
                    <IntlMessages id="new.allocation.service" />
                  </InputLabel>
                </div>
                <div class="p-2 bd-highlight">
                  {' '}
                  <Fab
                    name="newAllocation"
                    size="small"
                    color="primary"
                    aria-label="Add"
                    onClick={this.openAddModal}
                  >
                    {this.state.open ? <RemoveSharpIcon /> : <AddIcon />}
                  </Fab>
                </div>
              </div>
            </CardBox>
          </div>

          {/* <div className=" bd-highlight " style={{ width: '99%' }}>
            <CardBox styleName="col-lg-12 col-md-12">
           
            </CardBox>
          </div> */}
          {this.state.open ? (
            <AddAllocationService
              services={services}
              studentList={this.state.studentList}
              openAddModal={this.openAddModal}
              userProfile={this.props.userProfile}
              allocationService={allocationServicesList}
            />
          ) : (
            ''
          )}
          <div className="row col-lg-12 col-md-12">
            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-12">
              <TextField
                id="classLevel"
                name="classLevel"
                select
                value={this.state.classLevel}
                //onChange={this.handleChangeLevel('classLevel')}
                SelectProps={{}}
                label={<IntlMessages id={`components.note.niveau`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {classLevels.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-12">
              <TextField
                id="classSection"
                name="classSection"
                select
                value={this.state.classSection || ''}
                //onChange={this.handleChangeClass('classSection')}
                SelectProps={{}}
                label={<IntlMessages id={`components.note.class`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {classesList.map((option) => {
                  let data = {
                    classId: option.id,
                    sectionId: option.fk_id_section_v4,
                  };
                  return (
                    <MenuItem key={option.id} value={JSON.stringify(data)}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>

            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-12">
              <TextField
                id="idSection"
                name="idSection"
                select
                value={this.state.idSection}
                //onChange={this.handleChangeSection('idSection')}
                SelectProps={{}}
                label={<IntlMessages id={`components.class.level.input.label.section`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {sections.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="row col-lg-12 col-md-12"> 
          <ListServiceAllocation allocationService={this.props.allocationService} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    services: state.service.servicesV2,
     allocationService: state.allocationService.allocationServiceList,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    classes: state.ClassSettingsReducer.classSettings,
    classLevels: state.levelsReducer.levels,
    sections: state.SectionsReducer.Section,
    students: state.student.remoteStudents,
  };
};

export default connect(mapStateToProps)(ServiceAllocation);
