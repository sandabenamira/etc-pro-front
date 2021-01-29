import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import moment from "moment";
import { connect } from "react-redux";
import {giveTicket} from '../../../../../actions/RegistreAction';
import IntlMessages from "../../../../../util/IntlMessages";

class FormDialog extends React.Component {
  state = {
    open: false,
    reason: "Absence",
    emailParent: '',
    dateBillet: moment().format('L'),
    heureBillet:moment().format('LT'),
  };

  handleSubmit = () => {
    let data = {
      reason: this.state.reason,
      status: true,
      delivred_by:  localStorage.profileId,
      student_call_id:this.props.callRegisterId,
      time_stamp: moment().format(),
      student_profile_id:this.props.studentProfileId
    }
this.props.dispatch(giveTicket(data))
  
        // if (resBillet) {
        //   let apiEndpoint2 = `/parents/findOne?access_token=${localStorage.token}&filter={"where":{"id":` + this.props.parent_id + `}}`
        //   classService.get(apiEndpoint2)
        //     .then(res => {
        //       if (res) {
        //         //Envoyer mail au parent
        //         let dataMailParent = {
        //           sender_id: this.props.profileSupervisor,
        //           receiver_id: res.data.profile_id,
        //           subject: "Votre enfant a recu un billet",
        //           message: resBillet.data.reason,
        //           profile_id: res.data.profile_id,
        //         }
        //         let apiEndpoint3 = `/mails?access_token=${localStorage.token}`
        //         classService.post(apiEndpoint3, dataMailParent)

        //         //Envoyer mail au student
        //         let dataMailStudent = {
        //           sender_id: this.props.profileSupervisor,
        //           receiver_id: this.props.profile_id,
        //           subject: "Votre avez recu un billet",
        //           message: resBillet.data.reason,
        //           profile_id: this.props.profile_id,
        //         }
        //         classService.post(apiEndpoint3, dataMailStudent)
        //       }
        //     }).then(res => alert("Un Mail a été envoyer au Parent et a L'èleve avec succés"))
        // }
      
    this.handleRequestClose();

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { address_mail } = this.props;
    
    return (
      <div>
        <Button
          variant="contained" className="bg-primary text-white"
          onClick={this.handleClickOpen}
        >
         {<IntlMessages id="give.ticket" />}
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>{<IntlMessages id="ticket.title" />}</DialogTitle>
          <DialogContent>
            <InputLabel htmlFor="age-simple" > <b>{<IntlMessages id="ticket.name.student" />}:</b> {this.props.name} {this.props.surname}  </InputLabel>
          <br/>
           <InputLabel htmlFor="age-simple" ><b>{<IntlMessages id="ticket.name.class" />}:</b> {this.props.class_name}  </InputLabel>
           <br/>
           <InputLabel htmlFor="age-simple" ><b> {<IntlMessages id="ticket.message" />}</b>  </InputLabel>
           <br/>
          <InputLabel htmlFor="age-simple" ><b> {<IntlMessages id="ticket.date" />}: </b> {this.state.dateBillet} &nbsp;&nbsp; <b>{<IntlMessages id="ticket.time" />}: </b> {this.state.heureBillet}</InputLabel> 
           
           <TextField
              id="reason"
              onChange={this.handleChange('reason')}
              autoFocus
              margin="dense"
              label="Motif"
              type="text"
              fullWidth
            />
           <br/><br/>
          <InputLabel htmlFor="age-simple" ><b> {<IntlMessages id="ticket.responsible" />}: </b> {this.props.userName} {this.props.userSurname} </InputLabel>
          
            {/* <TextField
              autoFocus
              margin="dense"
              id="email"
              onChange={this.handleChange('email')}
              label="Email Address"
              type="email"
              fullWidth
              value={address_mail}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="secondary">
            {<IntlMessages id="components.classes.formadd.buttonCancel" />}
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
             {<IntlMessages id="give.ticket" />}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(FormDialog);