import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../../../components/CardBox/index';
import MenuItem from '@material-ui/core/MenuItem';
import StudentList from './StudentList';
import { connect } from "react-redux";
import { getClasses, getClassesByEstablishmentId } from "../../../../../actions/classeAction";
import { getEstablishment } from "../../../../../actions/establishmentAction";
import _ from 'lodash';
import ContainerHeader from '../../../../../components/ContainerHeader/index';
import { RoleContext } from '../../../../../Context';
import Can from '../../../../../can';
import { roleIdSuperAdmin, roleIdAdmin, roleIdSupervisor, roleIdDirector } from '../../../../../config/config';
import { classService } from '../../../../../_services/class.service';
import { UncontrolledAlert } from "reactstrap";

function notEmpty(value) {
  return !(_.isEmpty(value))
}

function mapStateToProps(state) {
  return {
    classes: state.classes,
    establishments: state.establishment.remoteEstablishments,
    userProfile: state.auth.userProfile,
    absentStudents: state.callRegister.absentStudents,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

class BilletPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      classe: '',
      class_name: '',
      list_presence: [],
      establishment_id: '',
      absentStudents: [],
      noAbsents: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterClass = this.filterClass.bind(this);
    this.getListOfAbsentStudent = this.getListOfAbsentStudent.bind(this);
  }

  componentWillMount() {
    switch (parseInt(localStorage.roles_id)) {
      case roleIdSuperAdmin:
        this.props.getEstablishment();
        this.props.getClasses();
        break;

      case roleIdAdmin:
      case roleIdSupervisor:
      case roleIdDirector:
        this.props.getClassesByEstablishmentId(localStorage.establishment_id);
        break;

      default:
        break;
    }
  }


  filterClass(classes) {
    if (this.props.userProfile.roles_id === roleIdSuperAdmin && classes.length && this.state.establishment_id) {
      return classes.filter(classe => classe.establishment_id === this.state.establishment_id && classe.status)
    } else {
      let classFiltred = classes.filter(classInfo => classInfo.status);
      return classFiltred
    }
  }

  getListOfAbsentStudent(class_id) {

    let apiEndpoint = `/student_calls/fetchAbsentStudentsByClassId/` + class_id + `?access_token=${localStorage.token}`
    classService.get(apiEndpoint)
      .then(res => {
        if (!_.isEmpty(res.data.students)) {
          this.setState({ absentStudents: res.data.students })
        } else {
          this.setState({ absentStudents: [], noAbsents: true })
        }

      })
  }

  handleChange = name => event => {
    let obj = JSON.parse(event.target.value);
    if (name === 'classe' && event.target.value) {
      this.setState({
        value: event.target.value,
        classe: obj.classId,
        class_name: obj.class_name
      })
      this.getListOfAbsentStudent(obj.classId);
    } else {
      this.setState({
        [name]: event.target.value
      })
    }
  }
  componentWillUnmount() {
    this.setState({ establishment_id: '' })
  }


  render() {
    const allEstablishment = Array.from(this.props.establishments);
    const allClasses = Array.from(this.props.classes);
    let filteredClasses = this.filterClass(allClasses);


    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.sideNav.component.billetPass" />} />
        <CardBox styleName="col-sm-12"
          heading={<IntlMessages id="components.exam.form.class" />}>
          <RoleContext.Consumer>
            {({ role }) => (
              <div className="row">

                <Can
                  role={role}
                  perform="billetPass-filter-establishment:visit"
                  yes={() => (
                    <div className="col-lg-3 col-sm-6 col-12" >
                      <TextField
                        required
                        id="establishment"
                        select
                        label={<IntlMessages id="components.student.formadd.establishment" />}
                        value={this.state.establishment_id}
                        onChange={this.handleChange('establishment_id')}
                        SelectProps={{}}
                        margin="normal"
                        fullWidth >
                        {allEstablishment.map(establishment => (
                          <MenuItem key={establishment.id} value={establishment.id}>
                            {establishment.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  )}
                />

                <div className="col-lg-3 col-sm-6 col-12" >

                  <TextField
                    required
                    id="classe"
                    select
                    label={<IntlMessages id="components.note.class" />}
                    value={this.state.value}
                    onChange={this.handleChange('classe')}
                    // onBlur={this.handleBlur}
                    // SelectProps={{}}
                    margin="normal"
                    fullWidth >
                    {filteredClasses.map(option => {
                      let data = { classId: option.id, class_name: option.name }
                      return (
                        <MenuItem key={option.id} value={JSON.stringify(data)}>
                          {option.name}
                        </MenuItem>
                      )
                    })}
                  </TextField>

                </div>
              </div>
            )}
          </RoleContext.Consumer>
        </CardBox>
        {this.props.successStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {" "}
              {this.props.message}{" "}
            </span>
          </UncontrolledAlert>
        ) : (
            ""
          )}
        {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block">
              {" "}{this.props.message}{" "}
            </span>
          </UncontrolledAlert>
        ) : (
            ""
          )}
        <div className="row">
          <StudentList
            absentStudents={this.state.absentStudents}
            noAbsents={this.state.noAbsents}
            class_name={this.state.class_name}

          />
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, { getEstablishment, getClasses, getClassesByEstablishmentId })(BilletPass);
