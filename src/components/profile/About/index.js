import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Widget from "../../Widget/index";
import { aboutList } from "../../../app/routes/userProfile/Profile/data";
import AboutItem from "./AboutItem";
import moment from "moment";
import "moment/locale/fr";
class About extends React.Component {
  state = {
    aboutList,
    user: this.props.userProfile,
    value: 0,

    userImageList: [
      {
        id: 1,
        image: "https://via.placeholder.com/150x150",
      },
      {
        id: 2,
        image: "https://via.placeholder.com/150x150",
      },
      {
        id: 3,
        image: "https://via.placeholder.com/150x150",
      },
      {
        id: 4,
        image: "https://via.placeholder.com/150x150",
        name: "Mila Alba",
        rating: "5.0",
        deals: "27 Deals",
      },
    ],

    aboutList: [],
    eventList: [
      {
        id: 1,
        image: "https://via.placeholder.com/575x480",
        title: "Sundance Film Festival.",
        address: "Downsview Park, Toronto, Ontario",
        date: "Feb 23, 2019",
      },
      {
        id: 2,
        image: "https://via.placeholder.com/575x480",
        title: "Underwater Musical Festival.",
        address: "Street Sacramento, Toronto, Ontario",
        date: "Feb 24, 2019",
      },
      {
        id: 3,
        image: "https://via.placeholder.com/575x480",
        title: "Village Feast Fac",
        address: "Union Street Eureka",
        date: "Oct 25, 2019",
      },
    ],

    contactList: [
      {
        id: 1,
        title: "Email",
        icon: "email",
        desc: [
          <span className="jr-link" key={1}>
            kiley.brown@example.com
          </span>,
        ],
      },
      {
        id: 2,
        title: "Web page",
        icon: "link",
        desc: [
          <span className="jr-link" key={2}>
            example.com
          </span>,
        ],
      },
      {
        id: 3,
        title: "Phone",
        icon: "phone",
        desc: ["+1-987 (454) 987"],
      },
    ],
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.userProfile != this.props.userProfile) {
      this.setState({
        user: this.props.userProfile,
      });
      var About = [
        {
          id: 1,
          title: "Établissement",
          icon: "city-alt",
          userList: "",
          desc: [this.props.userProfile.establishments[0].establishment.name],
        },
        {
          id: 2,
          title: "Anniversaire",
          icon: "cake",
          userList: "",
          desc: [
            moment(this.props.userProfile.userdate_of_birth).format(
              "DD MMMM YYYY"
            ),
          ],
        },
        {
          id: 3,
          title: "CIN",
          icon: "graduation-cap",
          userList: "",
          desc: [this.props.userProfile.user.cin],
        },
        {
          id: 4,
          title: "Address",
          icon: "home",
          userList: "",
          desc: [this.props.userProfile.user.address],
        },
      ];
      this.setState({
        aboutList: About,
      });
    }
  }
  render() {
    console.log("profile",this.props.userProfile.user)
    const { value, aboutList } = this.state;
    const { profileItem } = this.props;
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0">Informations personnelles</h4>
          <div class="d-flex flex-column">
            <div class="d-flex flex-column p-3">
              <h4 className="card-title">Informations générales</h4>
              <h5>
                Certaines de ces informations peuvent être vues par le super
                administrateur d' Educap.
              </h5>
            </div>
            <div className="col-md-6 col-lg-12 col-sm-12 d-flex flex-row justify-content-between">
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i
                    className={`zmdi zmdi-account-circle jr-fs-xlxl text-orange`}
                  />
                </div>
                <label htmlFor="profileName">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="profileName"
                  // value={profileItem.name +" "+profileItem.surname}
                />
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i className={`zmdi zmdi-cake jr-fs-xlxl text-orange`} />
                </div>
                <label htmlFor="birthDayDateProfile">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="birthDayDateProfile"
                  value={"éalaa"}
                />
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i
                    className={`zmdi zmdi-male-female jr-fs-xlxl text-orange`}
                  />
                </div>
                <label htmlFor="identifier">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="identifier"
                  value={"éalaa"}
                />
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i className={`zmdi zmdi-city jr-fs-xlxl text-orange`} />
                </div>
                <label htmlFor="identifier">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="identifier"
                  value={"éalaa"}
                />
              </div>
            </div>

            {/* ------------------ */}
            <div className="col-md-6 col-lg-12 col-sm-12 d-flex flex-row justify-content-between p-3">
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i
                    className={`zmdi zmdi-account-circle jr-fs-xlxl text-orange`}
                  />
                </div>
                <label htmlFor="profileName">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="profileName"
                  value={"Alaaeddine OUNI"}
                />
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i
                    className={`zmdi zmdi-account-circle jr-fs-xlxl text-orange`}
                  />
                </div>
                <label htmlFor="profileName">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="profileName"
                  value={"Alaaeddine OUNI"}
                />
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i
                    className={`zmdi zmdi-account-circle jr-fs-xlxl text-orange`}
                  />
                </div>
                <label htmlFor="profileName">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="profileName"
                  value={"Alaaeddine OUNI"}
                />
              </div>
              <div class="d-flex flex-row justify-content-between">
                <div className="mr-3">
                  <i
                    className={`zmdi zmdi-account-circle jr-fs-xlxl text-orange`}
                  />
                </div>
                <label htmlFor="profileName">
                  {/* <IntlMessages id="user.id" /> */}
                </label>
                <input
                  // disabled={true}
                  className="form-control"
                  id="profileName"
                  value={"Alaaeddine OUNI"}
                />
              </div>
            </div>




             {/* ------------------ */}
            <div class="p-2">Flex item 2</div>
            <div class="p-2">Flex item 3</div>
            <div class="p-2">Flex item 2</div>
            <div class="p-2">Flex item 3</div>
          </div>
        </div>

        {/* <div className="jr-tabs-classic">
          <div lassName="row">
            <div className="card-header">
              <div class="d-flex flex-column">
                <div class="p-2">
                  <h4 className="card-title ">Informations générales</h4>
                </div>
                <div class="p-1">
                  <h6>
                    Certaines de ces informations peuvent être vues par les
                    autres utilisateurs des services Google
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row bg-red">
                 <label for="exampleFormControlInput1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
             
            </div>
        </div> */}
      </Widget>
    );
  }
}
export default About;
