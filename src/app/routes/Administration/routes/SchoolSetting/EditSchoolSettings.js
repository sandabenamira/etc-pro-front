import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Auxiliary from '../../../../../util/Auxiliary';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import CardBox from '../../../../../components/CardBox/index';
import { UncontrolledAlert } from 'reactstrap';
import moment from 'moment';
import { RoleContext } from '../../../../../Context';
import { roleIdAdmin } from '../../../../../config/config';
import Can from '../../../../../can';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'TND',
    label: 'DT',
  },
];

const paymentPeriodicity = [
  {
    value: 'MENSUEL',
    label: <IntlMessages id="mode_payment.establishment.monthly" />,
  },
  {
    value: 'TRIMESTRIEL',
    label: <IntlMessages id="mode_payment.establishment.trimester" />,
  },
  {
    value: 'ANNUEL',
    label: <IntlMessages id="mode_payment.establishment.annual" />,
  },
];

class editSchoolSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: true,
      name: '',
      details: '',
      start_date: '',
      end_date: '',
      price: '',
      price_ttc: '',
      tva: '',
      note: '',
      establishment_id: '',
      currency: '',
      payment_periodicity: '',
      id: 0,
      errorMessage: false,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

//   componentDidMount() {
//     const start_date = this.props.serviceItem.start_date;
//     const newStartDate = start_date.split('T');

//     const end_date = this.props.serviceItem.end_date;
//     const newEndDate = end_date.split('T');
//     this.setState({
//       name: this.props.serviceItem.name,
//       details: this.props.serviceItem.details,
//       start_date: newStartDate[0],
//       end_date: newEndDate[0],
//       price: this.props.serviceItem.price,
//       price_ttc: this.props.serviceItem.price_ttc,
//       tva: this.props.serviceItem.tva,
//       currency: this.props.serviceItem.currency,
//       payment_periodicity: this.props.serviceItem.payment_periodicity,
//       note: this.props.serviceItem.note,
//       establishment_id: this.props.serviceItem.establishment_id,
//       id: this.props.serviceItem.id,
//     });
//   }

  handleCancel() {
    this.props.cancelModal();
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleToggle() {
    this.props.cancelModal();
  }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const name = this.state.name;
//     const details = this.state.details;
//     const start_date = this.state.start_date;
//     const end_date = this.state.end_date;
//     const price = this.state.price;
//     const tva = this.state.tva;
//     const price_ttc = Number(price) + Number(price * tva / 100);
//     const currency = this.state.currency;
//     const payment_periodicity = this.state.payment_periodicity;
//     const note = this.state.note;
//     const establishment_id = this.state.establishment_id;
//     const id = this.state.id;

//     const data = {
//       name,
//       details,
//       start_date,
//       end_date,
//       price,
//       price_ttc,
//       tva,
//       currency,
//       payment_periodicity,
//       note,
//       establishment_id,
//       id,
//     };
//     let startDate = moment(this.state.start_date);
//     let endDate = moment(this.state.end_date);
//     let result = moment(endDate).isAfter(startDate);

//     if (result === true) {
//       this.props.dispatch(editService(data));
//       this.props.cancelModal();
//     } else {
//       this.setState({ errorMessage: true });
//       setTimeout(() => {
//         this.setState({
//           errorMessage: false,
//         });
//       }, 5000);
//     }
//   };

  render() {
   // const establishmentList = this.props.establishmentsList;
    return (
      <RoleContext.Consumer>
        {({ role }) => (
          <Can
            role={role}
            perform="service-filter:visit"
            yes={() => (
              <Auxiliary>
                <Modal isOpen={this.state.previewVisible}>
                  <ModalHeader
                    toggle={this.handleToggle.bind(this)}
                    className="modal-box-header bg-primary text-white"
                  >
                    {<IntlMessages id="modif.service" />}
                  </ModalHeader>
                  <ModalBody>
                    <form className="row" onSubmit={this.handleSubmit}>
                      <div className="row">
                        <CardBox
                          heading={
                            <IntlMessages id="component.etablishments.info.general" />
                          }
                          styleName="col-lg-12 text-primary"
                        >
                          <div className="row">
                            <Can
                              role={role}
                              perform="service-filter-establishment:visit"
                              yes={() => (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <TextField
                                      required
                                      name="establishment_id"
                                      id="establishment_id"
                                      select
                                      label={
                                        <IntlMessages id="components.student.formadd.establishment" />
                                      }
                                      value={this.state.establishment_id}
                                      onChange={this.handleChange(
                                        'establishment_id'
                                      )}
                                      SelectProps={{}}
                                      margin="normal"
                                      fullWidth
                                    >
                                      {/* {establishmentList.map( */}
                                        {/* // (establishment) => ( */}
                                          <MenuItem
                                            // key={establishment.id}
                                            // value={establishment.id}
                                          >
                                            {/* {establishment.name} */}
                                          </MenuItem>
                                        // )
                                      {/* )} */}
                                    </TextField>
                                  </div>
                                </div>
                              )}
                            />
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  name="name"
                                  id="name"
                                  label={
                                    <IntlMessages id="components.establishments.formadd.name" />
                                  }
                                  onChange={this.handleChange('name')}
                                  value={this.state.name}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  name="details"
                                  id="details"
                                  multiline
                                  label={<IntlMessages id="toDo.details" />}
                                  onChange={this.handleChange('details')}
                                  value={this.state.details}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                            </div>
                          </div>
                        </CardBox>

                        <CardBox
                          heading={<IntlMessages id="service.settings" />}
                          styleName="col-lg-12 text-primary"
                        >
                          {this.state.errorMessage ? (
                            <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                              <span className="icon-addon alert-addon">
                                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                              </span>
                              <span className="d-inline-block">
                                {' '}
                                {
                                  <IntlMessages id="notification.errorMessage" />
                                }{' '}
                              </span>
                            </UncontrolledAlert>
                          ) : (
                              ''
                            )}
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  id="start_date"
                                  type="date"
                                  value={this.state.start_date}
                                  onChange={this.handleChange('start_date')}
                                  helperText={
                                    <IntlMessages id="startDate.service" />
                                  }
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  id="end_date"
                                  type="date"
                                  value={this.state.end_date}
                                  onChange={this.handleChange('end_date')}
                                  helperText={
                                    <IntlMessages id="endDate.service" />
                                  }
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  name="price"
                                  id="price"
                                  type="number"
                                  value={this.state.price}
                                  onChange={this.handleChange('price')}
                                  inputProps={{ min: 0 }}
                                  error={this.state.price < 0}
                                  helperText={
                                    <IntlMessages id="service.price" />
                                  }
                                  margin="normal"
                                  fullWidth
                                />

                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  id="currency"
                                  name="currency"
                                  select
                                  value={this.state.currency}
                                  onChange={this.handleChange('currency')}
                                  SelectProps={{}}
                                  helperText={
                                    <IntlMessages id="service.currency" />
                                  }
                                  margin="normal"
                                  fullWidth
                                >
                                  {currencies.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  required
                                  name="tva"
                                  id="tva"
                                  type="number"
                                  value={this.state.tva}
                                  error={this.state.tva < 0}
                                  inputProps={{ min: 0, step: 0.01 }}
                                  onChange={this.handleChange('tva')}
                                  helperText={
                                    "TVA"}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <TextField
                                  id="payment_periodicity"
                                  name="payment_periodicity"
                                  select
                                  value={this.state.payment_periodicity}
                                  onChange={this.handleChange(
                                    'payment_periodicity'
                                  )}
                                  SelectProps={{}}
                                  helperText={
                                    <IntlMessages id="service.paymentPeriodicity" />
                                  }
                                  margin="normal"
                                  fullWidth
                                >
                                  {paymentPeriodicity.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <TextField
                                  name="note"
                                  id="note"
                                  multiline
                                  rows={2}
                                  label={
                                    <IntlMessages id="components.note.student.comment" />
                                  }
                                  onChange={this.handleChange('note')}
                                  value={this.state.note}
                                  margin="normal"
                                  fullWidth
                                />
                              </div>
                            </div>
                          </div>
                        </CardBox>
                      </div>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <div className="col-sm-12">
                        <h4>
                          <font color="red">*</font>{' '}
                          {<IntlMessages id="component.required_fields" />}
                        </h4>
                      </div>
                      <div className="col-md-12 text-left ">
                        <br />
                        <br />
                        <Button
                          variant="contained"
                          className="jr-btn bg-indigo text-white "
                          type="submit"
                        >
                          {
                            <IntlMessages id="components.establishments.formModify.buttonModify" />
                          }
                        </Button>
                        <Button
                          variant="contained"
                          className="jr-btn bg-grey text-white "
                          onClick={this.handleCancel}
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
            )}
          />
        )}
      </RoleContext.Consumer>
    );
  }
}

export default connect()(editSchoolSettings);
