import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import FormDialog from './FormDialog';
import { Card, CardBody, CardText } from 'reactstrap';
import { classService } from "../../../../../_services/class.service";

function jsUpperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileSupervisor: ''
    }
  }

  componentDidMount() {
    let apiEndpoint = `/users/${localStorage.user_id}?access_token=${localStorage.token}`;
    classService.get(apiEndpoint)
      .then(res => {
        if(res){
          let idUser = parseInt(res.data.id);
          let apiEndpoint2 = `/profiles?access_token=${localStorage.token}&filter[where][user_id]=` + idUser;
          classService.get(apiEndpoint2)
            .then(response => {
              if(response){
                this.setState({ profileSupervisor: response.data[0].id })
              }
            })
        }
     
      })

  }

  render() {
    const { data } = this.props;
    const { name, surname, email, id, profile_id, parent_id } = data.profiles.user;
    return (
      <Card className="col-lg-12" >

        <Avatar
          alt='...'
          src={require('../../../../../assets/images/placeholder.jpg')}
          className="user-avatar avatar-shadow"
        />

        <CardBody className="col-lg-12">

          <CardText>
            {name.toUpperCase()} {jsUpperCaseFirst(surname)}
          </CardText>
          <FormDialog
            name={name}
            surname={surname}
            // address_mail={email}
            // student_id={id}
            // profile_id={profile_id}
            // parent_id={parent_id}
            //profileSupervisor={this.state.profileSupervisor}
            class_name={this.props.class_name}
            userName={this.props.userName}
            userSurname ={this.props.userSurname}
            callRegisterId={data.id}
            studentProfileId={data.profile_student_id}
          />
        </CardBody>
      </Card>


    );
  }
}


export default StudentItem;