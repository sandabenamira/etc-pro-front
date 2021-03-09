import React, { Component } from 'react';
import IntlMessages from '../../../util/IntlMessages';
import Auxiliary from '../../../util/Auxiliary';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import CardBox from '../../../components/CardBox/index';
import Button from '@material-ui/core/Button';
import { UncontrolledAlert } from 'reactstrap';
import moment from 'moment';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import { connect } from 'react-redux';
class AddCafeteriaMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerte: false,
      alerteDate: false,
    };
    this.checkDate = this.checkDate.bind(this);
  }
  checkDate = (date) => {
    const result = this.props.MenuList.filter(
      (menu) => moment(menu.menu_date).format('LL')===moment(date).format('LL')
    );

    return result;
  };
  render() {   /* eslint eqeqeq: "off" */
    const {
      values,
      addIsopen,
      handleCancel,
      handleChange,
      addCafeteriaMenu,
      MenuList,
    } = this.props;
    var disabled =
      values.dessert==='' ||
      values.prix === '' ||
      values.entree==='' ||
      values.suite==='';
    var result = this.checkDate(values.menu_date);

    return (
      <Auxiliary>
        <Modal isOpen={values.addIsopen}>
          <ModalHeader
            toggle={this.props.handleCancel}
            className="modal-box-header bg-primary text-white"
          >
            {<IntlMessages id="new.cantine.title" />}
          </ModalHeader>
          <br />
          <ModalBody>
            <form autoComplete="off">
              <div className="row">
                <CardBox
                  heading={
                    <IntlMessages id="component.etablishments.info.general" />
                  }
                  styleName="col-lg-12 text-primary"
                >
                  <div className="row">
                    <div className="col-md-6 text-left ">
                      <div className="form-group">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            label="                                           "
                            clearable
                            fullWidth
                            id="menu_date"
                            name="menu_date"
                            value={values.menu_date}
                            onChange={this.props.handleChangeDate}
                            format="DD-MM-YYYY"
                            autoOk
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          required
                          name="prix"
                          id="prix"
                          onChange={handleChange('prix')}
                          error={values.prix < 0}
                          inputProps={{min: 0}}
                          margin="normal"
                          type="number"
                          fullWidth
                          helperText={
                            <IntlMessages id="service.price" />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardBox>

                <CardBox
                  heading={<IntlMessages id="new.cantine.plats" />}
                  styleName="col-lg-12 text-primary"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <TextField
                          required
                          name="entree"
                          id="entree"
                          label={<IntlMessages id="new.cantine.entree" />}
                          onChange={handleChange('entree')}
                          value={values.entree}
                          margin="normal"
                          fullWidth
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <TextField
                          required
                          name="suite"
                          id="suite"
                          label={<IntlMessages id="new.cantine.suite" />}
                          onChange={handleChange('suite')}
                          value={values.suite}
                          margin="normal"
                          fullWidth
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <TextField
                          required
                          name="dessert"
                          id="dessert"
                          label={<IntlMessages id="new.cantine.dessert" />}
                          onChange={handleChange('dessert')}
                          value={values.dessert}
                          margin="normal"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                </CardBox>
              </div>
              {this.state.alerte ? (
                <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">
                    <IntlMessages id="message.error.cafeteria" />
                  </span>
                </UncontrolledAlert>
              ) : (
                ''
              )}
              {this.state.alerteDate ? (
                <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">
                    <IntlMessages id="message.error.cafeteria.date" />
                  </span>
                </UncontrolledAlert>
              ) : (
                ''
              )}
              <div className="col-md-12 text-right ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-indigo text-white "
                  onClick={() => {
                    if (disabled) {
                      this.setState({ alerte: true });
                      setTimeout(() => {
                        this.setState({ alerte: false });
                      }, 2000);
                    } else {
                      if (result.length===0) {
                        this.props.addCafeteriaMenu();
                      } else {
                        
                        this.setState({ alerteDate: true });
                        setTimeout(() => {
                          this.setState({ alerteDate: false });
                        }, 2000);
                      }
                    }
                  }}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonAdd" />
                  }
                </Button>
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.handleCancel}
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
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    classLevels: state.ClassLevels.remoteLevels,
    classSections: state.classSections.remoteSections,
    classes: state.classes,
    settings: state.settings.locale,
  };
}
export default connect(
  mapStateToProps,
  {}
)(AddCafeteriaMenu);
