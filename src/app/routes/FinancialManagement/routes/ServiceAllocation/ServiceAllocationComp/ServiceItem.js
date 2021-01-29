import React, { Component } from "react";
import { element } from "prop-types";

export default class ServiceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: false,
    };
    this.handleIconName = this.handleIconName.bind(this);
    this.alertIcon = this.alertIcon.bind(this);
  }
  alertIcon(event) {
    this.props.alertIcon(event.target.id);
  }

  handleIconName(event) {
    this.setState((previousState) => ({
      color: !previousState.color,
    }));

    this.props.handleIcon(event.target.id);
  }

  componentDidMount() {
    if (this.props.color !== -1 && this.props.color !== undefined) {
      this.setState({ color: true });
    }
  }

  render() {
    var colorIcon;
    if (this.state.color == true) {
      colorIcon = "blue";
    } else {
      colorIcon = "black";
    }
    let element = this.props.item;

    return (
      <div className=" col-md-3 d-flex flex-row bd-highlight align-items-start justify-content-start  mb-3 ">
        <div className="p-2 d-flex align-items-center justify-content-start ">
          {" "}
          <i
            id={element.id}
            className={`${element.path_img_service}`}
            style={{ color: colorIcon, cursor: "pointer" }}
            onClick={
              this.props.color !== -1 && this.props.color !== undefined
                ? this.alertIcon
                : this.handleIconName
            }
          ></i>
        </div>
        <div
          className="p-2   d-flex align-items-center "
          style={{ color: "black" }}
        >
          {element.name_fr_service}
        </div>
      </div>
    );
  }
}
