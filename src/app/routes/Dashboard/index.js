

import React from "react";
import IntlMessages from "../../../util/IntlMessages";
import { RoleContext } from "../../../Context";
import Can from "../../../can";
import { connect } from "react-redux";
import ResetPasswordModal from './ResetPasswordModal'
import axios from "axios";
import { baseUrl } from '../../../config/config'
import UserDetailTable from '../../../components/dashboard/Common/UserDetailTable';
import CardHeader from '../../../components/dashboard/Common/CardHeader/index';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CardMenu from '../../../components/dashboard/Common/CardMenu';
import DoughnutChart from "../../../components/dashboard/eCommerce/DoughnutChart";
import SalesGauge from "../../../components/dashboard/eCommerce/SalesGauge";
import IconWithTextCard from "./IconWithTextCard";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from 'recharts';
import { roleIdProfessor, roleIdStudent, roleIdParent } from '../../../config/config'
import { classService } from "../../../_services/class.service";
import moment from 'moment';
import StudentDashborad from './DashboradStudent/StudentDashboard'

let currentDate = new Date()
const salesStatisticData = [
  { name: 'Jan', uv: 8 },
  { name: 'Feb', uv: 17 },
  { name: 'Mar', uv: 25 },
  { name: 'Apr', uv: 30 },
  { name: 'May', uv: 88 },
  { name: 'Jun', uv: 9 },
  { name: 'Jul', uv: 60 },
  { name: 'Aug', uv: 4 },
  { name: 'Sep', uv: 29 },
  { name: 'Oct', uv: 55 },
  { name: 'Nov', uv: 0 },
  { name: 'Dec', uv: 0 },
];

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: undefined,
      menuState: false,
      resetPassword: '',
      oldPassword: '',
      confirmresetPassword: '',
      errorAlert: false,
      succedAlert: false,
      isopen: true,
      countesStudents: 0,
      countesProfessors: 0,
      countesParents: 0,
      countesComplaints: 0,
      nbreGirls: 0,
      nbreBoys: 0,
      listPayments: []

    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this)

  }


  componentWillMount() {
    var first_connexion = localStorage.getItem('first_connexion');
    if (first_connexion === "false") {
      this.setState({
        isopen: false
      })
    }
    else {
      this.setState({
        isopen: true
      })
    }
  }

  componentDidMount() {

    let apiEndpoint = "";
    apiEndpoint = `/profiles/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id},"role_id":${roleIdStudent}}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
        this.setState({ countesStudents: response.data.count });
      }
    });
    apiEndpoint = `/profiles/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id},"role_id":${roleIdProfessor}}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
        this.setState({ countesProfessors: response.data.count });
      }
    });
    apiEndpoint = `/profiles/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id},"role_id":${roleIdParent}}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
        this.setState({ countesParents: response.data.count });
      }
    });
    apiEndpoint = `/complaints/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id}}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
        this.setState({ countesComplaints: response.data.count });
      }
    });
    // card4
    apiEndpoint = `/profiles?access_token=${localStorage.token}&filter[include]=user&filter[where][and][0][establishment_id]=${localStorage.establishment_id}&filter[where][and][1][role_id]=${roleIdStudent}`;

    classService.get(apiEndpoint).then(response => {
      if (response) {
        let data = response.data;
        let nbreGirls = data.filter(element => element.user.gender === 'Féminin')
        let nbreBoys = data.filter(element => element.user.gender === 'Masculin')
        this.setState({ nbreGirls: nbreGirls.length, nbreBoys: nbreBoys.length });
      }
    });
    //card7
    let classId = 0
    const status = 'Non payé'
    const month = moment(currentDate)._d.getMonth() + 1
    apiEndpoint = `/classes?access_token=${localStorage.token}&filter[where][establishment_id]=${localStorage.establishment_id}`;
    classService.get(apiEndpoint).then(response => {
      if (response) {
        let arr = response.data
        if (arr.length > 0) {
          classId = arr[0].id
          apiEndpoint = `/lines_payments/getLinesPayments?classId=${classId}&status=${status}&month=${month}&access_token=${localStorage.token}`;
          classService.get(apiEndpoint)
            .then(response => {
              let dataPayment = response.data.payments;
              if (dataPayment.length >= 5) {
                let newArray = []
                let obj = {}

                for (let i = 0; i < 5; i++) {

                  obj = {
                    id: dataPayment[i].linesPayments[0].id,
                    image: 'https://via.placeholder.com/150x150',
                    name: dataPayment[i].name + ' ' + dataPayment[i].surname,
                    about: dataPayment[i].service.name,
                    detail: dataPayment[i].linesPayments[0].price + ' ' + dataPayment[i].service.currency,
                    color: "danger"
                  }
                  newArray.push(obj)
                }
                this.setState({ listPayments: newArray })
              }
            })

        }
      }
    });
  }

  onOptionMenuSelect = event => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  handleCancel() {
    this.setState({
      isopen: false
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  ResetPassword() {
    var data = {}
    data.password = this.state.resetPassword
    data.oldpassword = this.state.oldPassword
    data.userId = this.props.userProfile.user_id


    var token = localStorage.getItem('token');
    axios.post(`${baseUrl}/users/reset-initial-password?access_token=${token}`, data, { headers: { 'content-type': 'application/json', }, })
      .then(res => {
        if (res.data.existe === true) {
          this.setState({
            succedAlert: true,
            resetPassword: '',
            confirmresetPassword: '',
            oldPassword: ''
          })
          setTimeout(function () {
            this.setState({ succedAlert: false, isopen: false });
          }.bind(this), 2000)
        }
        else {
          this.setState({
            errorAlert: true,
            resetPassword: '',
            confirmresetPassword: '',
            oldPassword: ''
          })
          setTimeout(function () {
            this.setState({ errorAlert: false });
          }.bind(this), 2000)
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({
            errorAlert: true,
            resetPassword: '',
            confirmresetPassword: '',
            oldPassword: ''
          })
          setTimeout(function () {
            this.setState({ errorAlert: false });
          }.bind(this), 2000)
        }
      });

  }


  render() {
    const first_connexion = localStorage.getItem('first_connexion');


    const detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../assets/images/dashboard/project-icon.png'),
        title: this.state.countesStudents,
        subTitle: <IntlMessages id="dashboard.new.student" />
      }, {
        cardColor: 'secondary',
        imageIcon: require('../../../assets/images/dashboard/tasks-icon.png'),
        title: this.state.countesProfessors,
        subTitle: <IntlMessages id="pages.professorPage" />
      }, {
        cardColor: 'info',
        imageIcon: require('../../../assets/images/dashboard/teams-icon.png'),
        title: this.state.countesParents,
        subTitle: <IntlMessages id="sidebar.parent" />
      }, {
        cardColor: 'warning',
        imageIcon: require('../../../assets/images/dashboard/files-icon.png'),
        title: this.state.countesComplaints,
        subTitle: <IntlMessages id="dashboard.complaints" />
      },
    ]

    const { anchorEl, menuState } = this.state;

    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <div>

            <Can
              role={role}
              perform="home-filter:visit"
              yes={() => (
                <div className="app-wrapper">
                  <div className="dashboard animated slideInUpTiny animation-duration-3 ">

                    <div className="row">
                      {/* ChartCard 1 */}
                      {detailCards.map((data, index) => <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-sm-7 col-6">
                        <IconWithTextCard data={data} />
                      </div>)
                      }

                    </div>

                    <div className="row">
                      {/* ChartCard 2 */}

                      <div className="col-lg-6 col-12 mb-5 mb-lg-1">
                        <div className="jr-card">
                          <h2> {<IntlMessages id="dashboard.rate.presence.absences" />}</h2>
                          <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={salesStatisticData}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                              <XAxis dataKey="name" />
                              <YAxis type="number" domain={[0, 100]} />
                              <CartesianGrid strokeDasharray="0" stroke="#DCDEDE" />

                              <Tooltip />
                              <defs>
                                <linearGradient id="salesStatistic" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#4258BC" stopOpacity={1} />
                                  <stop offset="95%" stopColor="#FFF" stopOpacity={0.8} />
                                </linearGradient>
                              </defs>

                              <Area type='monotone' dataKey='uv' strokeWidth={2} stroke='#6F82E5' fill="url(#salesStatistic)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      {/* ChartCard 3 */}
                      <div className="col-lg-3 col-12">
                        <div className="jr-card">
                          <ResponsiveContainer width="100%">
                            <SalesGauge />
                          </ResponsiveContainer>
                        </div>
                      </div>
                      {/* ChartCard 4 */}
                      <div className="col-lg-3 col-12 jr-card">

                        <h3 className="card-heading">{<IntlMessages id="dashboard.total.number.of.students" />}</h3>
                        <ResponsiveContainer width="100%" height="80%">
                          <DoughnutChart nbreGirls={this.state.nbreGirls} nbreBoys={this.state.nbreBoys} />
                        </ResponsiveContainer>
                        <div className="row">
                          <div className="col-6">
                            <div className="media">
                              <i className="zmdi zmdi-android zmdi-hc-fw mr-2 text-success" />
                              <div className="media-body">
                                <h5 className="mb-0">{<IntlMessages id="dashboard.male" />}</h5>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="media">
                              <i className="zmdi zmdi-apple zmdi-hc-fw mr-2 text-warning" />
                              <div className="media-body">
                                <h5 className="mb-0">{<IntlMessages id="dashboard.female" />}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="row">
                      {/* ChartCard 5 */}

                      <div className="col-lg-6 col-12">
                        <div className="jr-card">
                          <h2> {<IntlMessages id="dashboard.rate.success" />}</h2>
                          <ResponsiveContainer width="100%" height={425}>
                            <BarChart data={data}
                              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                              <XAxis dataKey="name" />
                              <YAxis />
                              <CartesianGrid strokeDasharray="3 3" />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="pv" fill="#3367d6" />
                              <Bar dataKey="uv" fill="#ffc658" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      {/* ChartCard 6 */}
                      <div className="col-lg-3 col-12">
                        <div className="jr-card">

                          <div className={`jr-card-header-color text-center bg-gradient-primary`}>
                            <div className="jr-card-header-top mb-3">
                              <IconButton className="jr-menu-icon mr-auto" aria-label="Menu">
                                <span className="menu-icon bg-white" />
                              </IconButton>
                              <IconButton className="icon-btn p-2" onClick={this.onOptionMenuSelect.bind(this)}><i
                                className="zmdi zmdi-more-vert text-white" /></IconButton>
                            </div>

                            <Avatar className="bg-grey lighten-2 avatar-shadow size-90 mx-auto mb-4">
                              <h1 className="m-1 text-primary font-weight-bold">24</h1>
                            </Avatar>
                            <div className="jr-card-hd-content text-white">
                              <h2 className="text-white jr-font-weight-medium mb-1">Monday</h2>
                              <p className="mb-0">July 2017</p>
                            </div>
                          </div>
                          <div className="jr-card-body mb-6">

                            <div className="d-flex flex-column">
                              <div className="list-line-item">
                                <div className={`list-line-badge bg-primary`} />

                                <div className="list-line-content">
                                  <h4 className={`mb-2 text-primary`}>Learning React</h4>
                                  <p className="jr-fs-sm text-light">6:30 pm</p>
                                </div>
                              </div>

                              <div className="list-line-item">
                                <div className="list-line-badge bg-danger" />

                                <div className="list-line-content">
                                  <h4 className="text-danger mb-1">Logo Design</h4>
                                  <p className="jr-fs-sm text-light">7:15 pm</p>
                                </div>
                              </div>

                              <div className="list-line-item">
                                <div className="list-line-badge bg-success" />

                                <div className="list-line-content">
                                  <h4 className="text-success mb-1">Timesheet Setup</h4>
                                  <p className="jr-fs-sm text-light mb-0">8:45 pm</p>
                                </div>
                              </div>

                              <div className="list-line-item">
                                <div className="list-line-badge bg-warning" />

                                <div className="list-line-content">
                                  <h4 className="text-warning mb-1">Timesheet Setup</h4>
                                  <p className="jr-fs-sm text-light mb-0">8:45 pm</p>
                                </div>
                              </div>

                            </div>
                          </div>

                          <CardMenu menuState={menuState} anchorEl={anchorEl}
                            handleRequestClose={this.handleRequestClose.bind(this)} />
                        </div>
                      </div>
                      {/* ChartCard 7 */}

                      <div className="col-lg-3 col-12">
                        <div className="jr-card jr-full-card">
                          <CardHeader heading={<IntlMessages id="dashboard.list.of.paiement" />} />

                          <UserDetailTable data={this.state.listPayments} tableStyle="full-table-last-sm" />
                        </div>
                      </div>

                    </div>


                  </div>

                  {/* {

                    first_connexion === "true" ?
                      <ResetPasswordModal isopen={this.state.isopen} handleCancel={this.handleCancel} handleChange={this.handleChange} ResetPassword={this.ResetPassword} values={this.state} /> : ""
                  } */}


                </div>
              )}
            />
            <Can
              role={role}
              perform="Student.Dashborad:visit"
              yes={() => (
                <StudentDashborad />
              )}
            />
          </div>


        )}
      </RoleContext.Consumer>
    );
  }
}
const mapStateToProps = state => {
  return {
    userProfile: state.auth.userProfile,
  };
};



export default connect(mapStateToProps)(Dashboard);
