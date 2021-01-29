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
    const { value, aboutList } = this.state;
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0">About</h4>
        </div>
        <div className="jr-tabs-classic">
          <Tabs
            className="jr-tabs-up"
            value={value}
            onChange={this.handleChange}
          >
            <Tab className="jr-tabs-label" label="Overview" />
            <Tab className="jr-tabs-label" label="Work" />
            <Tab className="jr-tabs-label" label="Education" />
          </Tabs>
          <div className="jr-tabs-content jr-task-list">
            <div className="row">
              {value === 0 &&
                aboutList.map((about, index) => (
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                    <AboutItem data={about} />
                  </div>
                ))}
              {/* {value === 1 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)} */}
              {/* {value === 2 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)} */}
            </div>
          </div>
        </div>
      </Widget>
    );
  }
}
export default About;
