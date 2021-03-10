import React from 'react';
import IntlMessages from '../../../../util/IntlMessages';
import IconWithTextCard from '../IconWithTextCard';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import BigCalendarCustomized from './BigCalendarCustomized';
 import IconButton from '@material-ui/core/IconButton';
import { CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Legend } from 'recharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import SolidCards from './SolidCards';
import SimpleCard from './SimpleCard';
import NewsletterCard from './NewsletterCard';
import { connect } from 'react-redux';
import { classService } from '../../../../_services/class.service';

const data = [
  { name: 'Groupe A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Groupe B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Groupe C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Groupe D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Groupe E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Groupe F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Groupe G', uv: 3490, pv: 4300, amt: 2100 },
];
class ProfessorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classeName: '',
      data: [1, 2, 3],
      countesMoocs: null,
      countesClass: null,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
    }
  }
  componentWillMount() {
    let apiEndpoint = '';
    apiEndpoint = `/moocs/count?access_token=${localStorage.token}&where={"fk_id_poster_profile":${this.props.userProfile.id}}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        this.setState({ countesMoocs: response.data.count });
      }
    });
    apiEndpoint = `/course_v4/count?access_token=${localStorage.token}&where={"fk_id_professor":${this.props.userProfile.user.profiles[0].professors[0].id}}`;
    classService.get(apiEndpoint).then((response) => {
      if (response) {
        this.setState({ countesClass: response.data.count });
      }
    });
  }
  render() {
    /* eslint eqeqeq: "off" */

    const detailCards = [
      {
        cardColor: 'primary',
        imageIcon: require('../../../../assets/images/dashboard/project-icon.png'),
        // title: 7,
        subTitle: <IntlMessages id="dashborad.prof.observations" />,
      },
      {
        cardColor: 'secondary',
        imageIcon: require('../../../../assets/images/dashboard/tasks-icon.png'),
        // title: this.state.countesClass,
        subTitle: 'Groupe de formation',
      },
      {
        cardColor: 'info',
        imageIcon: require('../../../../assets/images/dashboard/teams-icon.png'),
        // title: 102,
        subTitle: <IntlMessages id="dashborad.prof.notes" />,
      },
      {
        cardColor: 'warning',
        imageIcon: require('../../../../assets/images/dashboard/files-icon.png'),
        // title: this.state.countesMoocs,
        subTitle: <IntlMessages id="dashborad.prof.moocs" />,
      },
      // {
      //   cardColor: "warning",
      //   imageIcon: require("../../../../assets/images/dashboard/files-icon.png"),
      //   // title: 87,
      //   subTitle: <IntlMessages id="dashborad.prof.homework.notebook" />,
      // },
    ];
    return (
      <div className="app-wrapper d-flex flex-column  col-lg-12 col-md-12 col-sm-12 ">
        <div className="row d-flex flex-wrap justify-content-between col-lg-12 col-md-12 col-sm-12">
          {detailCards.map((data, index) => (
            <div key={index} className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12">
              <IconWithTextCard data={data} />
            </div>
          ))}
        </div>
        <div className="d-flex  flex-wrap flex-row">
          {/* /////// div1 */}
          <div className="col-lg-5 col-md-7 col-sm-12">
            <BigCalendarCustomized events={this.props.events} userProfile={this.props.userProfile}></BigCalendarCustomized>
          </div>

          {/* /////// div1 */}

          {/* /////// div2 */}

          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="d-flex flex-column bd-highlight mb-3">
              <div className="p-2 bd-highlight  ">
                <Card className={`shadow border-0 text-left`}>
                  <CardHeader className="bg-yellow text-primary">
                    <span
                      style={{
                        position: 'absolute',
                        marginTop: '-7px',
                        fontSize: '13px',
                      }}
                    >
                      <IntlMessages id="dashborad.prof.Fiche séance non saisie" />{' '}
                    </span>
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                      }}
                    >
                      <IconButton color="primary">
                        <i className="zmdi zmdi-more-vert" />
                      </IconButton>
                      &nbsp;
                      <IconButton color="primary">
                        <i className="zmdi zmdi-close" size="small" />
                      </IconButton>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex flex-column bd-highlight mb-3">
                      <div className=" bd-highlight">
                        <div className="d-flex flex-row justify-content-between bd-highlight mb-3">
                          <div className=" bd-highlight text-primary">
                            {/* <i
                              className="zmdi zmdi-circle "
                              style={{ fontSize: "8px" }}
                            />{" "}
                            Mardi 10 Déc .-10h
                            <br />
                            <span className="text-grey"> Mathématiques</span> */}
                          </div>
                          <div className=" bd-highlight">
                            {/* <Badge
                              className="ml-2 text-uppercase"
                              color="primary"
                            >
                              3ème D1
                            </Badge> */}
                          </div>
                        </div>
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '5%',
                            marginBottom: '5%',
                            border: '1px solid #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                      </div>
                      <div className=" bd-highlight">
                        <div className="d-flex flex-row justify-content-between bd-highlight mb-3">
                          <div className=" bd-highlight text-primary">
                            {/* <i
                              className="zmdi zmdi-circle "
                              style={{ fontSize: "8px" }}
                            />
                            &nbsp;Mardi 10 Déc .-10h <br />
                            <span className="text-grey"> Mathématiques</span> */}
                          </div>
                          <div className=" bd-highlight">
                            {/* <Badge
                              className="ml-2 text-uppercase"
                              color="primary"
                            >
                              3ème D2
                            </Badge> */}
                          </div>
                        </div>
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '5%',
                            marginBottom: '5%',
                            border: '1px solid #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                      </div>
                      <div className=" bd-highlight">
                        <div className="d-flex flex-row justify-content-between bd-highlight mb-3">
                          <div className=" bd-highlight text-primary">
                            {/* <i
                              className="zmdi zmdi-circle "
                              style={{ fontSize: "8px" }}
                            />
                            &nbsp;Mercredi 10 Déc .-10h <br />
                            <span className="text-grey"> Mathématiques</span> */}
                          </div>
                          <div className=" bd-highlight">
                            {/* <Badge
                              className="ml-2 text-uppercase"
                              color="primary"
                            >
                              3ème D3
                            </Badge> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div class="p-2 bd-highlight">
                <Card className={`shadow border-0 text-left`}>
                  <CardHeader className="bg-yellow text-primary">
                    <span
                      style={{
                        position: 'absolute',
                        marginTop: '-7px',
                        fontSize: '12px',
                      }}
                    >
                      <IntlMessages id="dashborad.prof.Devoir.rendre" />{' '}
                    </span>
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                      }}
                    >
                      <IconButton color="primary">
                        <i className="zmdi zmdi-more-vert" />
                      </IconButton>
                      &nbsp;
                      <IconButton color="primary">
                        <i className="zmdi zmdi-close" size="small" />
                      </IconButton>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex flex-column bd-highlight mb-3">
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-row bd-highlight mb-3">
                          <div className=" bd-highlight">
                            {/* <i
                              className="zmdi zmdi-circle "
                              style={{ fontSize: "8px", color: "orange" }}
                            />
                            &nbsp;
                            <span className="text-orange">
                              Mercredi 10 Déc .-10h
                            </span>
                            <br />
                            <span className="text-grey"> Mathématiques</span> */}
                          </div>
                          <div className="pl-3 bd-highlight">
                            {/* <Badge
                              className="ml-2 text-uppercase"
                              color="primary"
                            >
                              3ème D3
                            </Badge> */}
                          </div>
                          <div className=" bd-highlight" style={{ marginTop: '-8px' }}>
                            {/* <Checkbox
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            /> */}
                          </div>
                        </div>
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '5%',
                            marginBottom: '5%',
                            border: '1px solid #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                      </div>
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-row bd-highlight mb-3">
                          <div className=" bd-highlight">
                            {/* <i
                              className="zmdi zmdi-circle "
                              style={{ fontSize: "8px", color: "orange" }}
                            />
                            &nbsp;
                            <span className="text-orange">
                              Mercredi 10 Déc .-10h
                            </span>{" "}
                            <br />
                            <span className="text-grey"> Mathématiques</span> */}
                          </div>
                          <div className="pl-3 bd-highlight">
                            {/* <Badge
                              className="ml-2 text-uppercase"
                              color="primary"
                            >
                              3ème D3
                            </Badge> */}
                          </div>
                          <div className=" bd-highlight" style={{ marginTop: '-8px' }}>
                            {/* <Checkbox
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            /> */}
                          </div>
                        </div>
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '5%',
                            marginBottom: '5%',
                            border: '1px solid #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                      </div>
                      <div className="p-2 bd-highlight">
                        <div className="d-flex flex-row bd-highlight mb-3">
                          <div className=" bd-highlight">
                            {/* <i
                              className="zmdi zmdi-circle "
                              style={{ fontSize: "8px", color: "orange" }}
                            />
                            &nbsp;
                            <span className="text-orange">
                              Mercredi 10 Déc .-10h
                            </span>{" "}
                            <br />
                            <span className="text-grey"> Mathématiques</span> */}
                          </div>
                          <div className="pl-3 bd-highlight">
                            {/* <Badge
                              className="ml-2 text-uppercase"
                              color="primary"
                            >
                              3ème D3
                            </Badge> */}
                          </div>
                          <div className=" bd-highlight" style={{ marginTop: '-8px' }}>
                            {/* <Checkbox
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="p-2 bd-highlight">
                <h2> {<IntlMessages id="dashboard.rate.success" />}</h2>
                <ResponsiveContainer width="100%" height={425}>
                  <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
          </div>

          {/* /////// div2 */}

          {/* /////// div3 */}

          <div className=" col-lg-3 col-md-6 col-sm-12">
            <div className="d-flex flex-column bd-highlight ">
              <div className=" bd-highlight">
                {' '}
                <SolidCards headerText="Primary Card" cardStyle="bg-yellow text-white" />
              </div>
              <div className=" bd-highlight">
                <SimpleCard />
              </div>
              <div className=" bd-highlight">
                <NewsletterCard headerText="Primary Card" cardStyle="bg-white text-white" />
              </div>
            </div>
          </div>
          {/* /////// div3 */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    events: state.planning.events,
  };
};
export default connect(mapStateToProps)(ProfessorDashboard);
