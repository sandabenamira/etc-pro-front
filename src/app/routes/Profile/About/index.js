import React from 'react';
import Widget from '../../../../components/Widget/index';
import AboutItem from './AboutItem';
import { classService } from '../../../../_services/class.service';
import IntlMessages from '../../../../util/IntlMessages';
import StuppUserEditPwd from '../Setting/stuppUserEditPwd';
import { roleIdProfessor, roleIdStudent } from '../../../../config/config';
import Signature from '../Signature';
var dateFormat = require('dateformat');
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      editStuppUserModal: false,
      loaded: false,
      iconInfo: '',
      titleInfo: '',
      info: '',
      userData: '',
    };
    this.getdata = this.getdata.bind(this);
    this.editStuppUser = this.editStuppUser.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentDidMount() {
    this.getdata();
  }
  editStuppUser() {
    this.setState({ editStuppUserModal: true });
  }

  handleCancelModal() {
    this.setState({ edit: false, editStuppUserModal: false });
  }
  getdata() {
    let apiEndpoint =
      `/profiles/fetchUserDataByUserID/` +
      localStorage.user_id +
      `?access_token=${localStorage.token}`;
    classService.get(apiEndpoint).then((res) => {
      if (res) {
        const userData = res.data.profileData[0];
        if (parseInt(localStorage.roles_id) === roleIdProfessor) {
          const info = userData.subjectName;
          this.setState({
            titleInfo: <IntlMessages id="components.professor.formadd.subject_id" />,
            iconInfo: 'library',
            info,
          });
        }
        if (parseInt(localStorage.roles_id) === roleIdStudent) {
          const info = userData.className;
          this.setState({
            titleInfo: <IntlMessages id="components.student.formadd.classe" />,
            iconInfo: 'graduation-cap',
            info,
          });
        }
        this.setState({ userData });
      }
    });
  }
  render() {
    const aboutList = [
      {
        id: 1,
        title: <IntlMessages id="profile.utilisateur" />,
        icon: 'face',
        desc: this.state.userData.name + ' ' + this.state.userData.surname,
      },
      {
        id: 2,
        title: <IntlMessages id="profile.birthDay" />,
        icon: 'cake',
        desc: dateFormat(this.state.userData.date_of_birth, 'fullDate'),
      },
      {
        id: 3,
        title: <IntlMessages id="stuppUser.formadd.cin" />,
        icon: 'dns',
        desc: this.state.userData.cin,
      },
      {
        id: 4,
        title: <IntlMessages id="stuppUser.formadd.establishment" />,
        icon: 'city-alt',
        desc: this.state.userData.establishmentName,
      },
      {
        id: 5,
        title: this.state.titleInfo,
        icon: this.state.iconInfo,
        desc: this.state.info,
      },
    ];
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0">
            {' '}
            <IntlMessages id="profile.about" />
          </h4>
        </div>
        <div className="jr-tabs-content jr-task-list">
          <div className="row">
            {aboutList.map((about, index) => (
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                <AboutItem data={about} />
              </div>
            ))}
          </div>
          <div className="jr-featured-content-right jr-profile-content-right">
            <p
              className="text-primary text-truncate mt-sm-auto mb-0 pointer"
              onClick={this.editStuppUser}
            >
              {' '}
              <i className={`zmdi zmdi-settings mr-0 `} />
              <IntlMessages id="initial.password" />
            </p>
            {this.state.editStuppUserModal ? (
              <StuppUserEditPwd cancelModal={this.handleCancelModal} />
            ) : (
              ''
            )}
          </div>
        </div>
        <Signature />
      </Widget>
    );
  }
}

export default About;
