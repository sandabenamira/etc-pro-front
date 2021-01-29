import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import ChartCard from "./ChartCard";

import ContainerHeader from "../../../components/ContainerHeader/index";
import IntlMessages from "../../../util/IntlMessages";
import { increamentData } from "./mdata";

import { classService } from "../../../_services/class.service";
import { getAllUsers } from "../../../actions/stuppUserAction";
import { getAllUsersByEstablishmentId } from "../../../actions/stuppUserAction";
import { getEvents } from "../../../actions/planningActions";

import { RoleContext } from "../../../Context";
import UserCardItem from './UserCardItem'
import ActivityCardItem from "./ActivityCardItem"
import Can from "../../../can";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import {
  roleIdSuperAdmin,
  roleIdProfessor,
  roleIdStudent
} from "../../../config/config";
import { resetAccountPassword } from "../../../actions/Auth";
import { getAllTodoForAdmin } from '../../../actions/ToDo';
import ResetPasswordModal from './ResetPasswordModal'
import axios from "axios";
import {baseUrl} from '../../../config/config'
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      countesEstab: 0,
      countesProf: 0,
      countesStudent: 0,
      countesClass: 0,
      countesService: 0,
      events: [],
      graphData: [],
      mountcount: 0,
      mounted: false,
      data: {},
      devoir_examen: [],
      resetPassword: '',
      oldPassword: '',
      confirmresetPassword: '',
      errorAlert: false,
      succedAlert: false,
      isopen: true
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this)
  }

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
    data.oldpassword=this.state.oldPassword
    data.userId = this.props.userProfile.user_id
    var token = localStorage.getItem('token');
    axios.post(`${baseUrl}/users/change-password?access_token=` +token,{oldPassword: data.oldpassword,newPassword: data.password})
    .then(response => {
      axios.post(`${baseUrl}/users/reset-initial-password?access_token=${token}`, data, {headers: {'content-type': 'application/json',},})
      .then(res => {
        if(res.data.existe===true){
          this.setState({
            succedAlert: true,
            resetPassword: '',
            confirmresetPassword: '',
            oldPassword:'' })
          setTimeout(function () {
            this.setState({ succedAlert: false,isopen:false });
          }.bind(this), 2000)
        }
        else{
          this.setState({
            errorAlert: true,
            resetPassword: '',
            confirmresetPassword: '',
            oldPassword:''
          })
          setTimeout(function () {
            this.setState({ errorAlert: false });
          }.bind(this), 2000)
        }
      })
      .catch(error => {
        if(error.response.status===400){
          this.setState({
            errorAlert: true,
            resetPassword: '',
            confirmresetPassword: '',
            oldPassword:''
          })
          setTimeout(function () {
            this.setState({ errorAlert: false });
          }.bind(this), 2000)
        }
      });
    })
    .catch(error => {
      if(error.response.status===400){
        this.setState({
          errorAlert: true,
          resetPassword: '',
          confirmresetPassword: '',
          oldPassword:''
        })
        setTimeout(function () {
          this.setState({ errorAlert: false });
        }.bind(this), 2000)
      }
    });

  }

  componentDidUpdate(prevProps, prevState) {
    var list = this.state.graphData
    var object = [
      {
        label: 'Utilisateurs/Mois',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,

      }
    ]

    if (prevProps.users !== this.props.users && this.state.mounted === true) {

      this.props.users.map(function (element) {
        if (element.creation_date !== null) {
          var creation_date = moment(element.user.creation_date, 'YYYY/MM/DD')
          var month = creation_date.format('M');
          if (month !== "Invalid date") {
            list.push(month)
          }
        }
      })

      var arr = list;
      var counts = {};
      for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
      var Datas = [counts["1"], counts["2"], counts["3"], counts["4"], counts["5"], counts["6"], counts["7"], counts["8"], counts["9"], counts["10"], counts["11"], counts["12"]]
      var labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      object[0].data = Datas
      var datasets = []
      datasets[0] = object[0]
      var final_new_object = {}
      final_new_object.labels = labels
      final_new_object.datasets = datasets
      this.setState({
        data: final_new_object,
        graphData: list
      })
    }

    if (prevProps.toDosForAdmin !== this.props.toDosForAdmin && this.state.mounted === true) {
      var list_todos = []
      this.props.toDosForAdmin.map(function (element) {
        var object = {}
        object.todo_type = element.title
        object.subject_title = element.subject.name_FR
        object.professor_name = element.professor.profile.user.name + " " + element.professor.profile.user.surname
        var now = new Date(moment());
        var then = element.date_creation;
        var ms = moment((moment(now).format('MM/DD/YYYY HH:mm:ss'))).diff(moment(then).format('MM/DD/YYYY HH:mm:ss'));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        var hours = s.substring(0, 1);
        var min = s.substring(2, 4);
        var past_Time = {}
        past_Time.hours = hours
        past_Time.min = min
        object.creation_date = past_Time
        object.user_id = element.professor.profile.user_id
        list_todos.push(object)

      })
      this.setState({
        devoir_examen: list_todos
      })
    }

  }

  componentDidMount() {
    var first_connexion = JSON.parse(localStorage.getItem('first_connexion'));   //returns true
    if (first_connexion === true) {
      this.setState({
        isopen: true
      })
    }
    else {
      this.setState({
        isopen: false
      })
    }
    this.props.getEvents()
    this.setState({
      mounted: true
    })
    const roleId = localStorage.getItem('roles_id');
    if (roleId !== undefined) {
      const establishment_id = localStorage.getItem('establishment_id');
      this.props.getAllTodoForAdmin(establishment_id);

      let apiEndpoint = "";
      if (roleId === roleIdSuperAdmin) {
        this.props.getAllUsers();
        apiEndpoint = `/establishments/count?access_token=${localStorage.token}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesEstab: response.data });
          }
        });

        apiEndpoint = `/professors/count?access_token=${localStorage.token}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesProf: response.data });
          }
        });
        apiEndpoint = `/students/count?access_token=${localStorage.token}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesStudent: response.data });
          }
        });
        apiEndpoint = `/classes/count?access_token=${localStorage.token}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesClass: response.data });
          }
        });
      } else {

        this.props.getAllTodoForAdmin(this.props.userProfile.establishment_id)

        this.props.getAllUsersByEstablishmentId(
          localStorage.establishment_id
        );

        apiEndpoint = `/profiles/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id},"role_id":${roleIdStudent}}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesStudent: response.data.count });
          }
        });
        apiEndpoint = `/profiles/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id},"role_id":${roleIdProfessor}}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesProf: response.data });
          }
        });
        apiEndpoint = `/classes/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id}}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesClass: response.data });
          }
        });




        apiEndpoint = `/services/count?access_token=${localStorage.token}&where={"establishment_id":${localStorage.establishment_id}}`;
        classService.get(apiEndpoint).then(response => {
          if (response) {
            this.setState({ countesService: response.data });
          }
        });
      }
      apiEndpoint = `/generic_events?access_token=${localStorage.token}&filter={"where" : {"or" : [ {"event_type" : "party"},{"event_type" : "meeting"},{"event_type" : "Trip"}]}}`;
      classService.get(apiEndpoint).then(response => {
        if (response) {
          this.setState({ events: response.data });
        }
      });
    }
  }
  onLoadMore() { }
  render() {
    var Students = this.state.countesStudent
    var LastUsers = this.props.users.slice(Math.max(this.props.users.length - 5, 0))
    var list_activity = []
    if (this.state.devoir_examen.length > 0) {
      list_activity = this.state.devoir_examen.slice(Math.max(this.state.devoir_examen.length - 5, 0))
    }
    const options = {
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 10,
            borderColor: 'black',
            borderWidth: 10,
            label: {
              backgroundColor: 'red',
              content: 'Test Label',
              enabled: true,
            },
          },
        ],
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            max: this.props.users.length + 20
          }
        }]
      }

    }

    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <Can
            role={role}
            perform="home-filter:visit"
            yes={() => (
              <div className="app-wrapper">
                <div className="dashboard animated slideInUpTiny animation-duration-3 ">
                  <ContainerHeader
                    match={this.props.match}
                    title={<IntlMessages id="home.greetings" />}
                  />
                  <div className="row">
                    {/* ChartCard 1 */}
                    <Can
                      role={role}
                      perform="home-filter-establishment:visit"
                      yes={() => (
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <ChartCard
                            chartProperties={{
                              title: (
                                <IntlMessages id="message.Numbers.of.institutions" />
                              ),
                              prize: this.state.countesEstab.count,
                              icon: "stats",
                              bgColor: "indigo",
                              styleName: "up",
                              desc: "",
                              percent: " "
                            }}
                            children={
                              <ResponsiveContainer width="100%" height={75}>
                                <AreaChart
                                  data={increamentData}
                                  margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0
                                  }}
                                >
                                  <Area
                                    dataKey="pv"
                                    strokeWidth={0}
                                    stackId="2"
                                    stroke="#273894"
                                    fill="#273894"
                                    fillOpacity={1}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            }
                          />
                        </div>
                      )}
                    />
                    {/* ChartCard 2 */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                      <ChartCard
                        chartProperties={{
                          title: (
                            <IntlMessages id="message.Numbers.of.teachers" />
                          ),
                          prize: this.state.countesProf.count,
                          icon: "stats",
                          bgColor: "pink accent-2",
                          styleName: "up",
                          desc: "",
                          percent: ""
                        }}
                        children={
                          <ResponsiveContainer width="100%" height={75}>
                            <AreaChart
                              data={increamentData}
                              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                            >
                              <Area
                                dataKey="pv"
                                type="monotone"
                                strokeWidth={0}
                                stackId="2"
                                stroke="#da2361"
                                fill="#da2361"
                                fillOpacity={1}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        }
                      />
                    </div>

                    {/* ChartCard 3 */}

                    {
                      this.setState.countesStudent !== 0 ?
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <ChartCard
                            chartProperties={{
                              title: (
                                <IntlMessages id="message.Numbers.of.students" />
                              ),
                              prize: Students,
                              icon: "stats",
                              bgColor: "info",
                              styleName: "down",
                              desc: "",
                              percent: ""
                            }}
                            children={
                              <ResponsiveContainer width="100%" height={75}>
                                <AreaChart
                                  data={increamentData}
                                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                >
                                  <Area
                                    dataKey="pv"
                                    strokeWidth={0}
                                    stackId="2"
                                    stroke="#0c8e9f"
                                    fill="#0c8e9f"
                                    fillOpacity={1}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            }
                          />
                        </div> : ""
                    }
                    {/* ChartCard 4 */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                      <ChartCard
                        chartProperties={{
                          title: (
                            <IntlMessages id="message.Numbers.of.classes" />
                          ),
                          prize: this.state.countesClass.count,
                          icon: "stats",
                          bgColor: "success",
                          styleName: "down",
                          desc: "",
                          percent: ""
                        }}
                        children={
                          <ResponsiveContainer width="100%" height={75}>
                            <AreaChart
                              data={increamentData}
                              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                            >
                              <Area
                                dataKey="pv"
                                strokeWidth={0}
                                stackId="2"
                                stroke="#3a983e"
                                fill="#3a983e"
                                fillOpacity={1}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        }
                      />
                    </div>
                    <Can
                      role={role}
                      perform="home-filter-establishment-services:visit"

                      yes={() => (
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <ChartCard
                            chartProperties={{
                              title: (
                                <IntlMessages id="message.Numbers.of.services" />
                              ),
                              prize: this.state.countesService.count,
                              icon: "stats",
                              bgColor: "indigo",
                              styleName: "up",
                              desc: "",
                              percent: " "
                            }}
                            children={
                              <ResponsiveContainer width="100%" height={75}>
                                <AreaChart
                                  data={increamentData}
                                  margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0
                                  }}
                                >
                                  <Area
                                    dataKey="pv"
                                    strokeWidth={0}
                                    stackId="2"
                                    stroke="#273894"
                                    fill="#273894"
                                    fillOpacity={1}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            }
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="row col-xl-12 col-lg-12 col-md-12 col-12 col-sm-12 order-sm-1">
                    <div className="row col-xl-8 col-lg-8 col-md-12 col-12 col-sm-12 order-sm-1 ">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-12 col-sm-12 order-sm-1 ">
                        <h2 className="jr-entry-title d-flex flex-row ">
                          <IntlMessages id="new.added.users" />
                          <span className="text-primary jr-font-weight-medium jr-fs-md pointer ml-auto d-none d-sm-block">
                            <IntlMessages id="see.users.list" />
                            <i className="zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"></i>
                          </span>
                        </h2>
                        <ul className="jr-agents-list">
                          {
                            LastUsers.map(element => <UserCardItem user={element} />)
                          }
                        </ul>
                        <div className="row jr-card jr-card-widget  card col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1 col-sm-12">
                          <h4>
                          </h4>
                          <div className="row col-xl-12 col-lg-12 col-md-12 col-12 order-sm-1">
                            <Bar
                              options={options}


                              data={this.state.data}
                            />


                            {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="jr-card jr-card-widget p-3 bg-secondary text-white card">
                                <div className="media align-items-center flex-nowrap py-lg-2">
                                  <div className="mr-3">
                                    <img src="/static/media/tasks-icon.644bb386.png" alt="/static/media/tasks-icon.644bb386.png" ></img>
                                  </div>
                                  <div className="media-body">
                                    <h1 className="jr-fs-xxl jr-font-weight-black mb-1 text-white">{this.state.countesProf.count} Professor</h1>
                                    <p className="mb-0 jr-fs-cp">Tasks</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div class="jr-card jr-card-widget p-3 bg-primary text-white card">
                                <div class="media align-items-center flex-nowrap py-lg-2">
                                  <div class="mr-3">
                                    <img src="/static/media/project-icon.f10f27ed.png" alt="/static/media/project-icon.f10f27ed.png">
                                    </img>
                                  </div>
                                  <div class="media-body">
                                    <h1 class="jr-fs-xxl jr-font-weight-black mb-1 text-white">09</h1>
                                    <p class="mb-0 jr-fs-cp">Projects</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div class="jr-card jr-card-widget p-3 bg-warning text-white card">
                                <div class="media align-items-center flex-nowrap py-lg-2">
                                  <div class="mr-3">
                                    <img src="/static/media/files-icon.adf945a2.png" alt="/static/media/files-icon.adf945a2.png">
                                    </img>
                                  </div>
                                  <div class="media-body">
                                    <h1 class="jr-fs-xxl jr-font-weight-black mb-1 text-white">09</h1>
                                    <p class="mb-0 jr-fs-cp">Files</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="jr-card jr-card-widget p-3 bg-secondary text-white card">
                                <div className="media align-items-center flex-nowrap py-lg-2">
                                  <div className="mr-3">
                                    <img src="/static/media/tasks-icon.644bb386.png" alt="/static/media/tasks-icon.644bb386.png" >
                                    </img>
                                  </div>
                                  <div className="media-body">
                                    <h1 className="jr-fs-xxl jr-font-weight-black mb-1 text-white">457</h1>
                                    <p className="mb-0 jr-fs-cp">Tasks</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"><div class="jr-card jr-card-widget p-3 bg-primary text-white card">
                              <div class="media align-items-center flex-nowrap py-lg-2">
                                <div class="mr-3">
                                  <img src="/static/media/project-icon.f10f27ed.png" alt="/static/media/project-icon.f10f27ed.png">
                                  </img>
                                </div>
                                <div class="media-body">
                                  <h1 class="jr-fs-xxl jr-font-weight-black mb-1 text-white">09</h1>
                                  <p class="mb-0 jr-fs-cp">Projects</p>
                                </div>
                              </div>
                            </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div class="jr-card jr-card-widget p-3 bg-warning text-white card">
                                <div class="media align-items-center flex-nowrap py-lg-2">
                                  <div class="mr-3">
                                    <img src="/static/media/files-icon.adf945a2.png" alt="/static/media/files-icon.adf945a2.png"></img>
                                  </div>
                                  <div class="media-body">
                                    <h1 class="jr-fs-xxl jr-font-weight-black mb-1 text-white">09</h1>
                                    <p class="mb-0 jr-fs-cp">Files</p>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div className="jr-card jr-card-widget p-3 bg-secondary text-white card">
                                <div className="media align-items-center flex-nowrap py-lg-2">
                                  <div className="mr-3">
                                    <img src="/static/media/tasks-icon.644bb386.png" alt="/static/media/tasks-icon.644bb386.png" >
                                    </img>
                                  </div>
                                  <div className="media-body">
                                    <h1 className="jr-fs-xxl jr-font-weight-black mb-1 text-white">457</h1>
                                    <p className="mb-0 jr-fs-cp">Tasks</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div class="jr-card jr-card-widget p-3 bg-primary text-white card">
                                <div class="media align-items-center flex-nowrap py-lg-2">
                                  <div class="mr-3">
                                    <img src="/static/media/project-icon.f10f27ed.png" alt="/static/media/project-icon.f10f27ed.png"></img>
                                  </div>
                                  <div class="media-body">
                                    <h1 class="jr-fs-xxl jr-font-weight-black mb-1 text-white">09</h1>
                                    <p class="mb-0 jr-fs-cp">Projects</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                              <div class="jr-card jr-card-widget p-3 bg-warning text-white card">
                                <div class="media align-items-center flex-nowrap py-lg-2">
                                  <div class="mr-3">
                                    <img src="/static/media/files-icon.adf945a2.png" alt="/static/media/files-icon.adf945a2.png">
                                    </img>
                                  </div>
                                  <div class="media-body">
                                    <h1 class="jr-fs-xxl jr-font-weight-black mb-1 text-white">09</h1>
                                    <p class="mb-0 jr-fs-cp">Files</p>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row col-xl-4 col-lg-4 col-md-4  col-4 order-sm-1 col-sm-6">
                      <div className="row col-xl-12 col-lg-12 col-md-12 col-12 col-sm-6  jr-card jr-card-widget card  ">
                        <div className="jr-entry-sec bg-white  jr-card jr-card-widget card">
                          <h2 className="jr-entry-title"><IntlMessages id="message.Recent.activities" /></h2>
                          <div className="jr-timeline-info">
                            <h4 className="jr-timeline-info-day">Today</h4>
                            <div className="recent-activity">
                              {
                                this.state.devoir_examen.length > 0 ?
                                  list_activity.map(element => <ActivityCardItem todo={element} />) : ""
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row"> */}
                  {/* Activités récentes */}
                  {/* <Can
                      role={role}
                      perform="home-filter-establishment:visit"
                      yes={() => (
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                          <Widget>
                            <RecentActivity
                              shape="rounded"
                              recentList={recentActivity}
                            />
                          </Widget>
                        </div>
                      )}
                    /> */}
                  {/* Transactions */}
                  {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                      <Widget>
                        <Transactions
                          shape="rounded"
                          recentList={recentActivity}
                        />
                      </Widget> */}
                </div>
                {/* Inscriptions */}
                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                      <Widget>
                        <Inscriptions
                          shape="rounded"
                          recentList={recentActivity}
                        />
                      </Widget>
                    </div> */}

                {/* Event List  */}

                {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                      <div className="jr-card pb-4">
                        <div className="jr-card-header mb-3 d-flex align-items-center">
                          <h3 className="mb-0 mr-auto">
                            <IntlMessages id="dashboard.currentEvent" />
                          </h3>
                          <span className="badge badge-secondary">
                            <IntlMessages id="table.thisWeek" />
                          </span>
                        </div>
                        <EventList events={this.state.events} />
                        <span
                          className="jr-link"
                          onClick={this.onLoadMore.bind(this)}
                        >
                          En savoir plus
                        </span>
                      </div>
                    </div> */}

                {/* "Taux d'absence" */}
                {/* </div>
                </div> */}
                {
                  this.state.isopen === true ?
                    <ResetPasswordModal isopen={this.state.isopen} handleCancel={this.handleCancel} handleChange={this.handleChange} ResetPassword={this.ResetPassword} values={this.state} /> : ""
                }


              </div>
            )}
          />

        )}
      </RoleContext.Consumer>
    );
  }
}
const mapStateToProps = state => {
  return {
    userProfile: state.auth.userProfile,
    users: state.stuppUsers.remoteStuppUsers,
    events: state.planning.events,
    toDosForAdmin: state.toDo.toDosForAdmin

  };
};



export default connect(
  mapStateToProps,
  {
    getAllUsers,
    getAllUsersByEstablishmentId,
    getEvents,
    getAllTodoForAdmin,
    resetAccountPassword
  }
)(Home);
