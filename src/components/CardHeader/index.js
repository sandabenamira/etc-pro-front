import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CardMenu from "./CardMenu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
class CardHeader extends React.Component {
  onOptionMenuSelect = (event) => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
    };
  }

  render() {
    const { heading, subHeading } = this.props;
    let { styleName } = this.props;
    const { anchorEl, menuState } = this.state;
    return (
      <div className={` d-flex align-items-start ${styleName}`}>
        <div className="mr-auto">
          <h3 className="card-heading">{heading}</h3>
          {subHeading && <p className="sub-heading">{subHeading}</p>}
        </div>

        <IconButton
          className="icon-btn text-dark"
          onClick={this.onOptionMenuSelect.bind(this)}
        >
          <MoreHorizIcon />
        </IconButton>
        <CardMenu
          menuState={menuState}
          anchorEl={anchorEl}
          handleRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    );
  }
}

export default CardHeader;
CardHeader.defaultProps = {
  styleName: "",
  subHeading: "",
};
