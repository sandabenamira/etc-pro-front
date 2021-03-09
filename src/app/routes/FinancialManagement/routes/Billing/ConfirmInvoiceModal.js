import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../util/Auxiliary';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

class ConfirmInvoiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    /* eslint eqeqeq: "off" */
    return (
      <div>
        <Auxiliary>
          <Modal isOpen={true}>
            <ModalHeader toggle={this.props.handleCloseInvoiceModal} className="modal-box-header bg-primary text-white">
              <div className="jr-currentplan-col  ">
                <h2 className="text-white jr-font-weight-medium ">Partager PDF avec e-mail</h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <form
                className="row"
                autoComplete="off"
                // onSubmit={this.props.handleSubmitInvoice}
              >
                <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-column justify-content-start ">
                  <div className="col-lg-8 col-md-8 col-sm-8 p-3 bd-highlight  ">
                    <TextField
                      variant="outlined"
                      label="Mail du premier destinataire "
                      id="ReceiverMail"
                      name="ReceiverMail"
                      value={this.props.values.ReceiverMail}
                      onChange={this.props.handleChange('ReceiverMail')}
                      fullWidth
                    />
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-8 p-3 bd-highlight  ">
                    <TextField
                      label="Mail du second destinataire "
                      id="secondMail"
                      placeholder="Mail du secondaire destinataire "
                      variant="outlined"
                      name="secondMail"
                      value={this.props.values.secondMail}
                      onChange={this.props.handleChange('secondMail')}
                      value={this.props.values.secondMail}
                      fullWidth
                    />
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 d-flex flex-column justify-content-start pt-3">
                  <div className="col-lg-8 col-md-8 col-sm-8 p-3 bd-highlight  ">
                    <InputLabel htmlFor="paymentMethode ">Message</InputLabel>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-8 p-3 bd-highlight  ">
                    <h6>Cher(e),</h6>
                    <h6>Merci pour votre confiance. Votre Facture fournisseur</h6>
                    <h6>peut être consultée, imprimée et téléchargée au format PDF </h6>
                    <h6>à partir du piece joint.</h6>
                    <h6>Référence : FAF-000001</h6>
                    <h6>Date : 2020-12-07</h6>
                    <h6>Totale : 120,600 TND</h6>
                  </div>
                </div>
                <div className="col-md-12   d-flex flex-row justify-content-end">
                  <Button
                    variant="contained"
                    className="jr-btn bg-indigo text-white "
                    type="submit"
                    // disabled={priceError}
                    onClick={this.props.handleSubmitInvoice}
                  >
                    {<IntlMessages id="button.send.message" />}
                  </Button>
                  <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.props.handleCloseInvoiceModal}>
                    {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
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

export default connect(mapStateToProps)(ConfirmInvoiceModal);
