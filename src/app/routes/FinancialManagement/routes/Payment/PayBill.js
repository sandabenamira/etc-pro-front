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
import { payBill, editBill } from "../../../../../actions/PaymentAction";
import { connect } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";
import { classService } from "../../../../../_services/class.service";
import { partiallyPaidInvoice } from "../../../../../config/config";

class PayBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //     const data = this.props.invoice;
  //     const today = moment().format();
  //     const paymentDay = today.split('T');
  //     if (data.bill.status === partiallyPaidInvoice) {
  //         let apiEndpoint = `/payments_v2?access_token=${localStorage.token}&filter[where][fk_id_bill]=${data.bill.id}`;
  //         classService.get(apiEndpoint).then((response) => {
  //             const price = parseInt(response.data[0].price_invoice) - parseInt(response.data[0].price_paid)
  //             this.setState({ price, oldPrice:parseInt(response.data[0].price_paid), paymentDay: paymentDay[0] , idPaymentV2:response.data[0].id})
  //         });
  //     } else {
  //         this.setState({ price: data.bill.total_incl_tax, paymentDay: paymentDay[0] })
  //     }
  // }
  render() {   /* eslint eqeqeq: "off" */
    const {
      paymentDay,
      price,
      paymentMethode,
      priceError,
      openPay,
      paymentMethodeError,
      priceRestant,
      priceTotal,
    } = this.props.values;
    return (
      <div>
        <Auxiliary>
          <Modal isOpen={openPay}>
            <ModalHeader
              toggle={this.props.cancelModal}
              className="modal-box-header bg-primary text-white"
            >
              <div className="jr-currentplan-col pb-xl-2 text-center">
                <h2 className="text-white jr-font-weight-medium ">
                  {<IntlMessages id="invoice.reference" />}{" "}
                  {this.props.invoice.invoiceNumber}
                </h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <form
                className="row"
                autoComplete="off"
                onSubmit={this.props.handleSubmit}
              >
                <div className="col-sm-6">
                  <InputLabel htmlFor="price">Montant Total</InputLabel>

                  <TextField
                    id="price"
                    disabled
                    value={priceTotal+" "+"TND"}
                    fullWidth
                    inputProps={{
                      style: {
                        fontFamily: "Arial",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: 16,
                      },
                    }}
                  />
                </div>
                <div className="col-sm-6">
                  <InputLabel htmlFor="price">RESTE À PAYER</InputLabel>
                  <div className="col-sm-6">
                    <TextField
                      disabled
                      id="price"
                      value={priceRestant+" "+"TND"}
                      fullWidth
                      inputProps={{
                        style: {
                          fontFamily: "Arial",
                          color: "#308AE0",
                          fontWeight: "bold",
                          fontSize: 16,
                        },
                      }}
                    />
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="col-sm-6">
                  <InputLabel htmlFor="price">
                    {<IntlMessages id="service.price_ttc" />}
                  </InputLabel>
                  <TextField
                    id="price"
                    type="number"
                    value={price}
                    error={priceError}
                    onChange={this.props.handleChangeInput("price")}
                    fullWidth
                  />
                  <FormHelperText error={priceError}>
                    {priceError ? (
                      <IntlMessages id="message.error.price" />
                    ) : (
                      ""
                    )}
                  </FormHelperText>
                </div>
                <div className="col-sm-6">
                  <InputLabel htmlFor="paymentDay">
                    {<IntlMessages id="payment.date" />}
                  </InputLabel>
                  <TextField
                    id="paymentDay"
                    name="paymentDay"
                    type="date"
                    value={moment(paymentDay).format("YYYY-MM-DD")}
                    onChange={this.props.handleChangeInput("paymentDay")}
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
                    // value={paymentMethode}
                    onChange={this.props.handleChangePaymentType(
                      "paymentMethode"
                    )}
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
                  <FormHelperText error={paymentMethodeError}>
                    {paymentMethodeError ? (
                      <IntlMessages id="message.error.payment.methode" />
                    ) : (
                      ""
                    )}
                  </FormHelperText>
                </div>
                <div className="col-md-12  ">
                  <br />
                  <Button
                    variant="contained"
                    className="jr-btn bg-indigo text-white "
                    type="submit"
                    disabled={price===""}
                  >
                    {<IntlMessages id="button.pay" />}
                  </Button>
                  <Button
                    variant="contained"
                    className="jr-btn bg-grey text-white "
                    onClick={this.props.cancelModal}
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
const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
  };
};

export default connect(mapStateToProps)(PayBill);
