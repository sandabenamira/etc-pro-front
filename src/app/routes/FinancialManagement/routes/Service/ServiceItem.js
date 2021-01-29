import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import { element } from "prop-types";
import IntlMessages from "../../../../../util/IntlMessages";
import DetailsService from "./DetailsService";
import EditService from "./EditService";
import {
  deleteServiceV2,
  publishServiceV2,
} from "../../../../../actions/ServiceAction";
import { connect } from "react-redux";

export class ServiceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: undefined,
      menuState: false,
      openDetails: false,
      openEdit: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleCancelDetails = this.handleCancelDetails.bind(this);
    this.handleEditDetails = this.handleEditDetails.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
  }

  handleArchive(event) {
    event.preventDefault();

    this.props.dispatch(deleteServiceV2(this.props.item.id));
    this.handleRequestClose();
  }
  handlePublish(event) {
    event.preventDefault();

    this.props.dispatch(publishServiceV2(this.props.item.id));
    this.handleRequestClose();
  }

  handleEditDetails() {
    this.setState({ open: false, openDetails: false });
    this.setState({ menuState: false, openEdit: true });
  }
  handleCancelDetails() {
    this.setState({ openDetails: false });
  }
  handleCancel() {
    this.setState({ openEdit: false });
  }
  handleDetails() {
    this.setState({ menuState: false, openDetails: true });
  }
  onOptionMenuSelect = (event) => {
    this.setState({
      menuState: true,
      anchorEl: event.currentTarget,
      itemId: event.currentTarget.value,
    });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };
  handleEdit() {
    this.setState({ menuState: false, openEdit: true });
  }
  render() {
    let element = this.props.item;
    const { anchorEl, menuState } = this.state;

    return (
      <div className=" col-md-4">
        <div className="d-flex flex-row bd-highlight justify-content-center flex-wrap mb-3">
          <div className="p-2 align-items-center">
            {" "}
            <i className={`${element.path_img_service}`}></i>
          </div>
          <div className="p-2  align-items-end">{element.name_fr_service}</div>
          <div className=" bd-highlight">
            <IconButton
              onClick={this.onOptionMenuSelect.bind(this)}
              // value={room.id}
            >
              <i className="zmdi zmdi-more-vert" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={menuState}
              onClose={this.handleRequestClose}
              MenuListProps={{
                style: {
                  width: 180,
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
            >
              <div className="row">
                <MenuItem>
                  <IconButton
                    size="small"
                    className="icon-btn"
                    onClick={() => {
                      this.handleRequestClose();
                      this.handleDetails();
                    }}
                  >
                    <i
                      className="zmdi zmdi-eye"
                      style={{ color: "text-grey" }}
                    />
                  </IconButton>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.handleRequestClose();
                    this.handleEdit();
                  }}
                >
                  {<IntlMessages id="button.modify" />}
                </MenuItem>

                {element.status_service == true ? (
                  <MenuItem onClick={this.handleArchive}>
                    <DeleteIcon />
                  </MenuItem>
                ) : (
                  <MenuItem onClick={this.handlePublish}>
                    <PublishIcon />
                  </MenuItem>
                )}
              </div>
            </Menu>
          </div>
        </div>
        <DetailsService
          data={element}
          openDetail={this.state.openDetails}
          cancel={this.handleCancelDetails}
          modify={this.handleEditDetails}
        />
        <EditService
          services={this.props.services}
          data={element}
          openEdit={this.state.openEdit}
          cancel={this.handleCancel}
          frequency={this.props.frequency}
          currency={this.props.currency}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ServiceItem);
