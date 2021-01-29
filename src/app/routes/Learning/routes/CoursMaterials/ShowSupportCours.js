import React, { Component } from 'react';
import Auxiliary from "../../../../../util/Auxiliary";
import { Modal, ModalHeader } from 'reactstrap';
import IntlMessages from '../../../../../util/IntlMessages';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


class ShowSupportCours extends Component {

  render() {
    const sys = Date.parse(new Date()) / 60000;
    const start =
      Date.parse(
        this.props.values.classItem.date_virtual_class.slice(0, 10) +
          ' ' +
          this.props.values.classItem.start_time_class
      ) / 60000;
    const end =
      Date.parse(
        this.props.values.classItem.date_virtual_class.slice(0, 10) +
          ' ' +
          this.props.values.classItem.end_time_class
      ) / 60000;

    const duration_h = Math.floor((end - start) / 60);
    const duration_min = (end - start) % 60;
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const statusClass =
      start > sys ? (
        <IntlMessages id="status.classe.virtual.programmé" />
      ) : end > sys ? (
        <IntlMessages id="status.classe.virtual.progrés" />
      ) : (
        <IntlMessages id="status.classe.virtual.términé" />
      );
    const statusStyle =
      start > sys
        ? 'text-white bg-success'
        : end > sys
        ? 'bg-amber'
        : 'text-white bg-danger';

    const date_Class = this.props.values.classItem.date_virtual_class;

    const date_Class_EN = new Date(date_Class).toLocaleDateString(
      'en-US',
      options
    );
    const date_Class_FR = new Date(date_Class).toLocaleDateString(
      'fr-FR',
      options
    );
    const date_Class_AR = new Date(date_Class).toLocaleDateString(
      'ar-TN',
      options
    );


    return (
      <Auxiliary>
        <Modal
          className="modal-box modal-box-mail"
          isOpen={this.props.values.showModaldetails}
          style={{ zIndex: 2600 }}
          
        >
          <ModalHeader
            className="modal-box-header bg-primary text-white"
            // align="right"
            toggle={this.props.handleCancel}
          
          ></ModalHeader>
          <div className="module-detail mail-detail">
            <div className="jr-card text-center">
              <div className={`jr-card-header-color bg-gradient-primary`}>
                <div className="jr-card-header-top" >
                  <div>
                    
                    <h3 className="mb-0 text-white">
                      {this.props.settings.languageId == 'tunisia'
                        ? date_Class_AR + '   على الساعة  '
                        : this.props.settings.languageId == 'french'
                        ? date_Class_FR + '   '
                        : date_Class_EN + '   '}
                    </h3>
                  </div>
                </div>

                <img
                  className="rounded-circle size-90 avatar-shadow mb-3"
                  src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png"
                  alt="Team Member"
                />

                <div className="jr-card-hd-content">
                  <h4 className="mb-0 text-white">
                    {this.props.settings.languageId == 'tunisia'
                      ? this.props.values.classItem.ProfessorNameAR
                      : this.props.values.classItem.ProfessorName}
                  </h4>
                </div>
              </div>
              <div className="jr-card-body pt-2">
                <p className="message">
                  <font size="+2"> {this.props.values.classItem.object}</font>
                </p>

                <div style={{ height:"550px"}}>
<iframe allow="camera; microphone; fullscreen; display-capture" src={"https://meet.jit.si/"+ this.props.values.classItem.virtual_class_name} style={{height: '100%', width: '100%', border: 0}} />
                </div>
              </div>
            </div>
            <div className="col-md-12 text-right ">
                <br /><br />
                <Button variant="contained" className="jr-btn bg-grey text-white "  onClick={this.props.handleCancel} >{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
              </div>
          </div>
        </Modal>
      </Auxiliary>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings.locale,
  };
}
export default connect(
  mapStateToProps,
  {}
)(ShowSupportCours);
