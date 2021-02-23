import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import Button from "@material-ui/core/Button";
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { connect } from "react-redux";

class EditPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      price: "",
      paymentDay: "",
      paymentMethode: "",
      expectedDay: "",
      idItem: "",
      studentServiceId: "",
      profileId: "",
      dataPaymentItem: {},
    };
  }

  componentDidMount() {
    const data = this.props.paymentItem;
    const today = moment().format();
    const paymentDay = today.split("T");
    this.setState({
      price: data.service.price,
      paymentDay: paymentDay[0],
      profileId: this.props.profileId,
    });
  }

  handleChange = (key) => (event, value) => {
    this.setState({ [key]: value, paymentMethode: value });
  };

  handleChangeInput = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCancel() {
    this.props.cancelModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      payment_day: this.state.paymentDay,
      payment_status: "Payé",
      payment_methode: this.state.paymentMethode,
      profile_id: this.state.profileId,
      price: this.state.price,
      idLineOfPayment: this.props.paymentItem.linesPayments[0].id,
    };
    this.props.cancelModal();
  };

  render() {
    const { paymentDay, price, paymentMethode } = this.state;
    const { service } = this.props.paymentItem;
    return (
      <div>
        <Auxiliary>
          <Modal isOpen={this.state.previewVisible}>
            <ModalHeader
              toggle={this.handleCancel.bind(this)}
              className="modal-box-header bg-primary text-white"
            >
              <div className="jr-currentplan-col pb-xl-2 text-center">
                <h2 className="text-white jr-fs-xlxl jr-font-weight-medium mb-2">
                  {service.price} {service.currency}
                  <sub className="jr-fs-md">/{service.payment_periodicity}</sub>
                </h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <form
                className="row"
                autoComplete="off"
                onSubmit={this.handleSubmit}
              >
                <div className="col-sm-6">
                  <InputLabel htmlFor="price">
                    {<IntlMessages id="service.payment.price" />}
                  </InputLabel>
                  <TextField
                    id="price"
                    type="number"
                    value={price}
                    onChange={this.handleChangeInput("price")}
                    fullWidth
                  />
                </div>
                <div className="col-sm-6">
                  <InputLabel htmlFor="paymentDay">
                    {<IntlMessages id="payment.date" />}
                  </InputLabel>
                  <TextField
                    id="paymentDay"
                    name="paymentDay"
                    type="date"
                    value={paymentDay}
                    onChange={this.handleChangeInput("paymentDay")}
                    fullWidth
                  />
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="col-sm-12">
                  <InputLabel htmlFor="paymentMethode">
                    {<IntlMessages id="methode.of.payment" />}
                  </InputLabel>
                  <RadioGroup
                    row
                    aria-label="paymentMethode"
                    name="paymentMethode"
                    value={paymentMethode}
                    onChange={this.handleChange("paymentMethode")}
                  >
                    <FormControlLabel
                      value="Espèce"
                      control={<Radio />}
                      label={<IntlMessages id="payment.service.cash" />}
                    />
                    <FormControlLabel
                      value="Chèque"
                      control={<Radio />}
                      label={<IntlMessages id="payment.service.cheque" />}
                    />
                    <FormControlLabel
                      value="Carte bancaire"
                      control={<Radio />}
                      label={<IntlMessages id="payment.methode.creditCard" />}
                    />
                  </RadioGroup>
                </div>
                <div className="col-md-12  ">
                  <br />
                  <Button
                    variant="contained"
                    className="jr-btn bg-indigo text-white "
                    type="submit"
                  >
                    {<IntlMessages id="button.pay" />}
                  </Button>
                  <Button
                    variant="contained"
                    className="jr-btn bg-grey text-white "
                    onClick={this.handleCancel.bind(this)}
                  >
                    {
                      <IntlMessages id="components.establishments.formadd.buttonCancel" />
                    }
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </Auxiliary>
      </div>
    );
  }
}

export default connect()(EditPayment);
