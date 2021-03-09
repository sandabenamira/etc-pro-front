import React from "react";
import Widget from "../../../../components/Widget";
import IntlMessages from '../../../../util/IntlMessages';
import { classService } from '../../../../_services/class.service';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from "@material-ui/core/Button";
import { Alert } from 'reactstrap';
import axios from 'axios';






class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuppUserConnected: [],
      emailInterne: '',
      emailExterne: '',
      sms: '',
      isSubmitting: false,
      alert_success: false,
      alert_failed: false
    };
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)

  };

  componentDidMount() {
    let apiEndpoint = `/profiles/` + localStorage.profileId + `?access_token=${localStorage.token}&filter[include]=user&filter[include]=notifications`
    classService.get(apiEndpoint)
      .then(res => {      
        if (res) {
           this.setState({ stuppUserConnected:res.data 
            // ,emailExterne :res.data.notifications.emailexterne,emailInterne:res.data.notifications.emailinterne, sms: res.data.notifications.sms
          });
        }
      })

  }
  handleChange = name => (event, checked) => {

    this.setState({ [name]: checked, isSubmitting: true });
  };
  submit() {
    let data ={
      emailinterne: this.state.emailInterne,
      emailexterne: this.state.emailExterne,
      sms: this.state.sms,
      profile_id:this.state.stuppUserConnected.id 

    }
      let apiEndpoint2 = `/notifications/` + this.state.stuppUserConnected.id + `?access_token=${localStorage.token}`;

    classService.put(apiEndpoint2, data)
    .then(response => {
      if(response.status===200){

      
      this.setState({ alert_success: true })
     let  timeout = setTimeout(() => this.setState({ alert_success: false }), 3000)
      }

    }).catch(error => {
      this.setState({ alert_failed: true })
        let timeout = setTimeout(() => this.setState({ alert_failed: false }), 3000)
  
      

    });

  }
  render() {   /* eslint eqeqeq: "off" */
 
  
    const stuppUserContact = this.state.stuppUserConnected;
    return (
      <Widget title="Contact" styleName="jr-card-profile-sm">
        <div className="media align-items-center flex-nowrap jr-pro-contact-list">
          <div className="mr-3">
            <i className={`zmdi zmdi-${'email'} jr-fs-xxl text-grey`} />
          </div>
          <div className="media-body">
            <span className="mb-0 text-grey jr-fs-sm">{<IntlMessages id="components.profile.email" />}</span>
            <p className="jr-link">{stuppUserContact.email}</p>
          </div>
        </div>
        <div className="media align-items-center flex-nowrap jr-pro-contact-list">
          <div className="mr-3">
            <i className={`zmdi zmdi-${'phone'} jr-fs-xxl text-grey`} />
          </div>
          <div className="media-body">
            <span className="mb-0 text-grey jr-fs-sm">{<IntlMessages id="components.profile.phone" />}</span>
            <p className="mb-0">{stuppUserContact.phone}</p>
          </div>
        </div>
        <div className="mb-4">
          <FormHelperText className="text-grey">Choisir type de notification</FormHelperText>
          {this.state.alert_success ?
            <Alert className="shadow-lg" color="success">
              {<IntlMessages id="edit.user.message" />}
            </Alert> : null
          }
          {this.state.alert_failed ?
            <Alert className="shadow-lg" color="secondary">
              
              {<IntlMessages id="edit.user.error" />}
          </Alert> : null
          }

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.sms}
                  onChange={this.handleChange('sms')}
                  value="sms"
                />
              }
              label="SMS"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary"
                  checked={this.state.emailExterne}
                  onChange={this.handleChange('emailExterne')}
                  value="emailexterne"
                />
              }
              label="Email Externe"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary"
                  checked={this.state.emailInterne}
                  onChange={this.handleChange('emailInterne')}
                  value="emailinterne"
                />
              }
              label="Email Interne"
            />

          </FormGroup>
          <div className="col-md-12 text-left ">

            <Button variant="contained"
              className="jr-btn bg-indigo text-white "
              type="submit" disabled={!this.state.isSubmitting} onClick={this.submit}>{<IntlMessages id="components.establishments.formModify.buttonModify" />}</Button>
          </div>

        </div>


      </Widget>
    )
  }
}
export default Contact;





