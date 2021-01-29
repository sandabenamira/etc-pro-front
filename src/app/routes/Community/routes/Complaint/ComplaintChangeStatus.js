import React from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
 import IntlMessages from '../../../util/IntlMessages';
import { connect } from 'react-redux';
import CardBox from '../../../components/CardBox/index';
import { Modal, ModalHeader } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { editStatus } from '../../../actions/complaintAction';

class ComplaintChangeStatus extends React.Component {
  createNotification = (type) => {
    const data = this.props.data;

    return () => {
      switch (type) {
        case 'traitée':
          NotificationManager.success('Changement éffectué');
          const data2 = { status: 'traitée', id: data.id };
          this.props.editStatus(data2);
          break;
        case 'en cours':
          NotificationManager.warning('Changement éffectué');
          const data3 = { status: 'en cours', id: data.id };
          this.props.editStatus(data3);
          break;
        case 'non traitée':
          NotificationManager.error('Changement éffectué');
          const data4 = { status: 'non traitée', id: data.id };
          this.props.editStatus(data4);
          break;
        default:
          NotificationManager.info('Changement éffectué');
      }
    };
  };

  render() {
    const { onClose } = this.props;

    return (
      <div>
        <Modal
          className="modal-box modal-box-mail"
          isOpen={this.props.open}
          style={{ zIndex: 2600 }}
        >
          <ModalHeader className="modal-box-header bg-primary text-white">
            <IntlMessages id="Reclam.changerStatus" />
            <IconButton className="text-white" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>

          <CardBox
            styleName="col-12"
            heading={<IntlMessages id="Reclam.choisirStatus" />}
            childrenStyle="text-center"
          >
            <div className="row" align="center">
              <div className="col-md-4">
                <button
                  variant="contained"
                  size="large"
                  className="btn btn-success"
                  onClick={this.createNotification('traitée')}
                >
                  <IntlMessages id="Reclam.Traité" />
                </button>
              </div>
              <div className="col-md-4">
                <button
                  size="large"
                  className="btn btn-warning"
                  onClick={this.createNotification('en cours')}
                >
                  <IntlMessages id="Reclam.encours" />
                </button>
              </div>
              <div className="col-md-4">
                <button
                  size="large"
                  className="btn btn-danger"
                  onClick={this.createNotification('non traitée')}
                >
                  <IntlMessages id="Reclam.non.traité" />
                </button>
              </div>
            </div>
          </CardBox>

          <NotificationContainer />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(
  mapStateToProps,
  { editStatus }
)(ComplaintChangeStatus);
