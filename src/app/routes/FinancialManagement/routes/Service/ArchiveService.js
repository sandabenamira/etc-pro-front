import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ServiceItem from "./ServiceItem";

class ArchiveService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      mensuel: false,
      trimestriel: false,
      hebdomadaire: false,
      annuel: false,
      frequencyVal: "",
      daily: false,
      nameFrService: "",
      typeService: "",
      pathImgService: "",
      currency: [],
      idCurrency: 0,
      vatService: 0,
      otherVatService: 0,
      frequency: [],
      comment: "",
      priceService: 0,
      startDateService: "",
      endDateService: "",
      idFrequency: 0,
      frequencies1: [],
      currencies1: [],
    };
    this.openAddModal = this.openAddModal.bind(this);
  }

  openAddModal() {
    this.setState((previousState) => ({
      open: !previousState.open,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.frequency !== this.props.frequency &&
      this.props.frequency.length > 0
    ) {
      this.setState({
        frequencies1: this.props.frequency,
      });
    }
    if (
      prevProps.currency !== this.props.currency &&
      this.props.currency.length > 0
    ) {
      this.setState({
        currencies1: this.props.currency,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-start align-items-center ">
          <h1>
            <b>
              {" "}
              <IntlMessages id="service.button.archive" />{" "}
            </b>
          </h1>{" "}
          &nbsp;&nbsp;&nbsp;
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.openAddModal}
          >
            <DeleteOutlineIcon />
          </Fab>
        </div>
        <br />
        {this.state.open ? (
          <div className="row">
            {this.props.data.map((element) => (
              <ServiceItem
                services={this.props.services}
                key={element.id}
                item={element}
                frequency={this.state.frequencies1}
                currency={this.state.currencies1}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(ArchiveService);
