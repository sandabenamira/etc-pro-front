import React, { Component } from "react";
import Widget from "../../Widget";
import { contactList } from "../../../app/routes/userProfile/Profile/data";
class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      contactList: [
        {
          id: 1,
          title: "Email",
          icon: "email",
          desc: [""],
        },
        {
          id: 2,
          title: "Web page",
          icon: "link",
          desc: [""],
        },
        {
          id: 3,
          title: "Phone",
          icon: "phone",
          desc: [""],
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile != this.props.userProfile) {
      this.setState({
        user: this.props.userProfile,
      });
      var contact = [
        {
          id: 1,
          title: "Email",
          icon: "email",
          desc: [
            <span className="jr-link" key={1}>
              {this.props.userProfile.user.email}
            </span>,
          ],
        },
        // {
        //   id: 2,
        //   title: 'Web page',
        //   icon: 'link',
        //   desc: [<span className="jr-link" key={2}>example.com</span>]
        // },
        {
          id: 3,
          title: "Phone",
          icon: "phone",
          desc: [this.props.userProfile.user.phone],
        },
      ];
      this.setState({
        contactList: contact,
      });
    }
  }
  render() {
    return (
      <Widget title="Contact" styleName="jr-card-profile-sm">
        {this.state.contactList.length > 0
          ? this.state.contactList.map((data, index) => (
              <div
                key={index}
                className="media align-items-center flex-nowrap jr-pro-contact-list"
              >
                <div className="mr-3">
                  <i className={`zmdi zmdi-${data.icon} jr-fs-xxl text-grey`} />
                </div>
                <div className="media-body">
                  <span className="mb-0 text-grey jr-fs-sm">{data.title}</span>
                  <p className="mb-0">{data.desc}</p>
                </div>
              </div>
            ))
          : null}
      </Widget>
    );
  }
}

export default Contact;
