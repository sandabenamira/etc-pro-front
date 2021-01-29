import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IntlMessages from '../../../../../util/IntlMessages';

class ConfirmAppel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.setState({ open: true });
  }

  handleRequestClose = () => {
    this.props.CancelModalConfirm()
  };
  handleSave = (e) => {
    this.props.ModalConfirmSave()
  }



  render() {
    return (
      <div>
        <Dialog open={this.state.open} TransitionComponent={Slide} onClose={this.handleRequestClose}>
          <DialogTitle>
            Nombre de présence est: {this.props.NumberPresent} <br />
            Nombre d'absence est: {this.props.NumberAbsent}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez vous entregistrez la présence ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="secondary">
              {<IntlMessages id="button.no" />}
            </Button>
            <Button onClick={this.handleSave} color="primary">
              {<IntlMessages id="button.yes" />}
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}

export default ConfirmAppel;


// sentNotificationAbsMail() {

//   const listIdAbsStudent = this.state.list_absent.map((element) => element.id_student);
//   listIdAbsStudent.map((element) => {
//     axios.get(`${baseUrl.baseUrl}/profiles?filter[where][user_id]=` + localStorage.user_id)
//       .then(res => {
//         const senderProfileId = res.data[0].id;
//         axios.get(`${baseUrl.baseUrl}/students/` + element)
//           .then(res => {
//             const receivedProfileId = res.data.profile_id;
//             //////////////////////////////////////////////
//             if (res.data.length !== 0) {
//               axios.post(`${baseUrl.baseUrl}/mails`, {
//                 sender_id: senderProfileId,
//                 receiver_id: receivedProfileId,
//                 subject: 'absence éléve!',
//                 message: 'vous étés absent!',
//                 profile_id: senderProfileId,
//               })
//             }
//             ///////////////////////////////////////////////
//             axios.get(`${baseUrl.baseUrl}/students/` + element + `/parent`)
//               .then(res => {
//                 if (res.data.length !== 0) {
//                   axios.post(`${baseUrl.baseUrl}/mails`, {
//                     sender_id: senderProfileId,
//                     receiver_id: res.data.profile_id,
//                     subject: 'absence de votre enfant!!',
//                     message: 'On vous informe que votre enfant est absent!!',
//                     profile_id: senderProfileId,
//                   })
//                 }
//               })
//             ///////////////////////////////////////////////////////////
//           })
//       })
//   });

// }