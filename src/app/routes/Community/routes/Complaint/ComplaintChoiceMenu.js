import React from "react";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import ComplaintChangeStatus from "./ComplaintChangeStatus";
import MenuItem from "@material-ui/core/MenuItem";
import {
  onReclamSend,
  onChangeStatusClose,
  handleReclamRequestClose,
} from "../../../actions/complaintAction";
import AddComplaint from "./AddComplaint";
import ReclamDetail from "./ReclamDetail";
import DeleteComplaint from "./DeleteComplaint";
import IntlMessages from "../../../util/IntlMessages";
import { roleIdAdmin } from "../../../config/config";

class ComplaintChoiceMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      openCompose: false,
      openChangeStatus: false,
      openDetail: false,
      openDelete: false,
      showMessage: false,
    };
  }

  onComposeMail = () => {
    this.setState({ openCompose: true });
  };
  onChangeStatus = () => {
    this.setState({ openChangeStatus: true });
  };
  onOpenDetail = () => {
    this.setState({ openDetail: true });
  };
  onOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleComposeClose = () => {
    this.setState({ openCompose: false });
    this.props.handleReclamRequestClose();
  };
  handleChangeStatusClose = () => {
    this.setState({ openChangeStatus: false });
    this.props.onChangeStatusClose();
  };
  handleDetailClose = () => {
    this.setState({ openDetail: false });
  };
  handleDeleteClose = () => {
    this.setState({ openDelete: false });
    this.props.handleReclamRequestClose();
  };
  handleShowClose = () => {
    this.setState({ showMessage: false });
  };

  onReclamSend(data) {
    this.props.onReclamSend(data);
  }
  render() {   /* eslint eqeqeq: "off" */
    const data = this.props.data;
    const {
      openCompose,
      openChangeStatus,
      openDetail,
      openDelete,
    } = this.state;

    const { menuState, anchorEl, handleRequestClose } = this.props;
    return (
      <div>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={menuState}
          onClose={handleRequestClose}
          MenuListProps={{
            style: {
              width: 150,
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          <MenuItem
            key="{afficher}"
            onClick={() => {
              this.onOpenDetail();
              handleRequestClose();
            }}
          >
            <IntlMessages id="Reclam.Afficher" />
          </MenuItem>
          <MenuItem
            key="{Répondre}"
            onClick={() => {
              this.onComposeMail();
              handleRequestClose();
            }}
            disabled={this.props.type === "Envoyées"}
          >
            <IntlMessages id="Reclam.répondre" />
          </MenuItem>
          {localStorage.roles_id===roleIdAdmin &&
          this.props.type != "Envoyées" ? (
            <MenuItem
              key="{modifier l'état}"
              onClick={() => {
                this.onChangeStatus();
                handleRequestClose();
              }}
              // disabled={this.props.type === "Envoyées"}
            >
              <IntlMessages id="Reclam.modifier" />
            </MenuItem>
          ) : (
            ""
          )}

          {localStorage.roles_id===roleIdAdmin ? (
            <MenuItem
              key="{Supprimer}"
              onClick={() => {
                this.onOpenDelete();
                handleRequestClose();
              }}
            >
              <IntlMessages id="Reclam.supprimer" />
            </MenuItem>
          ) : (
            ""
          )}
        </Menu>
        <AddComplaint
          open={openCompose}
          subjectReply={data.subject}
          emailReplay={data.profile.user.email}
          receiverID={data.sender_id}
          onClose={this.handleComposeClose.bind(this)}
          onMailSend={this.onReclamSend.bind(this)}
        />
        <ComplaintChangeStatus
          data={data}
          open={openChangeStatus}
          onClose={this.handleChangeStatusClose.bind(this)}
        ></ComplaintChangeStatus>
        <ReclamDetail
          type={this.props.type}
          data={data}
          onClose={this.handleDetailClose.bind(this)}
          open={openDetail}
          compose={this.onComposeMail.bind(this)}
        />
        {openDelete ? (
          <DeleteComplaint
            cancelModalDelete={this.handleDeleteClose.bind(this)}
            itemId={data.id}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(
  mapStateToProps,
  {
    onReclamSend,
    onChangeStatusClose,
    handleReclamRequestClose,
  }
)(ComplaintChoiceMenu);
