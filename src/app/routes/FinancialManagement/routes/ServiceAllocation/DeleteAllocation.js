import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  // addAllocationService,
  // editAllocationService,
  // getAllocationServiceByEstablishment,
  deleteAllocationService,
  deleteFailed,
} from "../../../../../actions/AllocationServiceAction";
class DeleteAllocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleDelete = (e) => {
    var deleteOption = true;
    var month = new Date();
    let currentMonth = month.getMonth() + 1;

    const item = this.props.item;
    var allocationMonth = item.services;

    allocationMonth.map((element) => {
      var id;
      id = element.allocation_month.indexOf(currentMonth);
      if (id > 0) {
        deleteOption = false;
      }
    });

    if (deleteOption) {
      allocationMonth.map((element) => {
        var allocationData = {};
        allocationData.id = element.id;
        allocationData.status = false;
        this.props.deleteAllocationService(
          allocationData,
          this.props.userProfile.establishment_id,
          this.props.userProfile.school_year_id
        );
      });
    } else {
      this.props.deleteFailed();
    }

    this.props.cancelModalDelete();
  };

  handleRequestClose = () => {
    this.props.cancelModalDelete();
  };

  render() {   /* eslint eqeqeq: "off" */
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Slide}
          onClose={this.handleRequestClose}
        >
          <DialogContent>
            <DialogContentText>
              {<IntlMessages id="message.confirm.modal" />}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="secondary">
              {<IntlMessages id="button.no" />}
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              {<IntlMessages id="button.yes" />}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
  };
}

export default connect(
  mapStateToProps,
  {
    // addAllocationService,
    // editAllocationService,
    // getAllocationServiceByEstablishment,
    deleteAllocationService,
    deleteFailed,
  }
)(DeleteAllocation);
